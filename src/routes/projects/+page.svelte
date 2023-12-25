<script>
	import Modal from './Modal.svelte';
	import { onMount } from 'svelte';
	import { supabaseStore } from '../../stores/supabaseStore';
	$: supabase = $supabaseStore.supabase;

	// 페이지 로드 시 로컬 스토리지에서 데이터 로드
	onMount(async () => {
		projectTitle = localStorage.getItem('projectTitle') || '';
		projectLink = localStorage.getItem('projectLink') || '';
		projectDescription = localStorage.getItem('projectDescription') || '';
		projectDetail = localStorage.getItem('projectDetail') || '';
		projectThumbnail = localStorage.getItem('projectThumbnail') || '';
	});

	let showModal = false;

	let projectTitle = '';
	let projectLink = '';
	let projectDescription = '';
	let projectDetail = '';
	let projectThumbnail = '';

	let fileInput;

	async function handleFileChange() {
		if (fileInput.files.length > 0) {
			const file = fileInput.files[0];
			const fileName = `${Date.now()}-${crypto.randomUUID()}`;
			const filePath = `projectThumbnail/${fileName}`;

			if (projectThumbnail) {
				// 기존에 업로드된 파일이 있다면 로컬 스토리지에서 삭제
				const imageId = projectThumbnail.split('/').slice(-1)[0];
				const { data: deleteData, error: deleteError } = await supabase.storage
					.from('images')
					.remove([`projectThumbnail/${imageId}`]);

				if (deleteError) {
					console.error('Delete error:', deleteError);
				} else {
					console.log('Delete successful:', deleteData);
				}
			}

			try {
				const { data: uploadData, error: uploadError } = await supabase.storage
					.from('images')
					.upload(filePath, file);

				if (uploadError) {
					console.error('Upload error:', uploadError);
				} else {
					const { data: urlData, error: urlError } = await supabase.storage
						.from('images')
						.getPublicUrl(uploadData.path);

					if (urlError) {
						console.error('Error getting public URL:', urlError);
					} else {
						console.log(urlData);
						console.log('Public URL:', urlData.publicUrl);
						// 예: 업로드된 파일의 URL을 로컬 스토리지에 저장
						if (urlData.publicUrl) {
							projectThumbnail = urlData.publicUrl;
						}
						localStorage.setItem('projectThumbnail', projectThumbnail);
					}
					console.log('Upload successful:', uploadData);
				}
			} catch (error) {
				console.error('Unexpected error:', error);
			}
		}
	}
	//hqmwrezgqrzhulqnvxyx.supabase.co/storage/v1/object/public/images/projectThumbnail/1703299629848-ec0d9dac-b535-4ffc-b7ce-f3c357532f05
	https: 'https://hqmwrezgqrzhulqnvxyx.supabase.co/storage/v1/object/public/images/images/projectThumbnail/1703299629848-ec0d9dac-b535-4ffc-b7ce-f3c357532f05';
	async function handleSubmit() {
		localStorage.setItem('projectTitle', projectTitle);
		localStorage.setItem('projectLink', projectLink);
		localStorage.setItem('projectDescription', projectDescription);
		localStorage.setItem('projectDetail', projectDetail);

		// console.log(projectThumbnail);
		// console.log(projectThumbnail.files);
		// console.log(projectThumbnail.files);
		// console.log(projectThumbnail.files[0]);

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
				placeholder="프로젝트에 대한 자세한 설명이나 후기를 입력해주세요"
				bind:value={projectDetail}
				autocomplete="off"
				rows="4"
			></textarea>
		</div>
		{#if projectThumbnail}
			<div class="mb-8">
				<label class="block text-gray-700 text-l font-bold mb-2" for="project-thumbnail">
					대표 이미지 (gif 권장)
				</label>
				<img class="w-20 h-20 object-cover mb-4" src={projectThumbnail} alt="썸네일 이미지" />
				<input
					class="bg-white shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="project-thumbnail"
					type="file"
					accept=".jpg, .png, .gif"
					bind:this={fileInput}
					on:change={handleFileChange}
					autocomplete="off"
				/>
			</div>
		{:else}
			<div class="mb-8">
				<label class="block text-gray-700 text-l font-bold mb-2" for="project-thumbnail">
					대표 이미지 (gif 권장)
				</label>
				<input
					class="bg-white shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="project-thumbnail"
					type="file"
					accept=".jpg, .png, .gif"
					bind:this={fileInput}
					on:change={handleFileChange}
					autocomplete="off"
					required
				/>
			</div>
		{/if}
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
