<script lang="ts">
	import './app.scss';
	import { page } from '$app/stores';
	import Nav from '$lib/Nav.svelte';
	import StatusBar from '$lib/StatusBar.svelte';
</script>

<svelte:head>
	<title>{$page.url.pathname == '/'? 'Home': $page.url.pathname.split('/')[1] }</title>
</svelte:head>

<Nav />
<slot />
<StatusBar />
