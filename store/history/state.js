const state = () => ({
    httpStatus: null,
    requestState: false,
    failMessage: null,
    transactionData: [{
        date: '2019-08-27 00:03:56',
        type: 'Withdrawal',
        amount: '200.01',
        status: 'Rejected',
        remark: 'Testing'
    },
    {
        date: '2019-08-27 00:03:56',
        type: 'Withdrawal',
        amount: '60.8',
        status: 'Rejected',
        remark: 'Testing'
    },
    {
        date: '2019-08-27 00:03:56',
        type: 'Withdrawal',
        amount: '124.0',
        status: 'Rejected',
        remark: 'Testing'
    },
    {
        date: '2019-08-27 00:03:56',
        type: 'Withdrawal',
        amount: '500.54',
        status: 'Rejected',
        remark: 'Testing'
    },
    {
        date: '2019-08-27 00:03:56',
        type: 'Withdrawal',
        amount: '250.57',
        status: 'Rejected',
        remark: 'Testing'
    },
    {
        date: '2019-08-27 00:03:56',
        type: 'Withdrawal',
        amount: '10.63',
        status: 'Rejected',
        remark: 'Testing'
    }
    ],
    statementData: [{
        type: 'Slot',
        turnover: '20.01',
        winloss: '-1.00',
        active_bet: '20.01'
    },
    {
        type: 'Total',
        turnover: '10.81',
        winloss: '-2.38',
        active_bet: '10.81'
    },
    {
        type: 'Slot',
        turnover: '12.6',
        winloss: '8.54',
        active_bet: '12.6'
    },
    {
        type: 'Total',
        turnover: '50.54',
        winloss: '-5.49',
        active_bet: '50.54'
    },
    {
        type: 'Total',
        turnover: '20.57',
        winloss: '7.90',
        active_bet: '20.57'
    },
    {
        type: 'Slot',
        turnover: '60.63',
        winloss: '6.57',
        active_bet: '60.63'
    }
    ],
    transferData: [{
        date: '2019-08-27 00:03:56',
        from: 'PLT',
        to: 'GPI',
        amount: '132.78',
        status: 'Success'
    },
    {
        date: '2019-08-27 00:03:56',
        from: 'YGG',
        to: 'Main',
        amount: '20.65',
        status: 'Success'
    },
    {
        date: '2019-08-27 00:03:56',
        from: 'Main',
        to: 'JOK',
        amount: '200.0',
        status: 'Success'
    },
    {
        date: '2019-08-27 00:03:56',
        from: 'AG',
        to: 'DG',
        amount: '52.67',
        status: 'Success'
    },
    {
        date: '2019-08-27 00:03:56',
        from: 'KS9',
        to: 'Main',
        amount: '389.16',
        status: 'Success'
    },
    {
        date: '2019-08-27 00:03:56',
        from: 'SPG',
        to: 'BNG',
        amount: '5.0',
        status: 'Success'
    }
    ]
})

export default state