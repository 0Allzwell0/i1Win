const state = () => ({
    wallets: [{
            name: 'Main',
            amount: 10520.52
        },
        {
            name: 'AG',
            amount: 100.01
        },
        {
            name: 'EVO',
            amount: 20.31
        },
        {
            name: 'SA',
            amount: 0
        },
        {
            name: 'OBK',
            amount: 110
        },
        {
            name: 'SPG',
            amount: 51.2
        },
        {
            name: 'PLT',
            amount: 23.8
        },
        {
            name: 'DG',
            amount: 75.21
        },
        {
            name: 'GPI',
            amount: 61.39
        },
        {
            name: 'YGG',
            amount: 91.02
        },
        {
            name: 'SBO',
            amount: 12.11
        },
        {
            name: 'KS9',
            amount: 0.59
        },
        {
            name: 'JOK',
            amount: 0.8
        },
        {
            name: 'BNG',
            amount: 85.63
        },
        {
            name: 'IFUN',
            amount: 73.51
        }
    ],
    banks: ['bangkok', 'gsb', 'kasikorn', 'krungsri', 'krungthai', 'scb', 'thanachart', 'tmb'],
    games: ['ag', 'bng', 'dg', 'evo', 'gpi', 'ibcg', 'ifun', 'jok', 'ks9', 'lottery', 'maxbet', 'sa', 'sbo', 'spg', 'ygg'],
    bonus: [{
            type: 'Welcome',
            data: ['Welcome Bonus 100%', 'Welcome Bonus 180%']
        },
        {
            type: 'Daily',
            data: ['Daily Bonus 5%', 'Daily Bonus 10%', 'Daily Bonus 20%', 'Daily Bonus 30%', 'Daily Bonus 40%']
        }
    ]
})

export default state