<script>
	import { Content } from 'carbon-components-svelte';
	import AppBar from '@/lib/components/AppBar.svelte';
	import 'carbon-components-svelte/css/white.css';
</script>

<AppBar />
<Content>
	<slot />
</Content>
