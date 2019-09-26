const state = () => ({
    profileToken: null,
    banners: [
        { src: 'https://static.y3club.com/banner/15667914751221647088.jpg' },
        { src: 'https://static.y3club.com/banner/15576880281177120065.jpg' },
        { src: 'https://static.y3club.com/banner/1557837328483906963.jpg' },
        { src: 'https://static.y3club.com/banner/1557688039108117207.jpg' },
        { src: 'https://static.y3club.com/banner/1557688051958959998.jpg' },
        { src: 'https://static.y3club.com/banner/1557688098104909224.jpg' },
        { src: 'https://static.y3club.com/banner/15576880851669752660.jpg' },
        { src: 'https://static.y3club.com/banner/15576881131610327732.jpg' }
    ],
    announcement: `
        <strong>2019-08-27</strong> &nbsp; 918KISS & Mega888 is AVAILABLE at Y3club &nbsp;&nbsp; 
        <strong > 2019 - 08 - 27 < /strong> &nbsp; WELCOME TO Y3CLUB ONLINE CASINO. Y3CLUB 24HOURS CUSTOMER SERVICE &nbsp;&nbsp;
    `,
    jackpot: parseFloat(1830082162),
    promotions: [{
        title: '100% Welcome Bonus',
        src: 'http://static.y3club.com/article/1566543939304684367.jpg',
        content: '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><u>Terms &amp; Conditions</u></span>' +
            '</p>' +
            '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><br></span>' +
            '</p>' +
            '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><br></span>' +
            '</p>' +
            '<ol style="box-sizing: inherit; margin-right: 0px; margin-bottom: 1rem; margin-left: 1.25rem; padding: 0px; line-height: 1.6; font-family: Roboto; font-size: 16px;">' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">This Promotion is applied to Y3club NEW MEMBER ONLY. The member must register and deposit fund into the newly open account.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">The Member is required to deposit a minimum of 250 Baht. Each member can claim the bonus ONCE (1) only and up to a maximum of 3000 Baht.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;The deposit and bonus amount have to be Turnover 20 times before withdrawal can be made.<br style="box-sizing: inherit;">&nbsp; &nbsp;Example: Deposit 500 Baht &nbsp;<br style="box-sizing: inherit;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Bonus &nbsp; 500 Baht x 100% = 500 Baht<br style="box-sizing: inherit;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Turnover requirement &nbsp;( 500 Baht + &nbsp;500 Baht) x 20 = 20,000 Baht</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">Deposit and Bonus claimed cannot be used in Thai Lottrey and 918kiss.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">All draw bets, void bets, bets made on both outcomes, bets placed on odds below Euro 1.75 or Asia 0.75, THAI LOTTERY&nbsp;' +
            '<span style="box-sizing: inherit; line-height: inherit;">' +
            '<span style="box-sizing: inherit; line-height: inherit;">and 918kiss</span>' +
            '</span>' +
            '&nbsp;will not be taken into the calculation or count towards any Turnover requirement</span>' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;&nbsp;</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">First Deposit and Bonus must be wagered. Should the Turnover requirement is not met within 60 days from the day bonus was credited; the full Bonus amount and any winnings attributable will be forfeited.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;The bonus is strictly to be given ONCE (1) to individual new member, family, account, email address, contact number, bank account or IP address. If a second account is opened by any member, all bonuses and winnings will be void on both accounts.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">The bonus cannot be used together with any other promotion.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">Y3club reserves the right to alter, amend, cancel or reclaim any bonus at any time.</span>' +
            '</li>' +
            '</ol>'
    },
    {
        title: '180% Welcome Bonus',
        src: 'http://static.y3club.com/article/15677664561830516007.jpg',
        content: '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><u>Terms &amp; Conditions</u></span>' +
            '</p>' +
            '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><br></span>' +
            '</p>' +
            '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><br></span>' +
            '</p>' +
            '<ol style="box-sizing: inherit; margin-right: 0px; margin-bottom: 1rem; margin-left: 1.25rem; padding: 0px; line-height: 1.6; font-family: Roboto; font-size: 16px;">' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">This Promotion is applied to Y3club NEW MEMBER ONLY. The member must register and deposit fund into the newly open account.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">The Member is required to deposit a minimum of 250 Baht. Each member can claim the bonus ONCE (1) only and up to a maximum of 3000 Baht.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;The deposit and bonus amount have to be Turnover 20 times before withdrawal can be made.<br style="box-sizing: inherit;">&nbsp; &nbsp;Example: Deposit 500 Baht &nbsp;<br style="box-sizing: inherit;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Bonus &nbsp; 500 Baht x 100% = 500 Baht<br style="box-sizing: inherit;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Turnover requirement &nbsp;( 500 Baht + &nbsp;500 Baht) x 20 = 20,000 Baht</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">Deposit and Bonus claimed cannot be used in Thai Lottrey and 918kiss.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">All draw bets, void bets, bets made on both outcomes, bets placed on odds below Euro 1.75 or Asia 0.75, THAI LOTTERY&nbsp;' +
            '<span style="box-sizing: inherit; line-height: inherit;">' +
            '<span style="box-sizing: inherit; line-height: inherit;">and 918kiss</span>' +
            '</span>' +
            '&nbsp;will not be taken into the calculation or count towards any Turnover requirement</span>' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;&nbsp;</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">First Deposit and Bonus must be wagered. Should the Turnover requirement is not met within 60 days from the day bonus was credited; the full Bonus amount and any winnings attributable will be forfeited.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;The bonus is strictly to be given ONCE (1) to individual new member, family, account, email address, contact number, bank account or IP address. If a second account is opened by any member, all bonuses and winnings will be void on both accounts.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">The bonus cannot be used together with any other promotion.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">Y3club reserves the right to alter, amend, cancel or reclaim any bonus at any time.</span>' +
            '</li>' +
            '</ol>'
    },
    {
        title: '5% Daily Deposit Bonus',
        src: 'http://static.y3club.com/article/1557405967117612935.jpg',
        content: '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><u>Terms &amp; Conditions</u></span>' +
            '</p>' +
            '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><br></span>' +
            '</p>' +
            '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><br></span>' +
            '</p>' +
            '<ol style="box-sizing: inherit; margin-right: 0px; margin-bottom: 1rem; margin-left: 1.25rem; padding: 0px; line-height: 1.6; font-family: Roboto; font-size: 16px;">' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">This Promotion is applied to Y3club NEW MEMBER ONLY. The member must register and deposit fund into the newly open account.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">The Member is required to deposit a minimum of 250 Baht. Each member can claim the bonus ONCE (1) only and up to a maximum of 3000 Baht.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;The deposit and bonus amount have to be Turnover 20 times before withdrawal can be made.<br style="box-sizing: inherit;">&nbsp; &nbsp;Example: Deposit 500 Baht &nbsp;<br style="box-sizing: inherit;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Bonus &nbsp; 500 Baht x 100% = 500 Baht<br style="box-sizing: inherit;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Turnover requirement &nbsp;( 500 Baht + &nbsp;500 Baht) x 20 = 20,000 Baht</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">Deposit and Bonus claimed cannot be used in Thai Lottrey and 918kiss.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">All draw bets, void bets, bets made on both outcomes, bets placed on odds below Euro 1.75 or Asia 0.75, THAI LOTTERY&nbsp;' +
            '<span style="box-sizing: inherit; line-height: inherit;">' +
            '<span style="box-sizing: inherit; line-height: inherit;">and 918kiss</span>' +
            '</span>' +
            '&nbsp;will not be taken into the calculation or count towards any Turnover requirement</span>' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;&nbsp;</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">First Deposit and Bonus must be wagered. Should the Turnover requirement is not met within 60 days from the day bonus was credited; the full Bonus amount and any winnings attributable will be forfeited.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;The bonus is strictly to be given ONCE (1) to individual new member, family, account, email address, contact number, bank account or IP address. If a second account is opened by any member, all bonuses and winnings will be void on both accounts.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">The bonus cannot be used together with any other promotion.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">Y3club reserves the right to alter, amend, cancel or reclaim any bonus at any time.</span>' +
            '</li>' +
            '</ol>'
    },
    {
        title: 'Daily Bonus 40%',
        src: 'http://static.y3club.com/article/1567766739178230534.jpg',
        content: '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><u>Terms &amp; Conditions</u></span>' +
            '</p>' +
            '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><br></span>' +
            '</p>' +
            '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><br></span>' +
            '</p>' +
            '<ol style="box-sizing: inherit; margin-right: 0px; margin-bottom: 1rem; margin-left: 1.25rem; padding: 0px; line-height: 1.6; font-family: Roboto; font-size: 16px;">' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">This Promotion is applied to Y3club NEW MEMBER ONLY. The member must register and deposit fund into the newly open account.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">The Member is required to deposit a minimum of 250 Baht. Each member can claim the bonus ONCE (1) only and up to a maximum of 3000 Baht.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;The deposit and bonus amount have to be Turnover 20 times before withdrawal can be made.<br style="box-sizing: inherit;">&nbsp; &nbsp;Example: Deposit 500 Baht &nbsp;<br style="box-sizing: inherit;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Bonus &nbsp; 500 Baht x 100% = 500 Baht<br style="box-sizing: inherit;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Turnover requirement &nbsp;( 500 Baht + &nbsp;500 Baht) x 20 = 20,000 Baht</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">Deposit and Bonus claimed cannot be used in Thai Lottrey and 918kiss.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">All draw bets, void bets, bets made on both outcomes, bets placed on odds below Euro 1.75 or Asia 0.75, THAI LOTTERY&nbsp;' +
            '<span style="box-sizing: inherit; line-height: inherit;">' +
            '<span style="box-sizing: inherit; line-height: inherit;">and 918kiss</span>' +
            '</span>' +
            '&nbsp;will not be taken into the calculation or count towards any Turnover requirement</span>' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;&nbsp;</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">First Deposit and Bonus must be wagered. Should the Turnover requirement is not met within 60 days from the day bonus was credited; the full Bonus amount and any winnings attributable will be forfeited.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;The bonus is strictly to be given ONCE (1) to individual new member, family, account, email address, contact number, bank account or IP address. If a second account is opened by any member, all bonuses and winnings will be void on both accounts.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">The bonus cannot be used together with any other promotion.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">Y3club reserves the right to alter, amend, cancel or reclaim any bonus at any time.</span>' +
            '</li>' +
            '</ol>'
    },
    {
        title: '10% Daily Deposit Bonus',
        src: 'http://static.y3club.com/article/15578376111767709212.png',
        content: '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><u>Terms &amp; Conditions</u></span>' +
            '</p>' +
            '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><br></span>' +
            '</p>' +
            '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><br></span>' +
            '</p>' +
            '<ol style="box-sizing: inherit; margin-right: 0px; margin-bottom: 1rem; margin-left: 1.25rem; padding: 0px; line-height: 1.6; font-family: Roboto; font-size: 16px;">' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">This Promotion is applied to Y3club NEW MEMBER ONLY. The member must register and deposit fund into the newly open account.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">The Member is required to deposit a minimum of 250 Baht. Each member can claim the bonus ONCE (1) only and up to a maximum of 3000 Baht.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;The deposit and bonus amount have to be Turnover 20 times before withdrawal can be made.<br style="box-sizing: inherit;">&nbsp; &nbsp;Example: Deposit 500 Baht &nbsp;<br style="box-sizing: inherit;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Bonus &nbsp; 500 Baht x 100% = 500 Baht<br style="box-sizing: inherit;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Turnover requirement &nbsp;( 500 Baht + &nbsp;500 Baht) x 20 = 20,000 Baht</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">Deposit and Bonus claimed cannot be used in Thai Lottrey and 918kiss.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">All draw bets, void bets, bets made on both outcomes, bets placed on odds below Euro 1.75 or Asia 0.75, THAI LOTTERY&nbsp;' +
            '<span style="box-sizing: inherit; line-height: inherit;">' +
            '<span style="box-sizing: inherit; line-height: inherit;">and 918kiss</span>' +
            '</span>' +
            '&nbsp;will not be taken into the calculation or count towards any Turnover requirement</span>' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;&nbsp;</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">First Deposit and Bonus must be wagered. Should the Turnover requirement is not met within 60 days from the day bonus was credited; the full Bonus amount and any winnings attributable will be forfeited.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;The bonus is strictly to be given ONCE (1) to individual new member, family, account, email address, contact number, bank account or IP address. If a second account is opened by any member, all bonuses and winnings will be void on both accounts.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">The bonus cannot be used together with any other promotion.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">Y3club reserves the right to alter, amend, cancel or reclaim any bonus at any time.</span>' +
            '</li>' +
            '</ol>'
    },
    {
        title: 'Daily Bonus 30%',
        src: 'http://static.y3club.com/article/1567766866943833174.jpg',
        content: '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><u>Terms &amp; Conditions</u></span>' +
            '</p>' +
            '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><br></span>' +
            '</p>' +
            '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><br></span>' +
            '</p>' +
            '<ol style="box-sizing: inherit; margin-right: 0px; margin-bottom: 1rem; margin-left: 1.25rem; padding: 0px; line-height: 1.6; font-family: Roboto; font-size: 16px;">' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">This Promotion is applied to Y3club NEW MEMBER ONLY. The member must register and deposit fund into the newly open account.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">The Member is required to deposit a minimum of 250 Baht. Each member can claim the bonus ONCE (1) only and up to a maximum of 3000 Baht.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;The deposit and bonus amount have to be Turnover 20 times before withdrawal can be made.<br style="box-sizing: inherit;">&nbsp; &nbsp;Example: Deposit 500 Baht &nbsp;<br style="box-sizing: inherit;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Bonus &nbsp; 500 Baht x 100% = 500 Baht<br style="box-sizing: inherit;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Turnover requirement &nbsp;( 500 Baht + &nbsp;500 Baht) x 20 = 20,000 Baht</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">Deposit and Bonus claimed cannot be used in Thai Lottrey and 918kiss.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">All draw bets, void bets, bets made on both outcomes, bets placed on odds below Euro 1.75 or Asia 0.75, THAI LOTTERY&nbsp;' +
            '<span style="box-sizing: inherit; line-height: inherit;">' +
            '<span style="box-sizing: inherit; line-height: inherit;">and 918kiss</span>' +
            '</span>' +
            '&nbsp;will not be taken into the calculation or count towards any Turnover requirement</span>' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;&nbsp;</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">First Deposit and Bonus must be wagered. Should the Turnover requirement is not met within 60 days from the day bonus was credited; the full Bonus amount and any winnings attributable will be forfeited.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;The bonus is strictly to be given ONCE (1) to individual new member, family, account, email address, contact number, bank account or IP address. If a second account is opened by any member, all bonuses and winnings will be void on both accounts.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">The bonus cannot be used together with any other promotion.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">Y3club reserves the right to alter, amend, cancel or reclaim any bonus at any time.</span>' +
            '</li>' +
            '</ol>'
    },
    {
        title: 'Daily Bonus 20%',
        src: 'http://static.y3club.com/article/15578378481133477077.jpg',
        content: '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><u>Terms &amp; Conditions</u></span>' +
            '</p>' +
            '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><br></span>' +
            '</p>' +
            '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><br></span>' +
            '</p>' +
            '<ol style="box-sizing: inherit; margin-right: 0px; margin-bottom: 1rem; margin-left: 1.25rem; padding: 0px; line-height: 1.6; font-family: Roboto; font-size: 16px;">' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">This Promotion is applied to Y3club NEW MEMBER ONLY. The member must register and deposit fund into the newly open account.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">The Member is required to deposit a minimum of 250 Baht. Each member can claim the bonus ONCE (1) only and up to a maximum of 3000 Baht.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;The deposit and bonus amount have to be Turnover 20 times before withdrawal can be made.<br style="box-sizing: inherit;">&nbsp; &nbsp;Example: Deposit 500 Baht &nbsp;<br style="box-sizing: inherit;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Bonus &nbsp; 500 Baht x 100% = 500 Baht<br style="box-sizing: inherit;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Turnover requirement &nbsp;( 500 Baht + &nbsp;500 Baht) x 20 = 20,000 Baht</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">Deposit and Bonus claimed cannot be used in Thai Lottrey and 918kiss.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">All draw bets, void bets, bets made on both outcomes, bets placed on odds below Euro 1.75 or Asia 0.75, THAI LOTTERY&nbsp;' +
            '<span style="box-sizing: inherit; line-height: inherit;">' +
            '<span style="box-sizing: inherit; line-height: inherit;">and 918kiss</span>' +
            '</span>' +
            '&nbsp;will not be taken into the calculation or count towards any Turnover requirement</span>' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;&nbsp;</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">First Deposit and Bonus must be wagered. Should the Turnover requirement is not met within 60 days from the day bonus was credited; the full Bonus amount and any winnings attributable will be forfeited.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;The bonus is strictly to be given ONCE (1) to individual new member, family, account, email address, contact number, bank account or IP address. If a second account is opened by any member, all bonuses and winnings will be void on both accounts.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">The bonus cannot be used together with any other promotion.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">Y3club reserves the right to alter, amend, cancel or reclaim any bonus at any time.</span>' +
            '</li>' +
            '</ol>'
    },
    {
        title: '0.25% Daily Sportsbook Rebate',
        src: 'http://static.y3club.com/article/1557406023808605391.jpg',
        content: '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><u>Terms &amp; Conditions</u></span>' +
            '</p>' +
            '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><br></span>' +
            '</p>' +
            '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><br></span>' +
            '</p>' +
            '<ol style="box-sizing: inherit; margin-right: 0px; margin-bottom: 1rem; margin-left: 1.25rem; padding: 0px; line-height: 1.6; font-family: Roboto; font-size: 16px;">' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">This Promotion is applied to Y3club NEW MEMBER ONLY. The member must register and deposit fund into the newly open account.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">The Member is required to deposit a minimum of 250 Baht. Each member can claim the bonus ONCE (1) only and up to a maximum of 3000 Baht.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;The deposit and bonus amount have to be Turnover 20 times before withdrawal can be made.<br style="box-sizing: inherit;">&nbsp; &nbsp;Example: Deposit 500 Baht &nbsp;<br style="box-sizing: inherit;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Bonus &nbsp; 500 Baht x 100% = 500 Baht<br style="box-sizing: inherit;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Turnover requirement &nbsp;( 500 Baht + &nbsp;500 Baht) x 20 = 20,000 Baht</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">Deposit and Bonus claimed cannot be used in Thai Lottrey and 918kiss.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">All draw bets, void bets, bets made on both outcomes, bets placed on odds below Euro 1.75 or Asia 0.75, THAI LOTTERY&nbsp;' +
            '<span style="box-sizing: inherit; line-height: inherit;">' +
            '<span style="box-sizing: inherit; line-height: inherit;">and 918kiss</span>' +
            '</span>' +
            '&nbsp;will not be taken into the calculation or count towards any Turnover requirement</span>' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;&nbsp;</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">First Deposit and Bonus must be wagered. Should the Turnover requirement is not met within 60 days from the day bonus was credited; the full Bonus amount and any winnings attributable will be forfeited.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;The bonus is strictly to be given ONCE (1) to individual new member, family, account, email address, contact number, bank account or IP address. If a second account is opened by any member, all bonuses and winnings will be void on both accounts.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">The bonus cannot be used together with any other promotion.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">Y3club reserves the right to alter, amend, cancel or reclaim any bonus at any time.</span>' +
            '</li>' +
            '</ol>'
    },
    {
        title: '0.3% Daily Slot Rebate',
        src: 'http://static.qqclubs.com/article/1537947118391013632.png',
        content: '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><u>Terms &amp; Conditions</u></span>' +
            '</p>' +
            '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><br></span>' +
            '</p>' +
            '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><br></span>' +
            '</p>' +
            '<ol style="box-sizing: inherit; margin-right: 0px; margin-bottom: 1rem; margin-left: 1.25rem; padding: 0px; line-height: 1.6; font-family: Roboto; font-size: 16px;">' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">This Promotion is applied to Y3club NEW MEMBER ONLY. The member must register and deposit fund into the newly open account.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">The Member is required to deposit a minimum of 250 Baht. Each member can claim the bonus ONCE (1) only and up to a maximum of 3000 Baht.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;The deposit and bonus amount have to be Turnover 20 times before withdrawal can be made.<br style="box-sizing: inherit;">&nbsp; &nbsp;Example: Deposit 500 Baht &nbsp;<br style="box-sizing: inherit;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Bonus &nbsp; 500 Baht x 100% = 500 Baht<br style="box-sizing: inherit;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Turnover requirement &nbsp;( 500 Baht + &nbsp;500 Baht) x 20 = 20,000 Baht</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">Deposit and Bonus claimed cannot be used in Thai Lottrey and 918kiss.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">All draw bets, void bets, bets made on both outcomes, bets placed on odds below Euro 1.75 or Asia 0.75, THAI LOTTERY&nbsp;' +
            '<span style="box-sizing: inherit; line-height: inherit;">' +
            '<span style="box-sizing: inherit; line-height: inherit;">and 918kiss</span>' +
            '</span>' +
            '&nbsp;will not be taken into the calculation or count towards any Turnover requirement</span>' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;&nbsp;</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">First Deposit and Bonus must be wagered. Should the Turnover requirement is not met within 60 days from the day bonus was credited; the full Bonus amount and any winnings attributable will be forfeited.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;The bonus is strictly to be given ONCE (1) to individual new member, family, account, email address, contact number, bank account or IP address. If a second account is opened by any member, all bonuses and winnings will be void on both accounts.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">The bonus cannot be used together with any other promotion.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">Y3club reserves the right to alter, amend, cancel or reclaim any bonus at any time.</span>' +
            '</li>' +
            '</ol>'
    },
    {
        title: '0.5% Daily Live Casino Rebate',
        src: 'http://static.y3club.com/article/15574061132094467524.jpg',
        content: '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><u>Terms &amp; Conditions</u></span>' +
            '</p>' +
            '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><br></span>' +
            '</p>' +
            '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><br></span>' +
            '</p>' +
            '<ol style="box-sizing: inherit; margin-right: 0px; margin-bottom: 1rem; margin-left: 1.25rem; padding: 0px; line-height: 1.6; font-family: Roboto; font-size: 16px;">' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">This Promotion is applied to Y3club NEW MEMBER ONLY. The member must register and deposit fund into the newly open account.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">The Member is required to deposit a minimum of 250 Baht. Each member can claim the bonus ONCE (1) only and up to a maximum of 3000 Baht.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;The deposit and bonus amount have to be Turnover 20 times before withdrawal can be made.<br style="box-sizing: inherit;">&nbsp; &nbsp;Example: Deposit 500 Baht &nbsp;<br style="box-sizing: inherit;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Bonus &nbsp; 500 Baht x 100% = 500 Baht<br style="box-sizing: inherit;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Turnover requirement &nbsp;( 500 Baht + &nbsp;500 Baht) x 20 = 20,000 Baht</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">Deposit and Bonus claimed cannot be used in Thai Lottrey and 918kiss.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">All draw bets, void bets, bets made on both outcomes, bets placed on odds below Euro 1.75 or Asia 0.75, THAI LOTTERY&nbsp;' +
            '<span style="box-sizing: inherit; line-height: inherit;">' +
            '<span style="box-sizing: inherit; line-height: inherit;">and 918kiss</span>' +
            '</span>' +
            '&nbsp;will not be taken into the calculation or count towards any Turnover requirement</span>' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;&nbsp;</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">First Deposit and Bonus must be wagered. Should the Turnover requirement is not met within 60 days from the day bonus was credited; the full Bonus amount and any winnings attributable will be forfeited.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;The bonus is strictly to be given ONCE (1) to individual new member, family, account, email address, contact number, bank account or IP address. If a second account is opened by any member, all bonuses and winnings will be void on both accounts.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">The bonus cannot be used together with any other promotion.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">Y3club reserves the right to alter, amend, cancel or reclaim any bonus at any time.</span>' +
            '</li>' +
            '</ol>'
    },
    {
        title: 'Y3club Birthday Bonanza',
        src: 'http://static.y3club.com/article/1557406056555971158.jpg',
        content: '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><u>Terms &amp; Conditions</u></span>' +
            '</p>' +
            '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><br></span>' +
            '</p>' +
            '<p dir="ltr" style="margin-top: 0pt; margin-bottom: 0pt; line-height: 1.2;">' +
            '<span style="font-weight: 700; font-family: Roboto; font-size: 16px;"><br></span>' +
            '</p>' +
            '<ol style="box-sizing: inherit; margin-right: 0px; margin-bottom: 1rem; margin-left: 1.25rem; padding: 0px; line-height: 1.6; font-family: Roboto; font-size: 16px;">' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">This Promotion is applied to Y3club NEW MEMBER ONLY. The member must register and deposit fund into the newly open account.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">The Member is required to deposit a minimum of 250 Baht. Each member can claim the bonus ONCE (1) only and up to a maximum of 3000 Baht.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;The deposit and bonus amount have to be Turnover 20 times before withdrawal can be made.<br style="box-sizing: inherit;">&nbsp; &nbsp;Example: Deposit 500 Baht &nbsp;<br style="box-sizing: inherit;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Bonus &nbsp; 500 Baht x 100% = 500 Baht<br style="box-sizing: inherit;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Turnover requirement &nbsp;( 500 Baht + &nbsp;500 Baht) x 20 = 20,000 Baht</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">Deposit and Bonus claimed cannot be used in Thai Lottrey and 918kiss.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">All draw bets, void bets, bets made on both outcomes, bets placed on odds below Euro 1.75 or Asia 0.75, THAI LOTTERY&nbsp;' +
            '<span style="box-sizing: inherit; line-height: inherit;">' +
            '<span style="box-sizing: inherit; line-height: inherit;">and 918kiss</span>' +
            '</span>' +
            '&nbsp;will not be taken into the calculation or count towards any Turnover requirement</span>' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;&nbsp;</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">First Deposit and Bonus must be wagered. Should the Turnover requirement is not met within 60 days from the day bonus was credited; the full Bonus amount and any winnings attributable will be forfeited.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">&nbsp;The bonus is strictly to be given ONCE (1) to individual new member, family, account, email address, contact number, bank account or IP address. If a second account is opened by any member, all bonuses and winnings will be void on both accounts.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">The bonus cannot be used together with any other promotion.</span>' +
            '</li>' +
            '<li dir="ltr" style="box-sizing: inherit; margin: 0px; padding: 0px; font-size: inherit;">' +
            '<span style="box-sizing: inherit; font-weight: 700; line-height: inherit;">Y3club reserves the right to alter, amend, cancel or reclaim any bonus at any time.</span>' +
            '</li>' +
            '</ol>'
    }
    ],
    articleHtml: null
})

export default state