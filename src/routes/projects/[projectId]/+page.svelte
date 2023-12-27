<script>
	export let data;

	import { userStore } from '../../../stores/userStore';
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';

	$: user = $userStore;

	// 수정 버튼 클릭 핸들러
	async function handleEdit() {
		console.log('edit');
		// 수정 로직 구현
		// 예: 사용자를 수정 페이지로 리디렉션
	}
	async function handleDelete() {
		if (confirm('이 프로젝트를 삭제하시겠습니까?')) {
			const updates = {
				is_active: false,
				updated_at: new Date().toISOString()
			};
			const { error } = await supabase
				.from('projects')
				.update(updates)
				.match({ id: data.id, user_id: user.id });

			if (error) {
				console.error('Error deleting project:', error);
			} else {
				alert('프로젝트가 삭제되었습니다.');
				goto('/', { replaceState: true });
			}
		}
	}
</script>

<div classsingle="min-h-screen flex flex-col items-center justify-center">
	<!-- Detail Page Container -->
	<div class="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-2xl mx-auto">
		<!-- Image -->
		<img src={data.thumbnail} alt="Detail" class="w-full h-96 object-contain" />
		<!-- Content -->
		<div class="p-4">
			<h1 class="text-2xl font-semibold mb-2">{data.title}</h1>
			<h2 class="text-lg text-gray-700 mb-4">{data.description}</h2>
			<p class="text-gray-700 mb-4">{data.detail}</p>
			<a
				href={data.link}
				class="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
				>프로젝트 보러가기</a
			>
			<!-- Buttons -->
			{#if user && user.id === data.user_id}
				<div class="flex mt-4">
					<button
						class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
						on:click={handleEdit}>수정</button
					>
					<button
						class="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600 transition duration-300 ease-in-out"
						on:click={handleDelete}>삭제</button
					>
				</div>
			{/if}
		</div>
	</div>
</div>
