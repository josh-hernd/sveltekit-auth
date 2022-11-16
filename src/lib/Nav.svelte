<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	import { page } from '$app/stores';
</script>

<nav>
	<ul>
		<li><a href="/">Home</a></li>
		{#if $page.data.user}
			<li><a href="/admin">Admin</a></li>
			<li>
				<form
					action="/logout"
					method="POST"
					use:enhance={() => {
						return async ({ result }) => {
							invalidateAll();
							await applyAction(result);
						};
					}}
				>
					<button type="submit">Logout</button>
				</form>
			</li>
		{:else}
			<li><a href="login">Login</a></li>
		{/if}
	</ul>
</nav>

<style lang="scss">
	nav {
		width: 100%;
		padding: 10px 20px;
		position: fixed;
		inset: 0 0 auto;
		background: rgba(14, 147, 160, 0.9);
		ul {
			height: 60px;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			li {
				margin: 0px 9px;
				list-style-type: none;
				a {
					color: #fff;
					text-decoration: none;
				}
				button {
					color: #0e93a0e6;
					padding: 10px;
					background: rgba(255, 255, 255, 1);
					border-radius: 3px;
					border: 0;
					box-shadow: 0px 0px 9px 4px rgb(255 255 255 / 5%);
					cursor: pointer;
				}
				a, 
				button {
					font-size: 19px;
					font-weight: 800;
					letter-spacing: 0.89px;
				}
			}
		}
	}
</style>
