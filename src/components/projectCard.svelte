<script>
	export let project;

	// 스벨트를 이용한 애니메이션 효과 적용
	import { fade } from 'svelte/transition';
</script>

<a
	class="m-3 rounded-lg rounded-mdshadow-sm flex flex-col items-center"
	href={`/project/${project.id}`}
	transition:fade
>
	<img class="rounded-lg" src={project.thumbnail} alt={project.title} />
	<div class="w-full my-2">
		<h3 class="text-xl py-2">{project.title}</h3>
		<p class="text-sm">{project.description}</p>
		<div class="">
			<span class="text-sm text-gray-500">by {project.maker}</span>
		</div>
	</div>
</a>
