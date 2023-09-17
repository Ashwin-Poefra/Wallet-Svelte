<script lang="ts">
	import axios, { AxiosError } from 'axios';
	import { ClickableTile, Column, Row } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { ProgressBar } from 'carbon-components-svelte';
	import Card from '@/lib/components/CreditCard.svelte';
	import { payments } from '@/store/wallet';
	import { AddLarge } from 'carbon-icons-svelte';
	import { Link } from 'carbon-components-svelte';
	import { goto } from '$app/navigation';

	const PAYMENTS_API_BASE_URL = import.meta.env.VITE_PAYMENTS_API_BASE_URL;

	let loading = true;

	onMount(async () => {
		try {
			const response = await axios.get(`${PAYMENTS_API_BASE_URL}/wallet`, {
				withCredentials: false,
				headers: {
					authorization: `Bearer ${localStorage.getItem('access_token')}`
				}
			});

			payments.set(response.data);
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 401) {
				goto('/login');
			}
			console.log('Error occurred when fetching payment methods', error);
		}

		loading = false;
	});
</script>

<main>
	{#if loading}
		<ProgressBar helperText="Loading..." />
	{/if}

	{#if !loading}
		<div class="flex items-center justify-end gap-1">
			<AddLarge />
			<Link href="add">Add Payment Method</Link>
		</div>
	{/if}

	{#if $payments?.length === 0 && !loading}
		<p>No payments found. Please add a payment method.</p>
	{/if}

	{#each $payments as payment}
		<Row>
			<Column>
				<Card
					nameOnCard={payment.name}
					digits={`Card ending in ${payment.last_digits}`}
					scheme={payment.network}
					expiration={payment.expiration}
				/>
			</Column>
		</Row>
	{/each}
</main>

<style>
	.add-payment-method-container {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 4px;
	}
</style>
