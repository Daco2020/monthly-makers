<script>
	export let project;

	// 스벨트를 이용한 애니메이션 효과 적용
	import { fade } from 'svelte/transition';
</script>

<a
	class="m-3 rounded-lg rounded-md flex flex-col items-center image-card"
	href={`/project/${project.id}`}
	transition:fade
>
	<div class="w-full h-60">
		<img
			class="w-full h-full object-cover shadow-lg rounded-lg"
			src={project.thumbnail}
			alt={project.title}
		/>
	</div>
	<div class="w-full my-2">
		<h3 class="text-xl py-2">{project.title}</h3>
		<p class="text-sm">{project.description}</p>
		<div class="">
			<span class="text-sm text-gray-500">by {project.maker}</span>
		</div>
	</div>
</a>

<style>
	.image-card {
		transition: transform 0.1s ease-in-out;
	}
	.image-card:hover {
		transform: translateY(-5px);
	}
</style>
