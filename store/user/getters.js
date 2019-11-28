const getters = {
    GetHttpStatus: state => state.httpStatus,
    GetErrorMessage: state => state.errorMessage,
    GetProfilData: state => state.profileData,
    GetBanners: state => state.banners,
    GetAnnouncements: state => state.announcements,
    GetArticles: state => state.articles,
    GetJackpot: state => state.jackpot,
    GetPromotions: state => state.promotions
}

export default getters