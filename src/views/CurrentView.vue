<script setup lang="ts">
import { defaultGameData } from '@/utils/defaultGameData';
import { gameSettings } from '@/utils/game';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { calculateBenefit } from '@/utils/calculateBenefit';

const gameId = ref(0);
const gameData = ref(defaultGameData);

const router = useRouter();

onMounted(() => {
	gameId.value = parseInt(localStorage.getItem('gameId') as string) || 0;
	gameData.value = JSON.parse(localStorage.getItem(`gameData${gameId.value}`) || '{}');
});


</script>

<template>
	<div class="container">
		<div class="header">
			<h1>現在の収支</h1>
			<RouterLink to="/" class="button-link">戻る</RouterLink>
		</div>
		<table>
			<tr>
				<th>会社</th>
				<th>利益総和</th>
			</tr>
			<tr v-for="(company, companyIndex) in gameData.companies" :key="companyIndex">
				<td>{{ company }}</td>
				<td>{{ calculateBenefit(companyIndex, gameData) }}</td>
			</tr>
		</table>
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

h2 {
	color: #000;
	font-family: "Noto Sans JP", sans-serif;
	font-size: 42px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
}

p {
	color: #000;
	font-family: "Noto Sans JP", sans-serif;
	font-size: 30px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
}
</style>
