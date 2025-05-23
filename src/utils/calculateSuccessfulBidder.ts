export const calculateSuccessfulBidders = (bids: number[], min: number, max: number, winning: number) => {
	// bidsのうち、min以上max以下のもののうち、(winning-1) 個目に小さいものの番号を返す
	const validBids = bids.filter((bid) => bid >= min && bid <= max);
	if (validBids.length < winning) {
		winning = 0;
	}
	const winningPrice = validBids.sort((a, b) => a - b)[winning];
	const result = [];
	for (let i = 0; i < bids.length; i++) {
		if (bids[i] === winningPrice) {
			result.push(i);
		}
	}
	return result;
}
