<template>
    <div class="wrapper">
        <!-- 头部 -->
      <menuHeader></menuHeader>
      <!-- 头部结束 -->
        <!-- 导航栏 -->
  
       <!-- 导航栏结束 -->
       <!-- 中间内容部分开始 -->
       <div class="content">
           <aside class="aside">
            <ul>
                <li><span class="iconfont icon-caibohui"></span><el-link :underline="false" href="" target="_blank">菜谱大全</el-link></li>
                <li><span class="iconfont icon-kaizhanjingcaijincheng"></span><el-link :underline="false" href="" target="_blank">家常菜系</el-link></li>
                <li><span class="iconfont icon-chabei"></span><el-link :underline="false" href="" target="_blank">健康饮食</el-link></li>
                <li><span class="iconfont icon-yunfu"></span><el-link :underline="false" href="" target="_blank">孕婴专区</el-link></li>
                <li> <span class="iconfont icon-bijiben"></span><el-link :underline="false" href="" target="_blank">早餐食谱</el-link></li>
            </ul>
           </aside>
           <article class="article">
             <SlideShow :slides="bannerList"></SlideShow>
           </article>
       </div>
        <!-- 中间内容部分结束 -->
        <!-- 今天美食推荐开始 -->
        <div class="todayEat">
            <h2>---今天美食推荐---</h2>
            <ul>
                <li v-for="(item,index) in todayEat" :key="index">
                   <div>
                    <img :src="item.imageUrl" alt="">
                   </div>
                   <div class="title">
                       <span>{{item.title}}</span>
                   </div>
                   <p>{{item.content}}</p>
                </li>
            </ul>
        </div>
        <!-- 今天美食推荐结束 -->
       

        <div class="recommend">  <span>---热门推荐---</span></div>
        <!-- 热门推荐开始 -->
        <div class="hot">
          <!-- 单个热门推荐开始 -->
          <div class="hot-cook" v-for="item in hotCook" :key="item.id">
            <h2>{{item.title}}</h2>
            <div class="cook-img">
              <img :src="item.imageUrl" alt="">
            </div>
            <div class="content-wrap">
              <div class="content" v-html="item.p1"></div>
              <div class="content" v-html="item.p2"></div>
              <div class="content" v-html="item.p3"></div>
              <div class="content" v-html="item.p4"></div>
          </div>
            </div>
          <!-- 单个每日推荐结束 -->
        </div>
        <!-- 热门推荐结束-->
    </div>
     <!-- 底部开始 -->
     <footer class="footer">
            <div class="footer-left">
                <div class="footer-leftTop">
                <div class="left-img"><img src="../../assets/img/favicon.png" alt="" srcset=""></div>
                <div class="left-span"><span>空格制作</span></div>
               </div>
                <div class="left-content">
                    <div class="left-content-top">
                        <span>
                        在生活的多彩画卷中.美食以其独特的魅力，吸引着无数人的目光和味蕾。
                        它不仅仅是一种满足口腹之欲的食物,更是一种传递情感 连接人心的文化符号。
                    </span>
                    </div>
                    <div class="left-contnt-bottom">
                        <span>
                        品尝美食，更是一种独特的享受。
                        当一道道色香味俱全的菜品呈现在眼前时，
                        人们的视觉和嗅觉首先被唤醒。
                        紧接着,是味蕾的狂欢。那细腻的口感、丰富的味道，让人仿佛置身于一个美妙的味觉世界。
                        每一口都让人陶醉其中，流连忘返。
                    </span>
                    </div>
                </div>
            </div>
            <div class="footer-right">
                <div class="wechat">
                    <div class="wechat-img"><img src="../../assets/img/homePage/wechat.jpg" alt=""></div>
                  <div class="wechat-span"><span>扫码联系</span></div>
                </div>
                <div class="qq">
                    <div class="qq-img"><img src="../../assets/img/homePage/qq.jpg" alt=""></div>
                  <div class="qq-span"><span>扫码联系</span></div>
                </div>
            </div>
        </footer>
</template>

<script setup>
import {onMounted,ref} from 'vue'
import { homePageBanner,homeTodayEat, hot } from '@/api/homePage';


const bannerList = ref([])
const todayEat  = ref([])
const hotCook = ref([])
onMounted(() => {
  getBannerList()
  getTodayEat()
  getHot()
})

const getBannerList = async()=>{
    const res =   await homePageBanner()
    bannerList.value = res.data
}

const getTodayEat = async ()=>{
  const res = await homeTodayEat()
  todayEat.value = res.data
}

const getHot = async ()=>{
  const res = await hot()
  hotCook.value = res.data
}
</script> 

<style lang="less" scoped>

.wrapper{
    width: 1200px;
    margin: 0 auto;

   .content{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    .aside{
       ul{
        width: 250px;
        height: 500px;
        margin-top: 10px;
        :hover{
                background-color: #f9ecc6;
                 color:#ffc000 ;
                 cursor: pointer;
            }
        li{
            width: 250px;
            height: 100px;
            background-color: #ffc000;
            border-bottom: 0.5px solid #eeeeee;
            text-align: center;
            line-height: 100px;
            :deep(.el-link__inner){
                font-size: 20px !important;
                margin-top: -12px !important ;
            }
            span{
                font-size: 30px;
                line-height: 100px;
                margin-right: 15px;
            }
        }
       }
    }
   }
   .article{
    width: 900px;
    height: 504px;
    margin-top: 10px;
   
   }
   .todayEat{
     margin-top: 30px;
     h2{
        width: 100%;
        font-size: 25px;
        text-align: center;
        padding-bottom: 20px;
     }
     ul{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        justify-content: space-between;
        li{
            width: 290px;
            height: 320px;
            div{
                img{
                width:290px;
                height: 200px;
              }
            }
            .title{
                margin:15px 0;
            span{
                text-align: left;
                font-size: 22px;
            }
           }
           p{
            font-size: 16px;
            color: #666666;
           }
        }
     }
   }
   .cook{
    .cook-morning{
        display: flex;
       .morning-left{
        margin-right: 10px;
           img{
            width: 290px;
            height: 200px;
           }
       }
       .morning-right{
         flex: 1;
         .morning-title{
            margin-bottom: 5px;
            span{
                font-size: 21px;
            }
         }
         .content{
            p{
                font-size: 17px;
                color: #666666;
            }
         }
       }
    }
    
   }
   .hot{
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    .hot-cook{
      width: 380px;
      padding: 0 5px;
      h2{
        font-size: 24px;
        margin-bottom: 5px;
      }
      .cook-img{
        img{
          width: 380px;
          height: 253px;
        }
      }
     .content-wrap{
      width: 380px;
      height: 384px;
      background-color: #f7f7f7;
       .content{
         font-size: 16px;
        line-height: 1.5;
        text-indent: 2em;
         
       }
     }
    }
   }
  //  热门推荐大标题
  .recommend{
    width: 1200px;
    text-align: center;
    margin: 20px 0;
    span{
      font-size: 28px;
    }
  }
}
.footer{
    width: 100vw;
    height: 400px;
    margin-top: 50px;
   background-color: #535353;
   display: flex;
   justify-content: space-between;
     .footer-left{
        margin: 30px 0 0 50px;
        .footer-leftTop{
            display: flex;
            margin-bottom: 25px;
          .left-img{
            margin-right: 5px;
            img{
                border-radius: 10px;
            }
          }
          .left-span{
            span{
             height: 56px;
             line-height: 56px;
             color: #a8a8a8;
             font-size: 18px;
            }
          }
        }
        .left-content{
            font-size: 20px;
            color: #a8a8a8;
            width: 500px;
            line-height: 1.5;
           .left-content-top{
            margin-bottom: 10px;
           }
        }
     }
     .footer-right{
        display: flex;
        margin: 100px 100px 0 0;
        .wechat{
            margin-right: 30px;
            .wechat-img{
                img{
                    width: 150px;
                    height: 136px;
                }
            }
            .wechat-span{
                text-align: center;
                margin-top: 10px;
              span{
                font-size: 20px;
                color:#a8a8a8 ;
              }
            }
        }
        .qq{
            margin-right: 15px;
            .qq-img{
                img{
                    width: 150px;
                    height: 136px;
                }
            }
            .qq-span{
                text-align: center;
                margin-top: 10px;
              span{
                font-size: 20px;
                color:#a8a8a8 ;
              }
            }
        }
     }
   }
</style>



