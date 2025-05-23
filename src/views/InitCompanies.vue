<script setup lang="ts">
// @ts-nocheck
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { defaultGameData } from '@/utils/defaultGameData';

const gameId = ref(0);
const gameData = ref(defaultGameData);

const router = useRouter();

onMounted(() => {
	gameId.value = parseInt(localStorage.getItem('gameId') as string) || 0;
	gameData.value = JSON.parse(localStorage.getItem(`gameData${gameId.value}`) || router.push('/') as any);
	console.log(gameData.value);
});

const saveCompanyNames = () => {
	localStorage.setItem(`gameData${gameId.value}`, JSON.stringify(gameData.value));
	router.push('/');
};
</script>

<template>
	<div class="container">
		<div class="header">
			<h1>会社名</h1>
			<a class="button-link" @click="saveCompanyNames">OK</a>
		</div>
		<div>
			<template v-for="(company, index) in gameData.companies" :key="index">
				<div>
					<span>会社{{ ['a', 'b', 'c', 'd', 'e', 'f', 'g'][index] }}</span>
					<input type="text" v-model="gameData.companies[index]" />
				</div>
				<span></span>
			</template>
		</div>
	</div>
</template>

<style scoped lang="css">
.container {
	display: flex;
	width: 1280px;
	height: 832px;
	padding: 20px;
	flex-direction: column;
	align-items: flex-start;
	gap: 40px;
	background: #FFF;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	align-self: stretch;
}

h1 {
	color: #000;
	font-family: "Noto Sans JP", sans-serif;
	font-size: 60px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
}

.button-link {
	display: flex;
	padding: 10px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
	border-radius: 20px;
	border: 2px solid #000;
	background: #CCC;
	color: #000;
	font-family: "Noto Sans JP", sans-serif;
	font-size: 30px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	cursor: pointer;
}

.button-link:hover {
	background: #000;
	color: #FFF;
}

.controls {
	display: flex;
	padding: 10px;
	align-items: flex-start;
	gap: 10px;
	align-self: stretch;
}

.game-control {
	display: flex;
	padding: 10px;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	flex: 1 0 0;
	background: #EEE;
}

p {
	color: #000;
	font-family: "Noto Sans JP", sans-serif;
	font-size: 30px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
}

input {
	display: inline;
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 10px;
	font-family: "Noto Sans JP", sans-serif;
	font-size: 30px;
}

span {
	font-size: 30px;
}
</style>
