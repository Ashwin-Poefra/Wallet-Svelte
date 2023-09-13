<script>
	import Card from '@/lib/components/CreditCard.svelte';
	import Wallet from '@/lib/components/Wallet.svelte';
	import { Grid, Row, Column } from 'carbon-components-svelte';
</script>

<Grid padding>
	<Row>
		<Column>
			<h1>My Wallet</h1>
		</Column>
	</Row>

	<Wallet />
</Grid>
