<script>
	export let data;
	const projectData = data.projectData;

	import { userStore } from '../../../stores/userStore';
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';
	import EditModal from '../../../components/editModal.svelte';

	$: user = $userStore;
	let showModal = false;
	// 수정 버튼 클릭 핸들러
	async function handleEdit() {
		showModal = true;
		// alert('수정 기능은 추후 제공할 예정입니다. 😂 현재는 삭제만 가능합니다.');
	}
	async function handleDelete() {
		if (confirm('이 프로젝트를 삭제하시겠습니까?')) {
			const updates = {
				is_active: false,
				updated_at: new Date()
			};
			const { error } = await supabase
				.from('projects')
				.update(updates)
				.match({ id: projectData.id, user_id: user.id });

			if (error) {
				console.error('Error deleting project:', error);
			} else {
				alert('프로젝트가 삭제되었습니다.');
				goto('/', { replaceState: true });
			}
		}
	}
</script>

<EditModal bind:showModal {projectData} />

<div classsingle="min-h-screen flex flex-col items-center justify-center">
	<!-- Detail Page Container -->
	<div class="bg-white shadow-lg overflow-hidden w-full max-w-2xl mx-auto my-20">
		<!-- Image -->
		<img src={projectData.thumbnail} alt="Detail" class="w-full h-96 object-contain" />
		<!-- Content -->
		<div class="p-4">
			<div class="flex justfy-center items-center">
				<img
					class="w-6"
					src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
					alt="Github"
				/>

				<p class="text-sm text-gray-400 px-1">{projectData.maker}</p>
				<p class="text-sm text-gray-400 px-1">
					Posted on {projectData.created_at.split('T')[0]}
				</p>
			</div>
			<h1 class="text-2xl font-semibold my-4">{projectData.title}</h1>
			<h2 class="text-lg text-gray-700 my-4">{projectData.description}</h2>
			<hr />
			<p class="text-gray-700 my-8 whitespace-pre-wrap">{projectData.detail}</p>
			<hr />
			<a
				href={projectData.link}
				target="_blank"
				rel="noopener noreferrer"
				class="text-blue-500 hover:font-bold transition duration-200 ease-in-out flex my-8"
				>프로젝트 보러가기</a
			>
			<!-- Buttons -->
			{#if user && user.id === projectData.user_id}
				<div class="flex my-8">
					<button
						class="bg-blue-500 text-white px-4 py-1 mr-2 rounded hover:bg-blue-600 transition duration-200 ease-in-out"
						on:click={handleEdit}>수정</button
					>
					<button
						class="bg-red-500 text-white px-4 py-1 mr-2 rounded mr-2 hover:bg-red-600 transition duration-200 ease-in-out"
						on:click={handleDelete}>삭제</button
					>
				</div>
			{/if}
		</div>
	</div>
	{#if data.otherProjectsData.length > 0}
		<div class="w-full max-w-2xl mx-auto my-12">
			<h1 class="text-xl text-gray-600 font-semibold my-4">
				{projectData.maker}님의 다른 프로젝트
			</h1>

			<div class="flex overflow-x-auto">
				{#each data.otherProjectsData as project}
					<div class="min-w-60 flex-shrink-0 mr-4">
						<a href={project.link} target="_blank" rel="noopener noreferrer">
							<img
								src={project.thumbnail}
								alt={project.title}
								class="rounded-lg w-60 h-40 object-cover"
							/>
							<h2 class="text-md font-semibold mt-2">{project.title}</h2>
							<p class="text-sm text-gray-500">{project.description}</p>
						</a>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.flex {
		/* 스크롤 가능한 가로 컨테이너 설정 */
		display: flex;
		overflow-x: auto;
	}

	.min-w-60 {
		min-width: 15rem; /* 각 아이템의 최소 너비 */
	}

	img {
		transition: transform 0.1s; /* 이미지 호버 효과 */
	}

	img:hover {
		transform: scale(1.03); /* 이미지 확대 효과 */
	}
</style>
