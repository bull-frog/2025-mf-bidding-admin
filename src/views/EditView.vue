<script setup lang="ts">
// @ts-nocheck
import { gameSettings } from '../utils/game.ts';
import { defaultGameData } from '../utils/defaultGameData.ts';
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// RouterLinkのURLからidを取得
const roundId = ref(0);

const router = useRouter();

const gameId = ref(0);

const gameData = ref(defaultGameData);

onMounted(() => {
	const route = useRoute();
	gameId.value = parseInt(localStorage.getItem('gameId') as string) || 0;
	roundId.value = parseInt(route.params.id as string);

	gameData.value = JSON.parse(localStorage.getItem(`gameData${gameId.value}`) || '{}');

	headers.value = gameSettings.projects[roundId.value].map((project) => project.name);
	items.value = Array.from({ length: 7 }, () => Array.from({ length: headers.value.length }, () => 0));
});

const title = computed(() => {
	return gameSettings.rounds[roundId.value];
});

const headers = ref(['工事名']);
const items = ref([[0]]);

const handlePaste = (index, event) => {

	const rowIndex = parseInt(index)

	// デフォルトのペースト処理を防止
	event.preventDefault();

	// クリップボードからテキストデータを取得
	const text = (event.clipboardData || window.clipboardData).getData('text');

	// 改行で分割して行ごとの配列を作成
	const rows = text.trim().split('\n');

	items.value[rowIndex] = rows[0].split('\t').map((cell) => parseInt(cell.trim()));


}

const saveBids = () => {
	gameData.value.rounds[roundId.value].bids = items;
	localStorage.setItem(`gameData${gameId.value}`, JSON.stringify(gameData.value));
	router.push({ name: 'home' });
}
</script>

<template>
	<div class="container">
		<div class="header">
			<h1>{{ title }}</h1>
			<a class="button-link" @click="saveBids">保存</a>
		</div>

		<!-- テーブル -->
		<div>
			<table>
				<thead>
					<tr>
						<th>会社名</th>
						<th v-for="(header, index) in headers" :key="index">{{ header }}</th>
					</tr>
				</thead>
				<tbody>
					<tr @paste="handlePaste(index, $event)" v-for="(row, index) in items" :key="index" :id="`row-${index}`">
						<td>{{ gameData.companies[index] }}</td>
						<td v-for="(item, i) in row" :key="i">{{ item }}</td>
					</tr>
				</tbody>
			</table>
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

table {
	border-collapse: collapse;
}

th {
	padding: 10px;
}

td {
	border: 1px solid #CCC;
	min-width: 30px;
	padding: 10px;
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
