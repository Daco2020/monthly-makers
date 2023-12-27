<script>
	export let data;

	import { userStore } from '../../../stores/userStore';

	$: user = $userStore;
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
						>수정</button
					>
					<button
						class="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600 transition duration-300 ease-in-out"
						>삭제</button
					>
				</div>
			{/if}
		</div>
	</div>
</div>
