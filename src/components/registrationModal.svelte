<script>
	import { userStore } from '../stores/userStore';
	import { supabase } from '../lib/supabaseClient';
	import { onMount } from 'svelte';

	$: user = $userStore;

	export let showModal;

	let dialog; // HTMLDialogElement
	let allowSNSPromotion = true;
	let isSubmitted = false;

	let projectTitle = '';
	let projectLink = '';
	let projectDescription = '';
	let projectDetail = '';
	let projectThumbnail = '';

	let fileInput;

	$: if (dialog && showModal) dialog.showModal();

	onMount(() => {});

	async function handleSignInButton() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'github'
		});
		console.log(error);
	}

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

	let createdProjectId;
	async function handleSubmit() {
		// TODO: 폼 제출 로직 추가
		const formData = {
			title: projectTitle,
			link: projectLink,
			description: projectDescription,
			detail: projectDetail,
			thumbnail: projectThumbnail,
			user_id: user.id,
			maker: user.user_metadata.name,
			allow_sns_promotion: false,
			is_active: true
		};
		try {
			const { data, error } = await supabase.from('projects').insert(formData).select();
			createdProjectId = data[0].id;
			allowSNSPromotion = true;
			isSubmitted = true;
		} catch (error) {
			// alert 사용자에게 오류 메시지 표시
			console.error('Submit error:', error);
			alert('프로젝트 등록에 실패했습니다. 다시 시도해주세요.');
		}
	}

	async function closeModal(allow_sns_promotion) {
		if (allow_sns_promotion === 'accept') {
			await supabase
				.from('projects')
				.update({ allow_sns_promotion: true })
				.match({ id: createdProjectId, user_id: user.id });
		}
		createdProjectId = '';
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

<dialog bind:this={dialog} on:close={() => (showModal = false)}>
	<div class="p-8 m-4 max-w-full max-h-full">
		{#if !user}
			<h2 class="font-bold text-lg mb-4 text-center">메이커님의 인증이 필요해요!</h2>
			<p class="text-center text-sm mb-4">프로젝트 등록를 위해 Github 로그인을 해주세요.</p>
			<div class="flex flex-col items-center">
				<img
					class="w-16 mb-2"
					src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
					alt="Github 로그인"
				/>
				<button
					id="signInButton"
					on:click|preventDefault={handleSignInButton}
					class="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
					>로그인</button
				>
			</div>
		{:else if isSubmitted}
			<div class="flex flex-col items-center">
				<h2 class="font-bold text-lg mb-4">등록이 완료되었습니다!</h2>
				<img
					class="w-32 mb-4"
					src="https://www.gstatic.com/android/keyboard/emojikitchen/20201001/u1f914/u1f914_u1f973.png"
					alt="축하합니다!"
				/>
			</div>
			<p class="text-center text-sm mb-8">프로젝트의 홍보를 허용하시겠어요?</p>
			<form id="modalForm" class="flex flex-col items-center">
				<div class="flex justify-center w-full">
					<button
						type="button"
						class="text-sm ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg focus:outline-none"
						on:click={() => closeModal('decline')}>괜찮아요</button
					>
					<button
						type="submit"
						class="text-sm ml-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg focus:outline-none"
						on:click={() => closeModal('accept')}>허용할게요</button
					>
				</div>
			</form>
		{:else}
			<form
				class="flex flex-col items-center"
				on:submit|preventDefault={handleSubmit}
				action="/projects"
				method="POST"
			>
				<div class="w-full px-10">
					<h1 class="text-xl text-center mb-4 font-bold">등록을 도와드릴게요!</h1>
					<p class="text-sm text-center mb-8">
						지금 프로젝트를 등록하고 <br />월간 메이커스 초기 멤버가 되어보세요! 🤩
					</p>
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
							class="text-sm ml-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg focus:outline-none"
							>등록하기</button
						>
					</div>
				</div>
			</form>
		{/if}
	</div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
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
