<script>
	import { arrProject } from '../stores/pokestore.js';
    console.log($arrProject);
    import ProjectCard from '../components/projectCard.svelte';

    let searchTerm = ''
    let filteredProject = [];

    $: {
        console.log(searchTerm);
        if (searchTerm) {
            filteredProject = $arrProject.filter(project => 
                project.name.includes(searchTerm)
            );
        } else {
            filteredProject = [...$arrProject];
        }
    }

</script>


<svelte:head>
    <title>월간 메이커스</title>
</svelte:head>



<h1 class="text-5xl text-center mb-8 font-bold">
    월간 메이커스
</h1>

<div class="text-lg text-center mb-20 ">
<p class="mb-2">'월간 메이커스'는 월 단위 프로젝트를 통해 성장하는 개발자 집단입니다.</p>
<p class="mb-2">지금 자신의 프로젝트를 공유하고 '월간 메이커스'의 초기 멤버가 되어보세요!</p>
</div>


<input 
    class="w-full rounded-md text-lg p-4 mb-8 border border-stealblue bg-transparent" 
    type="text" 
    bind:value={searchTerm} 
    placeholder="프로젝트 검색"
/>

<div class="grid gap-4 md:grid-cols-3 grid-cols-1">
{#each filteredProject as project}
  <ProjectCard project={project}></ProjectCard>
{/each}
</div>