<script>
	import GoogleLogin from '@/lib/components/GoogleLogin.svelte';
	import { Grid, Row, Column } from 'carbon-components-svelte';
</script>

<Grid padding>
	<Row>
		<Column>
			<h1>Login</h1>
		</Column>
	</Row>

	<GoogleLogin />
</Grid>
