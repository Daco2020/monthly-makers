<script>
	import { userStore } from '../stores/userStore';
	import { supabase } from '../lib/supabaseClient';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	$: user = $userStore;

	export let showModal;

	let dialog; // HTMLDialogElement
	let allowSNSPromotion = true;
	let isSubmitted = false;

	$: if (dialog && showModal) dialog.showModal();

	let currentPath = '/projects';
	onMount(() => {
		if (browser) {
			currentPath = window.location.href;
		}
	});

	async function handleSignInButton() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: currentPath
			}
		});
		console.log(error);
	}

	async function handleSubmit() {
		localStorage.setItem('allowSNSPromotion', allowSNSPromotion);

		// TODO: 폼 제출 로직 추가
		const formData = {
			title: localStorage.getItem('projectTitle'),
			description: localStorage.getItem('projectDescription'),
			detail: localStorage.getItem('projectDetail'),
			link: localStorage.getItem('projectLink'),
			thumbnail: localStorage.getItem('projectThumbnail'),
			allow_sns_promotion: localStorage.getItem('allowSNSPromotion'),
			user_id: user.id,
			maker: user.user_metadata.name
		};
		try {
			await supabase.from('projects').insert(formData);

			allowSNSPromotion = true;
			isSubmitted = true;

			// 폼 제출 후 로컬 스토리지 초기화
			localStorage.removeItem('projectTitle');
			localStorage.removeItem('projectLink');
			localStorage.removeItem('projectDescription');
			localStorage.removeItem('projectDetail');
			localStorage.removeItem('projectThumbnail');
			localStorage.removeItem('allowSNSPromotion');
		} catch (error) {
			// alert 사용자에게 오류 메시지 표시
			console.error('Submit error:', error);
			alert('프로젝트 등록에 실패했습니다. 다시 시도해주세요.');
		}
	}

	function closeModal() {
		isSubmitted = false;
		showModal = false;
		dialog.close();
		goto('/', { replaceState: true });
	}
</script>

<dialog bind:this={dialog} on:close={() => (showModal = false)}>
	<div class="p-8 m-4 max-w-xs max-h-full">
		{#if !user}
			<h2 class="font-bold text-lg mb-4 text-center">메이커님의 정보가 필요해요!</h2>
			<p class="text-center text-sm mb-4">등록 완료를 위해 Github 로그인을 해주세요.</p>
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
			<h2 class="font-bold text-lg mb-4 text-center">등록이 완료되었습니다!</h2>
			<div class="flex flex-col items-center">
				<img
					class="w-32 mb-4"
					src="https://www.gstatic.com/android/keyboard/emojikitchen/20201001/u1f914/u1f914_u1f973.png"
					alt="축하합니다!"
				/>
				<button
					type="button"
					class="text-sm ml-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg focus:outline-none"
					on:click={closeModal}>프로젝트 보러가기</button
				>
			</div>
		{:else}
			<h2 class="font-bold text-lg mb-4 text-center">홍보해드릴게요!</h2>
			<p class="text-center text-sm mb-8">
				프로젝트를 외부에 알리고 싶다면 허용해주세요. <br />홍보를 원치 않으시면 체크박스를
				해제해주세요.
			</p>
			<form
				id="modalForm"
				class="flex flex-col items-center"
				on:submit|preventDefault={handleSubmit}
			>
				<div class="flex items-center mb-8">
					<input
						type="checkbox"
						id="snsPromotion"
						class="mr-2 w-4 h-4"
						bind:checked={allowSNSPromotion}
						default="true"
					/>
					<label for="snsPromotion" class="text-base">프로젝트 홍보를 허용합니다</label>
				</div>
				<div class="flex justify-center w-full">
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
