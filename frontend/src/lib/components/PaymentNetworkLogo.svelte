<script lang="ts">
	import MasterCardLogo from '@/lib/assets/mastercard-logo.png';
	import VisaLogo from '@/lib/assets/visa-logo.png';

	export let network: string;
</script>

{#if network?.toLowerCase() === 'visa'}
	<img width={50} src={VisaLogo} alt="Visa Logo" />
{:else if network?.toLowerCase() === 'mastercard'}
	<img width={50} src={MasterCardLogo} alt="Mastercard Logo" />
{:else}
	<p>{network}</p>
{/if}
