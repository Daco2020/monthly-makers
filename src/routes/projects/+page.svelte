<script>
	import Modal from './Modal.svelte';
	import { onMount } from 'svelte';

	let showModal = false;

	let projectTitle = '';
	let projectLink = '';
	let projectDescription = '';
	let projectDetail = '';
	let projectThumbnail = '';

	// 페이지 로드 시 로컬 스토리지에서 데이터 로드
	onMount(async () => {
		projectTitle = localStorage.getItem('projectTitle') || '';
		projectLink = localStorage.getItem('projectLink') || '';
		projectDescription = localStorage.getItem('projectDescription') || '';
		projectDetail = localStorage.getItem('projectDetail') || '';
		projectThumbnail = localStorage.getItem('projectThumbnail') || '';
	});

	function handleSubmit() {
		localStorage.setItem('projectTitle', projectTitle);
		localStorage.setItem('projectLink', projectLink);
		localStorage.setItem('projectDescription', projectDescription);
		localStorage.setItem('projectDetail', projectDetail);
		localStorage.setItem('projectThumbnail', projectThumbnail);
		// TODO: 폼 제출 로직 추가
		showModal = true;
	}

	function closeModal() {
		isModalOpen = false; // 모달 숨기기
	}
</script>

<div class="text-lg text-center mb-16 mx-3">
	<h1 class="text-5xl mb-8 font-bold">프로젝트 등록</h1>
	<p class="text-base">
		혼자보기 아까운 여러분의 프로젝트를 `월간 메이커스`에 등록하고 세상에 알리세요!
	</p>
</div>

<form
	on:submit|preventDefault={handleSubmit}
	class="flex flex-col items-center"
	action="/projects"
	method="POST"
>
	<div class="w-full px-10 mb-20">
		<div class="mb-8">
			<label class="block text-gray-700 text-l font-bold mb-2" for="project-title">
				프로젝트 이름
			</label>
			<input
				class="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="project-title"
				type="text"
				placeholder="프로젝트 이름을 20자 이내로 입력해주세요"
				maxlength="20"
				bind:value={projectTitle}
				autocomplete="off"
				required
			/>
		</div>
		<div class="mb-8">
			<label class="block text-gray-700 text-l font-bold mb-2" for="project-link">
				프로젝트 링크
			</label>
			<input
				class="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="project-link"
				type="url"
				placeholder="프로젝트를 확인할 수 있는 링크를 입력해주세요"
				bind:value={projectLink}
				autocomplete="off"
				required
			/>
		</div>
		<div class="mb-8">
			<label class="block text-gray-700 text-l font-bold mb-2" for="project-description">
				한 줄 소개
			</label>
			<input
				class="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="project-description"
				type="text"
				placeholder="간단한 소개를 60자 이내로 입력해주세요"
				maxlength="60"
				bind:value={projectDescription}
				autocomplete="off"
				required
			/>
		</div>
		<div class="mb-8">
			<label class="block text-gray-700 text-l font-bold mb-2" for="project-details">
				상세 설명
			</label>
			<textarea
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="project-details"
				placeholder="프로젝트 후기 혹은 자세한 설명을 입력해주세요"
				bind:value={projectDetail}
				autocomplete="off"
				rows="4"
			></textarea>
		</div>
		<div class="mb-8">
			<label class="block text-gray-700 text-l font-bold mb-2" for="project-thumbnail">
				썸네일
			</label>
			<input
				class="bg-white shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="project-thumbnail"
				type="file"
				accept=".jpg, .png, .gif"
				bind:value={projectThumbnail}
				autocomplete="off"
				required
			/>
		</div>
		<div class="flex items-center justify-end mb-8">
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				type="submit"
			>
				제출하기
			</button>
		</div>
	</div>
</form>

<Modal bind:showModal>
	<h2 slot="header">modal</h2>
	<p>제출이 완료되었습니다!</p>
</Modal>
