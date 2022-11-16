<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	export let form: ActionData;

	let emptyForm = {
		email: '',
		pw: ''
	};
	
	const isEmpty = (emptyForm: { email: string; pw: string }) => {
		return emptyForm.email == '' || emptyForm.pw == '';
	};
</script>

<div class="centered">
	<div class="login">
		<h1>Login</h1>
		<form
			method="POST"
			action="?/login"
			use:enhance={() => {
				return async ({ result }) => {
					invalidateAll();
					await applyAction(result);
				};
			}}
		>
			<div class="field">
				<label for="email">Email</label>
				<input
					bind:value={emptyForm.email}
					id="email"
					name="email"
					type="email"
					autocomplete="username"
					required
				/>
			</div>

			<div class="field">
				<label for="password">Password</label>
				<input
					bind:value={emptyForm.pw}
					id="password"
					name="password"
					type="password"
					autocomplete="current-password"
					required
				/>
			</div>
			<div class="field">
				<button disabled={isEmpty(emptyForm)} type="submit">Sign In</button>
			</div>
		</form>
		<div class="error">
			{#if form?.error}
				<p>{form.error}</p>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.login {
		width: max-content;
		padding: 50px 40px;
		display: inline-flex;
		flex-direction: column;
		background-color: hsl(202, 11%, 30%);
		border-radius: 6px;
		.field {
			display: flex;
			flex-direction: column;
			margin: 7px auto;
			input {
				width: 280px;
				padding: 3px 5px;
			}
		}
		button {
			font-size: 15px;
			font-weight: bolder;
			color: rgba(255, 255, 255, 0.8);
			padding: 9px 5px;
			margin: 7px 0px;
			background: #0e93a0e6;
			border-radius: 3px;
			border: 0;
			box-shadow: 0px 0px 5px 4px rgb(255 255 255 / 9%);
			cursor: pointer;
			&:disabled {
				opacity: 0.5;
				pointer-events: none;
			}
		}
	}
	.error {
		width: 280px;
		p {
			font-size: 14px;
		}
	}
</style>
