<h1 class="text-5xl text-center mb-8 font-bold">
    프로젝트 공유
  </h1>

  <div class="text-lg text-center mb-20">
    <p class="mb-2">무언가 만들기를 좋아하나요? 직접 만든 서비스를 혼자만 보기 아깝나요?</p>
    <p class="mb-2">여러분이 만든 프로젝트를 지금 바로 공유하고 세상에 알리세요!</p>
    </div>

<form class="flex flex-col items-center" action="/projects" method="POST">
    <input class="w-full rounded-md text-lg p-4 mb-8 border border-stealblue bg-transparent text-ivory" type="text" name="title" placeholder="프로젝트 제목" />
    <input class="w-full rounded-md text-lg p-4 mb-8 border border-stealblue bg-transparent text-ivory" type="url" name="link" placeholder="프로젝트 링크" />
    <input class="w-full rounded-md text-lg p-4 mb-8 border border-stealblue bg-transparent text-ivory" type="text" name="description" placeholder="프로젝트 한줄 소개" />
    <input class="w-full rounded-md text-lg p-4 mb-8 border border-stealblue bg-transparent text-ivory" type="text" name="image" placeholder="프로젝트 이미지" />
    <button class="w-full rounded-md text-lg p-4 mb-8 border border-stealblue bg-transparent text-ivory" type="submit">제출하기</button>
</form>
