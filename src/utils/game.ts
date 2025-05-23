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
	rounds: ['Round 0', 'Round 1', 'Round 2', 'Round 3', 'Round 4',],
	projects: [
		[
			{
				name: '社基ビル新築工事',
				cost: 2500,
				charge: 28,
				min: 3222,
				max: 4284,
				winning: 0,
			}
		],
		[
			{
				name: '工学部1号館改修工事',
				cost: 2300,
				charge: 42,
				min: 2929,
				max: 3799,
				winning: 0
			},
			{
				name: '三四郎池埋立て工事',
				cost: 3500,
				charge: 66,
				min: 4268,
				max: 5108,
				winning: 0
			},
			{
				name: '赤門開通工事',
				cost: 4200,
				charge: 38,
				min: 4729,
				max: 5783,
				winning: 0
			}
		],
		[
			{
				name: '豊洲市場地盤改良工事',
				cost: 5800,
				charge: 63,
				min: 7009,
				max: 9143,
				winning: 0
			}, {
				name: '沖ノ鳥島護岸工事',
				cost: 3400,
				charge: 46,
				min: 4051,
				max: 5459,
				winning: 0
			},
			{
				name: '秋田県洋上風力発電設備建設工事',
				cost: 8600,
				charge: 46,
				min: 10702,
				max: 13812,
				winning: 0
			}
		],
		[
			{
				name: '北海道新幹線延伸工事',
				cost: 8400,
				charge: 79,
				min: 9918,
				max: 13644,
				winning: 0
			},
			{
				name: '天の川右岸改修工事',
				cost: 7600,
				charge: 46,
				min: 8833,
				max: 12188,
				winning: 0
			},
			{
				name: '月面基地新設工事',
				cost: 13000,
				charge: 99,
				min: 15423,
				max: 20736,
				winning: 0
			}
		],
		[
			{
				name: 'アブダビディズニーランド建設工事',
				cost: 8200,
				charge: 79,
				min: 9499,
				max: 12869,
				winning: 1
			},
			{
				name: 'トランプタワー増築工事',
				cost: 13500,
				charge: 84,
				min: 16721,
				max: 22194,
				winning: 1
			},
			{
				name: '宇宙エレベーター建設工事',
				cost: 22000,
				charge: 163,
				min: 26105,
				max: 35222,
				winning: 1
			}
		]
	] as Project[][]
}
