<script lang="ts">
	import {
		Accordion,
		AccordionItem,
		Form,
		TextInput,
		Button,
		ProgressBar
	} from 'carbon-components-svelte';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import valid from 'card-validator';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import forge from 'node-forge';
	import type { FullPayment } from '@/types/Payment';
	import { generatePublicKeyPem } from '@/lib/utils/encryption';

	const PAYMENTS_API_BASE_URL = import.meta.env.VITE_PAYMENTS_API_BASE_URL;

	let loading = true;
	let creating = false;

	// Currently backend API uses EncryptionAlgorithmSpec::RsaesOaepSha256 from AWS KMS for RSA encryption
	const encryptPaymentPayload = (publicKey: string, payload: FullPayment) => {
		const pub = forge.pki.publicKeyFromPem(generatePublicKeyPem(publicKey));

		const encrypted = pub.encrypt(JSON.stringify(payload), 'RSA-OAEP', {
			md: forge.md.sha256.create()
		});

		return btoa(encrypted);
	};

	let publicKey: string | null = null;

	onMount(async () => {
		try {
			const response = await axios.get(`${PAYMENTS_API_BASE_URL}/publickey`, {
				withCredentials: false,
				headers: {
					authorization: `Bearer ${localStorage.getItem('access_token')}`
				}
			});

			publicKey = response.data.public_key as string;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 401) {
				goto('/login');
			}
			console.log('Error occurred when fetching public key', error);
		}

		loading = false;
	});

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			name: undefined,
			card_number: undefined,
			card_expiration: undefined,
			card_cvv: undefined,
			address_line_1: undefined,
			address_line_2: undefined,
			address_city: undefined,
			address_state: undefined,
			address_country: undefined,
			address_postal_code: undefined
		},
		validationSchema: yup.object().shape({
			name: yup.string().required(),
			card_number: yup
				.string()
				.test(
					'test-card-number',
					'Payment card number is invalid',
					(value) => valid.number(value).isValid
				)
				.required(),
			card_expiration: yup.string().required(),
			card_cvv: yup
				.string()
				.test('test-card-cvv', 'Payment card cvv is invalid', (value) => valid.cvv(value).isValid)
				.required(),
			address_line_1: yup.string().required(),
			address_line_2: yup.string().optional(),
			address_city: yup.string().required(),
			address_state: yup.string().required(),
			address_country: yup.string().required(),
			address_postal_code: yup
				.string()
				.test(
					'test-postal-code',
					'Postal code is invalid',
					(value) => valid.postalCode(value).isValid
				)
				.required()
		}),
		onSubmit: async (values) => {
			if (!publicKey) return;

			creating = true;

			const encrypted = encryptPaymentPayload(publicKey, {
				name: values.name!,
				card: {
					number: values.card_number!,
					expiration: values.card_expiration!
				},
				address: {
					line_1: values.address_line_1!,
					line_2: values.address_line_2,
					city: values.address_city!,
					state: values.address_state!,
					country: values.address_country!,
					postal_code: values.address_postal_code!
				}
			});

			try {
				await axios.post(
					`${PAYMENTS_API_BASE_URL}/wallet`,
					{ encrypted_payload: encrypted },
					{
						headers: {
							authorization: `Bearer ${localStorage.getItem('access_token')}`
						}
					}
				);
				goto('/');
			} catch (error) {
				if (axios.isAxiosError(error) && error.response?.status === 401) {
					goto('/login');
				}
				console.log('Error occurred when adding payment method', error);
			}

			creating = false;
		}
	});
</script>

{#if loading}
	<ProgressBar helperText="Loading..." />
{:else}
	<Form on:submit={handleSubmit}>
		<Accordion>
			<AccordionItem title="Billing" open>
				<div class="credit-card-form-container">
					<TextInput
						bind:value={$form.address_line_1}
						labelText="Address Line 1"
						placeholder="123 Main St."
						helperText="Enter address line"
						invalid={!!$errors.address_line_1}
						invalidText={$errors.address_line_1}
					/>
					<TextInput
						bind:value={$form.address_line_2}
						labelText="Address Line 2 (Optional)"
						placeholder="APT 123"
						helperText="Enter unit or apartment"
						invalid={!!$errors.address_line_2}
						invalidText={$errors.address_line_2}
					/>
					<TextInput
						bind:value={$form.address_city}
						labelText="City"
						placeholder="New York"
						helperText="Enter city"
						invalid={!!$errors.address_city}
						invalidText={$errors.address_city}
					/>
					<TextInput
						bind:value={$form.address_state}
						labelText="State"
						placeholder="NY"
						helperText="Enter state"
						invalid={!!$errors.address_state}
						invalidText={$errors.address_state}
					/>
					<TextInput
						bind:value={$form.address_country}
						labelText="Country"
						placeholder="US"
						helperText="Enter country"
						invalid={!!$errors.address_country}
						invalidText={$errors.address_country}
					/>
					<TextInput
						bind:value={$form.address_postal_code}
						labelText="Postal Code"
						placeholder="10036"
						helperText="Enter postal code"
						invalid={!!$errors.address_postal_code}
						invalidText={$errors.address_postal_code}
					/>
				</div>
			</AccordionItem>

			<AccordionItem title="Payment Details" open>
				<div class="credit-card-form-container">
					<TextInput
						bind:value={$form.name}
						labelText="Name"
						placeholder="Jane Doe"
						helperText="Enter name displayed on payment card"
						invalid={!!$errors.name}
						invalidText={$errors.name}
					/>
					<TextInput
						bind:value={$form.card_number}
						labelText="Card number"
						placeholder="4032035859997926"
						helperText="Enter payment card number"
						invalid={!!$errors.card_number}
						invalidText={$errors.card_number}
					/>
					<TextInput
						bind:value={$form.card_expiration}
						labelText="Expiration"
						placeholder="01/2023"
						helperText="Enter payment card expiration"
						invalid={!!$errors.card_expiration}
						invalidText={$errors.card_expiration}
					/>
					<TextInput
						bind:value={$form.card_cvv}
						labelText="CSC"
						placeholder="123"
						helperText="Enter payment card security code"
						invalid={!!$errors.card_cvv}
						invalidText={$errors.card_cvv}
					/>
				</div>
			</AccordionItem>
			<br />

			{#if creating}
				<ProgressBar helperText="Adding payment method..." />
			{:else}
				<Button type="submit">Submit</Button>
			{/if}
		</Accordion>
	</Form>
{/if}

<style>
	.credit-card-form-container {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}
</style>
