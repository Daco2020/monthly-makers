<script>
	export let data;
	console.log(data);
</script>

<h1 class="text-4xl text-center my-8 font-bold">프로젝트 이름</h1>

<div class="min-h-screen flex flex-col items-center justify-center">
	<!-- Detail Page Container -->
	<div class="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-2xl mx-auto">
		<!-- Image -->
		<img
			src="https://source.unsplash.com/random/400x300"
			alt="Detail"
			class="w-full h-64 object-cover"
		/>
		<!-- Content -->
		<div class="p-4">
			<h1 class="text-2xl font-semibold mb-2">타이틀</h1>
			<h2 class="text-lg text-gray-700 mb-4">한줄 소개</h2>
			<p class="text-gray-700 mb-4">상세 설명</p>
			<a href="#" class="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
				>링크</a
			>
			<!-- Buttons -->
			<div class="flex mt-4">
				<button
					class="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600 transition duration-300 ease-in-out"
					>삭제버튼</button
				>
				<button
					class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
					>수정버튼</button
				>
			</div>
		</div>
	</div>
</div>
