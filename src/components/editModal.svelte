<script>
	import { userStore } from '../stores/userStore';
	import { supabase } from '../lib/supabaseClient';
	import { onMount } from 'svelte';

	$: user = $userStore;

	export let showModal;
	export let projectData;
	console.log(projectData);

	let dialog; // HTMLDialogElement
	let isSubmitted = false;

	let projectTitle = projectData.title;
	let projectLink = projectData.link;
	let projectDescription = projectData.description;
	let projectDetail = projectData.detail;
	let projectThumbnail = projectData.thumbnail;

	let fileInput;

	$: if (dialog && showModal) dialog.showModal();

	onMount(() => {});

	async function handleSignInButton() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'github'
		});
		console.log(error);
	}

	$: isFormReady =
		projectTitle && projectLink && projectDescription && projectDetail && projectThumbnail;

	async function handleFileChange() {
		if (fileInput.files.length > 0) {
			const file = fileInput.files[0];
			const fileName = `${Date.now()}-${crypto.randomUUID()}`;
			const filePath = `projectThumbnail/${fileName}`;

			if (projectThumbnail) {
				// 기존에 업로드된 파일이 있다면 스토리지에서 삭제
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

	async function handleSubmit() {
		const formData = {
			title: projectTitle,
			link: projectLink,
			description: projectDescription,
			detail: projectDetail,
			thumbnail: projectThumbnail,
			user_id: user.id,
			maker: user.user_metadata.name,
			updated_at: new Date()
		};
		try {
			const { data, error } = await supabase
				.from('projects')
				.update(formData)
				.match({ id: projectData.id, user_id: user.id })
				.select();
			isSubmitted = true;
		} catch (error) {
			console.error('Submit error:', error);
			alert('프로젝트 등록에 실패했습니다. 다시 시도해주세요.');
		}
	}

	async function closeModal() {
		isSubmitted = false;
		showModal = false;
		dialog.close();
		location.reload();
	}

	function autoResize(event) {
		event.target.style.height = 'auto'; // 높이를 초기화
		event.target.style.height = event.target.scrollHeight + 'px'; // 새 높이 설정
	}
</script>

<dialog class="rounded-md p-8 md:w-fit" bind:this={dialog} on:close={() => (showModal = false)}>
	{#if isSubmitted}
		<div class="flex flex-col items-center">
			<h2 class="font-bold text-lg mb-4">수정이 완료되었습니다!</h2>
			<img
				class="w-32 mb-4"
				src="https://www.gstatic.com/android/keyboard/emojikitchen/20201001/u1f914/u1f914_u1f973.png"
				alt="축하합니다!"
			/>
			<button
				id="success"
				class="w-24 text-sm mx-1 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-lg focus:outline-none"
				on:click={closeModal}>보러가기</button
			>
		</div>
	{:else}
		<div class="p-8 m-4 max-w-full max-h-full {isSubmitted ? '' : 'inner-box'}">
			<form
				class="flex flex-col items-center"
				on:submit|preventDefault={handleSubmit}
				action="/projects"
				method="POST"
			>
				<div class="w-full px-10">
					<h1 class="text-xl text-center mb-4 font-bold">수정을 도와드릴게요!</h1>
					<p class="text-sm text-center mb-8">내용을 변경한 후 [수정하기] 버튼을 눌러주세요</p>
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
							on:input={autoResize}
							autocomplete="off"
							rows="4"
							style="overflow-y: hidden;"
						></textarea>
					</div>

					<div class="mb-8">
						<label class="block text-gray-700 text-l font-bold mb-2" for="project-thumbnail">
							대표 이미지 (jpg, png, gif)
						</label>
						{#if projectThumbnail}
							<img
								class="w-40 h-30 object-contain mb-4"
								src={projectThumbnail}
								alt="썸네일 이미지"
							/>
							<input
								class="bg-white shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="project-thumbnail"
								type="file"
								accept=".jpg, .png, .gif"
								bind:this={fileInput}
								on:change={handleFileChange}
								autocomplete="off"
							/>
						{:else}
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
						{/if}
					</div>
					<div class="flex items-center justify-end mb-8">
						<button
							type="button"
							class="text-sm ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg focus:outline-none"
							on:click={() => dialog.close()}>돌아가기</button
						>
						<button
							type="submit"
							class={`text-sm ml-2 py-2 px-4 rounded-lg focus:outline-none ${
								isFormReady
									? 'bg-blue-500 hover:bg-blue-700 text-white'
									: 'bg-gray-300 text-gray-500 cursor-not-allowed'
							}`}
							disabled={!isFormReady}>수정하기</button
						>
					</div>
				</div>
			</form>
		</div>
	{/if}
</dialog>

<style>
	/* @media (max-width: 768px) {
		dialog {
			max-width: 32em;
			border-radius: 0.2em;
			border: none;
			padding: 0;
		}
	} */
	.inner-box {
		width: 750px;
		padding: 0;
		margin-top: 40px;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
