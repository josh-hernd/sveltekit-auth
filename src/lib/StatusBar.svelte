<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
</script>

{#if $page.data.user && $page.url.pathname == '/admin'}
	<div class="status" in:fly={{ y: 100 }} out:fly={{ y: 100 }}>
		<div class="end">
			<form
				action="/logout/end-sessions"
				method="POST"
				use:enhance={() => {
					return async ({ result }) => {
						invalidateAll();
						await applyAction(result);
					};
				}}
			>
				<button type="submit">End Session</button>
			</form>
			<p>This action will logout all users.</p>
		</div>
	</div>
{/if}

<style lang="scss">
.status {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: max-content;
	margin: auto;
	padding: 20px 40px;
	position: fixed;
	inset: auto 0px 0px 0px;
	background: rgba(14, 147, 160, 0.9);
	border-radius: 6px 6px 0px 0px;
	box-shadow: 0px 0px 5px 4px rgb(255 255 255 / 5%);
}
.end {
	margin-top: 10px;
}
form {
	margin-bottom: 5px;
	text-align: center;
	button {
		font-size: 19px;
		font-weight: 800;
		color: #fff;
		padding: 0px;
		background: none;
		border: 0;
		cursor: pointer;
	}
}
</style>
