const state = () => ({
    wallets: [
        { name: 'Main', amount: 10520.52 },
        { name: 'OBK', amount: 100.01 },
        { name: 'SBO', amount: 20.31 },
        { name: 'PLT', amount: 0 },
        { name: 'AG', amount: 110 },
        { name: 'SA', amount: 51.2 },
        { name: 'EVO', amount: 23.8 },
        { name: 'DG', amount: 75.21 },
        { name: 'SPG', amount: 61.39 },
        { name: 'BNG', amount: 91.02 },
        { name: 'YGG', amount: 12.11 },
        { name: 'JOK', amount: 0.59 },
        { name: 'KS9', amount: 0.8 },
        { name: 'IFUN', amount: 73.51 },
        { name: 'SB', amount: 128.91 }
    ],
    banksList: ['bangkok', 'kasikorn', 'krungsri', 'krungthai', 'scb', 'thanachart', 'tmb'],
    limits: null,
    amount: (0).toFixed(2),
    bonus: [
        {
            type: 'Welcome',
            data: ['Welcome Bonus 100%', 'Welcome Bonus 180%']
        },
        {
            type: 'Daily',
            data: ['Daily Bonus 5%', 'Daily Bonus 10%', 'Daily Bonus 20%', 'Daily Bonus 30%', 'Daily Bonus 40%']
        }
    ],
    showPromptMsg: false
})

export default state