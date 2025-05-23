import { gameSettings } from "./game";

export const calculateBenefit = (companyId: any, gameData: any) => {
	let sum = 0;
	for (let round = 0; round < gameSettings.rounds.length; round++) {
		const projects = gameSettings.projects[round];
		const companyBids = gameData.rounds[round].bids[companyId];
		const biddingWasSuccessful = gameData.rounds[round].successful_bidders.map((bidder: any) => bidder === companyId);
		const costChanges = gameData.rounds[round].costs;
		for (let i = 0; i < projects.length; i++) {
			if (companyBids[i] > 0) {
				sum -= projects[i].charge;
				if (biddingWasSuccessful[i]) {
					sum += companyBids[i];
					sum -= projects[i].cost * costChanges[i];
				}
			}
		}
	}
	return sum;
}
