<script setup lang="ts">
// @ts-nocheck
import { defaultGameData } from '@/utils/defaultGameData';
import { gameSettings } from '@/utils/game';
import { onMounted, ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { calculateSuccessfulBidders } from '../utils/calculateSuccessfulBidder';

const roundId = ref(0);

const gameId = ref(0);
const gameData = ref(defaultGameData);

const router = useRouter();

onMounted(() => {
	const route = useRoute();
	roundId.value = parseInt(route.params.id as string);
	gameId.value = parseInt(localStorage.getItem('gameId') as string) || 0;
	gameData.value = JSON.parse(localStorage.getItem(`gameData${gameId.value}`) || '{}');
});

const title = computed(() => {
	return gameSettings.rounds[roundId.value];
});

const winnerCandidates = computed(() => {
	const bids = gameData.value.rounds[roundId.value].bids;
	const result = [];
	for (let i = 0; i < bids[0].length; i++) {
		const projectBids = bids.map((bid) => bid[i]);
		const successfulBidders = calculateSuccessfulBidders(projectBids, gameSettings.projects[roundId.value][i].min, gameSettings.projects[roundId.value][i].max, gameSettings.projects[roundId.value][i].winning);
		result.push(successfulBidders);
	}
	return result;
});

const done = () => {
	winnerCandidates.value.forEach((successfulBidders, index) => {
		if (successfulBidders.length === 1) {
			gameData.value.rounds[roundId.value].successful_bidders[index] = successfulBidders[0];
		}
	});
	localStorage.setItem(`gameData${gameId.value}`, JSON.stringify(gameData.value));
	router.push({ name: 'home' });
}
</script>

<template>
	<div class="container">
		<div class="header">
			<h1>{{ title }}</h1>
			<a @click="done" class="button-link">完了</a>
		</div>

		<table>
			<tr>
				<th>会社</th>
				<th v-for="(project, index) in gameSettings.projects[roundId]" :key="index">{{ project.name }}</th>
			</tr>
			<tr v-for="(company, companyIndex) in gameData.companies" :key="companyIndex">
				<td>{{ company }}</td>
				<td v-for="(bid, bidIndex) in gameData.rounds[roundId].bids[companyIndex]" :key="bidIndex">{{ bid }}</td>
			</tr>
			<tr>
				<td>落札した会社</td>
				<td v-for="(successfulBidders, index) in winnerCandidates" :key="index">
					<template v-if="successfulBidders.length == 0">
						なし
					</template>
					<template v-else-if="successfulBidders.length == 1">
						<span>{{ gameData.companies[successfulBidders[0]] }}</span>
					</template>
					<template v-else>
						<select @input="(e) => { console.log(e.target.value); gameData.rounds[roundId].successful_bidders[index] = parseInt(e.target.value) }">
							<option :value="-1">選択してください</option>
							<option v-for="(bidder, index) in successfulBidders" :key="index" :value="bidder">{{ gameData.companies[bidder] }}</option>
						</select>
					</template>
				</td>
			</tr>
			<tr>
				<td>コスト変動</td>
				<td v-for="(cost, costIndex) in gameData.rounds[roundId].costs" :key="costIndex">
					<input type="number" :value="cost" @input="(e) => gameData.rounds[roundId].costs[costIndex] = parseFloat(e.target.value)" />
				</td>
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
