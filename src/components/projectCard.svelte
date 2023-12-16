<script>
    export let project;

    // 스벨트를 이용한 애니메이션 효과 적용
    import { fade } from 'svelte/transition';
</script>


<a class="rounded-lg rounded-mdshadow-sm flex flex-col items-center" href={`/project/${project.id}`}
transition:fade>
<img class="rounded-lg" src={project.image} alt={project.title} />
<div class="w-full my-2 pb-5">
    <h1 class="text-xl">{project.title}</h1>
    <p class="text-sm">{project.description}</p>
    <div class="">
        <span class="text-sm text-gray-500">by {project.author}</span>
    </div>
</div>
</a>


<!-- 
<a class="bg-white rounded-lg hover:shadow-md shadow-lg p-6 flex flex-col items-center justify-center" href={`/project/${project.id}`} transition:fade>
    <img class="h-40 w-60" src={project.image} alt={project.title} />
    <h3 class="text-lg font-semibold text-center">{project.title}</h3>
<!-- </a> -->
<!-- <!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>포트폴리오 플랫폼</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Noto Sans KR', sans-serif;
        }
    </style>
</head>
<body class="bg-gray-100 text-gray-800">
    <div class="container mx-auto px-4 py-12">
        <header class="mb-10">
            <h1 class="text-3xl font-bold text-center mb-4">프로젝트를 공유하는 포트폴리오 플랫폼이야.</h1>
            <p class="text-xl text-center">모던하고 세련된 디자인과 컬러로 바꿔줄 수 있어?</p>
            <p class="text-center text-gray-500 mt-2">프레임워크는 sveltekit을 사용해.</p>
        </header>

        <section>
            <h2 class="text-2xl font-bold mb-6">인기 메이커스</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <img src="https://unsplash.com/photos/2EJCSULRwC8/download?force=true&w=640" alt="메이커스 이미지" class="mx-auto mb-4">
                    <h3 class="text-lg font-semibold text-center">500. 열망의</h3>
                </div>
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <img src="https://unsplash.com/photos/8manzosDSGM/download?force=true&w=640" alt="메이커스 이미지" class="mx-auto mb-4">
                    <h3 class="text-lg font-semibold text-center">501. 수수께끼</h3>
                </div>
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <img src="https://unsplash.com/photos/6anudmpILw4/download?force=true&w=640" alt="메이커스 이미지" class="mx-auto mb-4">
                    <h3 class="text-lg font-semibold text-center">502. 신중한자</h3>
                </div>
            </div>
        </section>
    </div>

    <script>
        // Any additional JavaScript can be added here
    </script>
</body>
</html> --> 