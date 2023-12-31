<script>
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	import { signInWithGithub, signOut } from '../lib/auth';
	import { userStore } from '../stores/userStore';

	$: user = $userStore;

	const currentPath = derived(page, ($page) => $page.url.pathname);
</script>

<nav class="fixed top-0 left-0 w-full z-10 flex justify-center bg-mainPurple py-4 h-16">
	<div
		class="w-full max-w-6xl text-base text-gray-200 flex justify-center md:justify-between items-center"
	>
		<div>
			<a class="mx-4 nav-link" href="/" class:font-bold={$currentPath === '/'}>월간 메이커스</a>
			<a class="mx-4 nav-link" href="/my" class:font-bold={$currentPath === '/my'}>프로젝트 관리</a>
			<a class="mx-4 nav-link" href="/community" class:font-bold={$currentPath === '/community'}
				>커뮤니티</a
			>
		</div>
		<div class="nav-link mx-4 flex justify-center md:justify-start">
			{#if user}
				<img class="w-8 h-8 rounded-full mx-2" src={user.user_metadata.avatar_url} alt="avatar" />
				<button on:click={signOut}>로그아웃</button>
			{:else}
				<button on:click={signInWithGithub}>로그인</button>
			{/if}
		</div>
	</div>
</nav>

<style>
	.nav-link:hover,
	.nav-link.font-bold {
		font-weight: bold; /* 호버 또는 활성 상태일 때 굵게 */
	}
	/* 기본 스타일 */
	.nav-link {
		margin: 0 1rem;
		text-decoration: none;
		color: inherit;
	}

	/* 모바일 화면에서의 스타일 */
	@media (max-width: 768px) {
		.nav-link {
			margin: 0 0.5rem; /* 모바일에서는 마진을 줄임 */
			font-size: 0.9rem; /* 글씨 크기를 줄임 */
		}
	}
</style>
