<script>
	import { userStore } from '../../stores/userStore';
	$: user = $userStore;

	export let showModal;

	let dialog; // HTMLDialogElement
	let projectMaker = '';
	let projectPassword = '';
	let allowSNSPromotion = true;

	$: if (dialog && showModal) dialog.showModal();

	async function handleSubmit() {
		localStorage.setItem('projectMaker', projectMaker);
		localStorage.setItem('projectPassword', projectPassword);
		localStorage.setItem('allowSNSPromotion', allowSNSPromotion);

		// TODO: 폼 제출 로직 추가
		const formData = {
			title: localStorage.getItem('projectTitle'),
			description: localStorage.getItem('projectDescription'),
			detail: localStorage.getItem('projectDetail'),
			maker: localStorage.getItem('projectMaker'),
			link: localStorage.getItem('projectLink'),
			thumbnail: localStorage.getItem('projectthumbnail'),
			password: localStorage.getItem('projectPassword'),
			allow_sns_promotion: localStorage.getItem('allowSNSPromotion')
		};
		try {
			const response = await fetch('/v1/projects', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			// 추가적인 로직 (예: 응답 처리)
			const data = await response.json();
			console.log(data);

			allowSNSPromotion = true;
			showModal = false;
			dialog.close();

			// 폼 제출 후 로컬 스토리지 초기화
			localStorage.removeItem('projectTitle');
			localStorage.removeItem('projectLink');
			localStorage.removeItem('projectDescription');
			localStorage.removeItem('projectDetail');
			localStorage.removeItem('projectThumbnail');
			localStorage.removeItem('projectMaker');
			localStorage.removeItem('projectPassword');
			localStorage.removeItem('allowSNSPromotion');
		} catch (error) {
			// alert 사용자에게 오류 메시지 표시
			console.error('Submit error:', error);
			alert('프로젝트 등록에 실패했습니다. 다시 시도해주세요.');
		}
	}
</script>

<dialog bind:this={dialog} on:close={() => (showModal = false)}>
	<div class="p-8 m-4 max-w-xs max-h-full">
		<h2 class="font-bold text-lg mb-4 text-center">마지막 단계입니다!</h2>
		{#if !user}
			<p class="text-sm mb-8">프로젝트 등록을 위해 Github 로그인을 해주세요.</p>
			<div class="flex justify-end w-full">
				<button
					type="button"
					class="text-sm ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg focus:outline-none"
					on:click={() => dialog.close()}>돌아가기</button
				>
				<a
					href="/auth/github"
					class="text-sm ml-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg focus:outline-none"
					>로그인하기</a
				>
			</div>
		{/if}

		<form id="modalForm" class="flex flex-col items-center" on:submit|preventDefault={handleSubmit}>
			<div class="flex items-center mb-2">
				<input
					type="checkbox"
					id="snsPromotion"
					class="mr-2"
					bind:checked={allowSNSPromotion}
					default="true"
				/>
				<label for="snsPromotion" class="text-sm">의 홍보를 허용합니다.</label>
			</div>
			<div class="flex items-center mb-8">
				<input
					type="checkbox"
					id="snsPromotion"
					class="mr-2"
					bind:checked={allowSNSPromotion}
					default="true"
				/>
				<label for="snsPromotion" class="text-sm">프로젝트의 홍보를 허용합니다.</label>
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
