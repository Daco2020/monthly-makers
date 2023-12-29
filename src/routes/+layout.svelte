<script>
	import '../app.css';
	import Nav from '../components/nav.svelte';
	import { onMount } from 'svelte';

	onMount(() => {});
</script>

<div class="mx-auto">
	<Nav></Nav>
</div>

<div class="max-w-6xl mx-auto mt-32">
	<slot />
</div>

<style>
	:global(body) {
		/* background-color: #0e0719; */
		background-color: #f3f4f6;
	}
</style>
