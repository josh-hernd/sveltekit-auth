<script lang="ts">
	import { page } from '$app/stores';
</script>

{#if $page.data.user}
	<div class="centered">
		<div class="info">
			<h1>Welcome</h1>
			<h2><strong>Email:</strong> {$page.data.user}</h2>
			<h2><strong>Current Session:</strong> {$page.data.id}</h2>
		</div>
	</div>
{/if}
