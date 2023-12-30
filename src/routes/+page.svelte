<script>
	import RegistrationModal from '../components/registrationModal.svelte';
	import ProjectCard from '../components/projectCard.svelte';

	let searchTerm = '';
	let filteredProject = [];
	let showModal = false;

	export let data;

	$: {
		if (searchTerm) {
			filteredProject = data.projects.filter(
				(project) =>
					project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
					project.detail.toLowerCase().includes(searchTerm.toLowerCase())
			);
		} else {
			filteredProject = [...data.projects];
		}
	}

	async function handleRegistration() {
		showModal = true;
	}
</script>

<svelte:head>
	<title>월간 메이커스</title>
</svelte:head>

<div class="text-lg text-center mb-8 mx-3">
	<h1 class="text-5xl mb-8 font-bold">월간 메이커스</h1>
	<!-- <p class="text-base">`월간 메이커스`는 만들기를 좋아하는 개발자 집단입니다.</p> -->
	<p class="text-base">여러분이 만들고 싶은 것을 만드세요.</p>
	<p class="text-base">월간 메이커스가 여러분의 프로젝트를 세상에 알릴게요!</p>
	<button
		class="my-4 py-2 text-base bg-mainPurple text-white px-4 py-1 mr-2 rounded hover:bg-blue-600 transition duration-200 ease-in-out"
		on:click={handleRegistration}>프로젝트 등록하기</button
	>
</div>

<div class="flex justify-center">
	<input
		class="w-full rounded-md text-lg mx-3 p-3 mb-16 border-2 border-mainPurple bg-transparent"
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

<RegistrationModal bind:showModal></RegistrationModal>
