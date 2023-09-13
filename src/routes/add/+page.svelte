<script>
	import { Grid, Row, Column, Link } from 'carbon-components-svelte';
	import AddPaymentCard from '@/lib/components/forms/AddPaymentCard.svelte';
	import { ArrowLeft } from 'carbon-icons-svelte';
</script>

<Grid padding>
	<Row>
		<Column>
			<div class="flex items-center gap-1">
				<ArrowLeft />
				<Link href="/">Back to wallet</Link>
			</div>
		</Column>
	</Row>
	<Row>
		<Column>
			<h1>Add Payment Method</h1>
		</Column>
	</Row>
	<Row>
		<Column>
			<AddPaymentCard />
		</Column>
	</Row>
</Grid>
