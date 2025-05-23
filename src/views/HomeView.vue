<script setup lang="ts">
// @ts-nocheck
import { defaultGameData } from '@/utils/defaultGameData';
import { gameSettings } from '@/utils/game';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const gameId = ref(0);
const gameData = ref(defaultGameData);

const router = useRouter();

onMounted(() => {
	gameId.value = parseInt(localStorage.getItem('gameId') as string) || 0;
	gameData.value = JSON.parse(localStorage.getItem(`gameData${gameId.value}`) || '{}');
});

const newGame = () => {
	gameId.value++;
	localStorage.setItem('gameId', gameId.value.toString());
	localStorage.setItem(`gameData${gameId.value}`, JSON.stringify(defaultGameData));
	router.push('/init');
};

</script>

<template>
	<div class="container">
		<div class="header">
			<h1>競争入札ゲーム</h1>
			<a class="button-link" @click="newGame">新規ゲーム</a>
		</div>

		<div class="controls">
			<template v-for="(round, index) in gameSettings.rounds" :key="index">
				<div class="game-control">
					<h2>{{ round }}</h2>
					<RouterLink :to="`/edit/${index}`" class="button-link">入力</RouterLink>
					<RouterLink :to="`/show/${index}`" class="button-link">結果表示</RouterLink>
				</div>
			</template>
		</div>

		<RouterLink to="/current" class="button-link">現在の収支</RouterLink>
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
