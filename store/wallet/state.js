const state = () => ({
    requestState: false,
    wallets: [
        { name: 'Main', amount: 10520.52, status: 2 },
        { name: 'OBK', amount: 100.01, status: 1 },
        { name: 'SBO', amount: 20.31, status: 2 },
        { name: 'PLT', amount: 0, status: 1 },
        { name: 'AG', amount: 110, status: 1 },
        { name: 'SA', amount: 51.2, status: 1 },
        { name: 'EVO', amount: 23.8, status: 2 },
        { name: 'DG', amount: 75.21, status: 1 },
        { name: 'SPG', amount: 61.39, status: 1 },
        { name: 'BNG', amount: 91.02, status: 1 },
        { name: 'YGG', amount: 12.11, status: 2 },
        { name: 'JOK', amount: 0.59, status: 1 },
        { name: 'KS9', amount: 0.8, status: 1 },
        { name: 'IFUN', amount: 73.51, status: 1 },
        { name: 'SB', amount: 128.91, status: 2 }
    ],
    banksList: [
        {
            name: 'scb',
            bank: 'Daraporn Sirikate',
            accountNumber: '729-244408-8'
        },
        {
            name: 'bangkok',
            bank: 'Daraporn Sirikate',
            accountNumber: '411-5-142681'
        },
        {
            name: 'kasikorn',
            bank: 'Daraporn Sirikate',
            accountNumber: '173-1-66629-7'
        },
        {
            name: 'krungsri',
            bank: 'Daraporn Sirikate',
            accountNumber: '678-2-80906-0'
        },
        {
            name: 'krungthai',
            bank: 'Daraporn Sirikate',
            accountNumber: '729-244408-8'
        },
        {
            name: 'thanachart',
            bank: 'Daraporn Sirikate',
            accountNumber: '056-8-82327-3'
        },
        {
            name: 'tmb',
            bank: 'Daraporn Sirikate',
            accountNumber: '729-244408-8'
        }
    ],
    limits: {
        maxDaily: 20,
        maxDeposit: 50000,
        minDeposit: 30,
        maxWithdraw: 50000,
        minWithdraw: 50,
        maxDailyWithdraw: 1000000,
        todayWithdrawTotal: 0,
        todayCount: 0
    },
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