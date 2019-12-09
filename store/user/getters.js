const getters = {
    GetHttpStatus: state => state.httpStatus,
    GetChangePSWErrorMsg: state => state.changePSWErrorMsg,
    GetProfileErrorMsg: state => state.profileErrorMsg,
    GetProfilData: state => state.profileData,
    GetBanners: state => state.banners,
    GetAnnouncements: state => state.announcements,
    GetArticles: state => state.articles,
    GetJackpot: state => state.jackpot,
    GetPromotionsList: state => state.promotionsList
}

export default getters