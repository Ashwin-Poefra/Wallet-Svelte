<script lang="ts">
	import { ClickableTile } from 'carbon-components-svelte';
	import PaymentNetworkLogo from '@/lib/components/PaymentNetworkLogo.svelte';

	export let nameOnCard: string;
	export let digits: string;
	export let scheme: string;
	export let expiration: string;
</script>

<ClickableTile on:click>
	<div class="credit-card-container">
		<PaymentNetworkLogo network={scheme} />

		<div>
			<p><strong>{digits}</strong></p>
			<p>{nameOnCard}</p>
			<p>Expires {expiration}</p>
		</div>
	</div>
</ClickableTile>

<style>
	.credit-card-container {
		width: 300px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 32px;
	}
</style>
