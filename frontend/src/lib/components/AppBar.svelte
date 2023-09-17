<script lang="ts">
	import { user } from '@/store/auth';
	import {
		Button,
		Header,
		HeaderAction,
		HeaderPanelLink,
		HeaderPanelLinks,
		HeaderUtilities,
		SkipToContent
	} from 'carbon-components-svelte';
	import { UserAvatarFilledAlt } from 'carbon-icons-svelte';
	import jwt_decode from 'jwt-decode';
	import { onMount } from 'svelte';

	let isOpen = false;

	onMount(() => {
		let jwt = localStorage.getItem('access_token');
		if (jwt) {
			const decoded = jwt_decode(jwt) as Record<string, string>;
			console.log(decoded);

			user.set({
				name: decoded['name'],
				email: decoded['email'],
				picture: decoded['picture']
			});
		}
	});

	const onLogout = () => {
		localStorage.removeItem('access_token');
		user.set(null);
	};
</script>

<Header company="AMUEL" platformName="Payments">
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	<HeaderUtilities>
		<HeaderAction bind:isOpen icon={UserAvatarFilledAlt} transition={{ duration: 200 }}>
			{#if $user !== null}
				<div class="user-info">
					<div>
						<p><strong>{$user?.name}</strong></p>
						<p>{$user?.email}</p>
					</div>

					<Button on:click={onLogout}>Log out</Button>
				</div>
			{:else}
				<HeaderPanelLinks>
					<HeaderPanelLink href="/login">Log in</HeaderPanelLink>
				</HeaderPanelLinks>
			{/if}
		</HeaderAction>
	</HeaderUtilities>
</Header>

<style>
	.user-info {
		padding: 8px;
		display: flex;
		flex-direction: column;
		gap: 32px;
	}
</style>
