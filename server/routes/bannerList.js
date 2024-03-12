const Router = require('@koa/router')
const router = new  Router()

const {homePageBanner,todayEat, hot} = require('../controllers/mysqlControl')
router.get('/homePageBanner',async (ctx)=>{
     try {
        const result  = await homePageBanner()
        // console.log(result);
        ctx.body = {
            code:'8000',
            data:result,
            msg:'查到成功'
        }
     } catch (error) {
        ctx.body ={
            code:'8005',
            data:error,
            msg:'服务器异常'
        }
     }
})

router.get('/todayEat',async(ctx)=>{
    try {
        const result = await todayEat()
        ctx.body ={
            code:'8000',
            data:result,
            msg:"查找成功"
        }
    } catch (error) {
        ctx.body = {
            code:'8005',
            data:error,
            msg:'服务器异常'
        }
    }
})

router.get('/hot',async(ctx)=>{
    try {
        const result = await hot()
        ctx.body ={
            code:'8000',
            data:result,
            msg:"查找成功"
        }
    } catch (error) {
        ctx.body = {
            code:'8005',
            data:error,
            msg:'服务器异常'
        }
    }
})





module.exports = router