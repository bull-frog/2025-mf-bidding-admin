// Project型を定義
type Project = {
	name: string;
	cost: number;
	charge: number;
	min: number;
	max: number;
	//
	winning: number;
}

export const gameSettings = {
	rounds: ['練習', 'Round 1', 'Round 2', 'Round 3'],
	projects: [
		[
			{
				name: '社基ビル新築工事',
				cost: 25,
				charge: 0.3,
				min: 32.2,
				max: 42.8,
				winning: 0,
			}
		],
		[
			{
				name: '工学部1号館改修工事',
				cost: 23,
				charge: 0.4,
				min: 29.3,
				max: 38.0,
				winning: 0
			},
			{
				name: '三四郎池埋立て工事',
				cost: 35,
				charge: 0.7,
				min: 42.7,
				max: 51.1,
				winning: 0
			},
			{
				name: '赤門開通工事',
				cost: 42,
				charge: 0.4,
				min: 47.3,
				max: 57.8,
				winning: 0
			},
			{
				name: '豊洲市場地盤改良工事',
				cost: 58,
				charge: 0.6,
				min: 70.1,
				max: 91.4,
				winning: 0
			}
		],
		[
			{
				name: '沖ノ鳥島護岸工事',
				cost: 34,
				charge: 0.5,
				min: 40.5,
				max: 54.6,
				winning: 0
			},
			{
				name: '秋田県洋上風力発電設備建設工事',
				cost: 86,
				charge: 0.5,
				min: 107,
				max: 138,
				winning: 0
			},
			{
				name: '北海道新幹線延伸工事',
				cost: 84,
				charge: 0.8,
				min: 99.2,
				max: 136.4,
				winning: 0
			},
			{
				name: '天の川右岸改修工事',
				cost: 76,
				charge: 0.5,
				min: 88.3,
				max: 121.9,
				winning: 0
			}
		],
		[

			{
				name: '月面基地新設工事',
				cost: 130,
				charge: 1,
				min: 154.2,
				max: 207.4,
				winning: 0
			},
			{
				name: 'アブダビディズニーランド建設工事',
				cost: 82,
				charge: 0.8,
				min: 95,
				max: 128.7,
				winning: 1
			},
			{
				name: 'トランプタワー増築工事',
				cost: 135,
				charge: 0.8,
				min: 167.2,
				max: 221.9,
				winning: 1
			},
			{
				name: '宇宙エレベーター建設工事',
				cost: 220,
				charge: 1.6,
				min: 261.1,
				max: 352.2,
				winning: 1
			}
		]
	] as Project[][]
}
