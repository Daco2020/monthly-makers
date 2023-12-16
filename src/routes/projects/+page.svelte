

  <div class="text-lg text-center mb-16 mx-3">
    <h1 class="text-5xl mb-8 font-bold">
      프로젝트 등록
    </h1>
    <p>만들기를 좋아하나요? 직접 만든 서비스를 혼자만 보기 아깝나요?</p>
    <p>여러분이 만든 프로젝트를 지금 바로 공유하고 세상에 알리세요!</p>
    </div>

<!-- <form class="flex flex-col items-center" action="/projects" method="POST">
    <input class="w-full rounded-md text-lg p-4 mb-8 border border-stealblue bg-transparent" type="text" name="title" placeholder="프로젝트 제목" />
    <input class="w-full rounded-md text-lg p-4 mb-8 border border-stealblue bg-transparent" type="url" name="link" placeholder="프로젝트 링크" />
    <input class="w-full rounded-md text-lg p-4 mb-8 border border-stealblue bg-transparent" type="text" name="description" placeholder="프로젝트 한줄 소개" />
    <input class="w-full rounded-md text-lg p-4 mb-8 border border-stealblue bg-transparent" type="text" name="image" placeholder="프로젝트 이미지" />
    <button class="w-full rounded-md text-lg p-4 mb-8 border border-stealblue bg-transparent" type="submit">제출하기</button>
</form> -->


<form class="flex flex-col items-center" action="/projects" method="POST">
  <div class="w-3/5">
  <div class="mb-8">
      <label class="block text-gray-700 text-xl font-bold mb-2" for="project-title">
          프로젝트 제목
      </label>
      <input class="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="project-title" type="text" placeholder="프로젝트 제목을 입력하세요" maxlength="20" required>
  </div>
  <div class="mb-8">
    <label class="block text-gray-700 text-xl font-bold mb-2" for="project-description">
      프로젝트 한줄 소개
    </label>
    <input class="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="project-description" type="text" placeholder="프로젝트 한줄 소개를 입력하세요" maxlength="60" required>
  </div>
  <div class="mb-8">
      <label class="block text-gray-700 text-xl font-bold mb-2" for="project-link">
          프로젝트 링크
      </label>
      <input class="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="project-link" type="url" placeholder="프로젝트 링크를 입력하세요" required>
  </div>
  <div class="mb-8">
      <label class="block text-gray-700 text-xl font-bold mb-2" for="project-details">
          프로젝트 이미지
      </label>
      <input class="bg-white shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="project-image" type="file" accept=".jpg, .png, .gif" required>
  </div>
  <div class="flex items-center justify-end mb-8">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          제출하기
      </button>
  </div>
</div>
</form>
