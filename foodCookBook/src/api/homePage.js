import request from './index'



// 轮播图
export const homePageBanner = ()=>{
    return request.get('/homePageBanner')
}

//今天吃饭推荐
export const homeTodayEat =()=>{
    return request.get('/todayEat')
}

// 热门推荐
export const hot = ()=>{
    return request.get('/hot')
}