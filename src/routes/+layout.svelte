<script>
	import '../app.css';
	import Nav from '../components/nav.svelte';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { userStore } from '../stores/userStore';
	import { supabaseStore } from '../stores/supabaseStore';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	let currentPath;
	onMount(() => {
		if (browser) {
			currentPath = window.location.href;
		}
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	async function currentUser() {
		try {
			const { data } = await supabase.auth.getUser();
			userStore.set(data.user);
			return data.user;
		} catch (error) {
			console.error('Error fetching user:', error);
			return null;
		}
	}
	supabaseStore.set({ supabase, session });

	async function signInWithGithub() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: currentPath
			}
		});
		console.log(error);
	}

	async function signOut() {
		const { error } = await supabase.auth.signOut();
		if (!error) {
			// 로그아웃 성공 후 페이지 새로고침
			location.reload();
		} else {
			// 오류 처리 (필요한 경우)
			console.error('Logout failed:', error);
		}
	}
</script>

<div class="mx-auto">
	<Nav {signInWithGithub} {signOut} {currentUser}></Nav>
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
