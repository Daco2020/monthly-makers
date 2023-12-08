<script>
    export let pokemon;

    // 스벨트를 이용한 애니메이션 효과 적용
    import { fade } from 'svelte/transition';
</script>

<a class="p-6 my-4 text-silver text-center rounded-mdshadow-sm hover:shadow-md flex flex-col items-center border border-stealblue bg-transparent" href={`/pokemon/${pokemon.id}`}
transition:fade>
    <img class="h-40 w-40" src={pokemon.image} alt={pokemon.name} />
    <h2 class="text-2xl">{pokemon.id}. {pokemon.name}</h2>
</a>
