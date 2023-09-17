<script lang="ts">
	import { ClickableTile } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { token } from '@/store/auth';
	import { goto } from '$app/navigation';

	const CLIENT_ID = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;

	onMount(async () => {
		const onSignIn = async (response: google.accounts.id.CredentialResponse) => {
			localStorage.setItem('access_token', response.credential);
			console.log(response.credential);
			goto('/');
		};

		if (CLIENT_ID) {
			google.accounts.id.initialize({
				client_id: CLIENT_ID,
				callback: onSignIn,
				cancel_on_tap_outside: false
			});

			google.accounts.id.renderButton(document.getElementById('google-signin-button')!, {
				theme: 'outline',
				size: 'large',
				type: 'standard',
				width: 500
			});

			google.accounts.id.prompt();
		}
	});
</script>

<svelte:head>
	<script src="https://accounts.google.com/gsi/client"></script>
</svelte:head>

<div class="signin-tile-content">
	<div id="google-signin-button" />
</div>

<style>
	.signin-tile-content {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
</style>
