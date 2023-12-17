<script>
	export let showModal; // boolean

	let dialog; // HTMLDialogElement
	let projectMaker = '';
	let projectPassword = '';
	let allowSNSPromotion = true;

	$: if (dialog && showModal) dialog.showModal();

	function handleSubmit() {
		localStorage.setItem('projectMaker', projectMaker);
		localStorage.setItem('projectPassword', projectPassword);
		localStorage.setItem('allowSNSPromotion', allowSNSPromotion);
		// TODO: 폼 제출 로직 추가
		showModal = false;
		allowSNSPromotion = true;
		dialog.close();
	}
</script>

<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<div class="p-8 m-4 max-w-xs max-h-full">
		<h2 class="font-bold text-lg mb-4 text-center">마지막 단계입니다!</h2>
		<p class="text-sm mb-8">
			`작성자 이름`과 `등록 비밀번호`를 입력해주세요. <br />등록 비밀번호는 프로젝트를 수정 혹은
			삭제할 수 있어요.
		</p>
		<form id="modalForm" class="flex flex-col items-center" on:submit|preventDefault={handleSubmit}>
			<input
				type="text"
				placeholder="작성자 이름(닉네임)"
				class="text-sm mb-4 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
				minlength="1"
				maxlength="20"
				bind:value={projectMaker}
				required
			/>
			<input
				type="password"
				placeholder="등록 비밀번호(8자리 이상)"
				class="text-sm mb-8 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
				minlength="8"
				maxlength="50"
				bind:value={projectPassword}
				required
			/>
			<div class="flex items-center mb-8">
				<input
					type="checkbox"
					id="snsPromotion"
					class="mr-2"
					bind:checked={allowSNSPromotion}
					default="true"
				/>
				<label for="snsPromotion" class="text-sm">해당 프로젝트의 SNS 홍보를 허용합니다</label>
			</div>
			<div class="flex justify-end w-full">
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
