<script>
	// import { arrProject } from '../stores/projectStore.js';
	import ProjectCard from '../components/projectCard.svelte';
	import { supabase } from '$lib/supabaseClient.js';

	let searchTerm = '';
	let filteredProject = [];
	export let data;

	$: {
		console.log(searchTerm);
		if (searchTerm) {
			filteredProject = data.projects.filter((project) => project.title.includes(searchTerm));
		} else {
			filteredProject = [...data.projects];
		}
	}
</script>

<svelte:head>
	<title>월간 메이커스</title>
</svelte:head>

<div class="text-lg text-center mb-16 mx-3">
	<h1 class="text-5xl mb-8 font-bold">월간 메이커스</h1>
	<p class="text-base">`월간 메이커스`는 만들기를 좋아하는 개발자 집단입니다.</p>
	<p class="text-base">지금 자신의 프로젝트를 등록하고 `월간 메이커스`의 초기 멤버가 되어보세요!</p>
</div>

<div class="flex justify-center">
	<input
		class="w-full rounded-md text-lg mx-3 p-4 mb-16 border-2 border-mainPurple bg-transparent"
		type="text"
		bind:value={searchTerm}
		placeholder="프로젝트 검색"
	/>
</div>

<div class="grid gap-2 md:grid-cols-3 grid-cols-2">
	{#each filteredProject as project}
		<ProjectCard {project}></ProjectCard>
	{/each}
</div>
