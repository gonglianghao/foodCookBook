<template>
    <div class="menuHeader">
        <header>
            <div class="header">
            <div class="header-left">
               <div class="header-favicon"> 
                <img src="@/assets/img/favicon.png" alt="">
               </div>
                <div class="title">
                    <div class="title-top">美食厨房</div>
                     <div class="title-bottom">拥有各式食谱</div>
                </div>
            </div>
            <div class="header-center">
                <div class="center-text">
                    <input type="text" placeholder="食谱">
                </div>
                    <div class="center-search">
                        <span>搜索</span>
                    </div>
            </div>
            <div class="header-right">
                <span @click="login">登录|注册</span>    
            </div>
        </div>
        <nav class="nav">
          <ul>
            <li @click="goHomePage">首页</li>
            <li @click="goCookAll">菜谱大全</li>
            <li>热门</li>
            <li>回答</li>
            <li>图片</li>
            <li>主题</li>
          </ul>
        </nav>
        </header>
    </div>
    
</template>

<script setup>

import { useRouter } from 'vue-router';
const router = new useRouter()
const login = ()=>{
   router.push('/login')
}

// 点击去首页
const goHomePage = ()=>{
    router.push('/homePage')
}
// 点击去菜谱大全
const goCookAll =()=>{
    router.push('/cookall')
}
</script>

<style lang="less" scoped>
.menuHeader{
    width: 1200px;
    margin: 0 auto;

    .header{
    background-color: white;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    .header-left{
        display: flex;
        width: 210px;
        height: 70px;
        justify-content: center;
        align-items: center;
        margin-left: -20px;
       .header-favicon{
        img{
            width: 70px;
            height: 56px;
            margin-right: 10px;
            border-radius: 10px;
        }
        
       }
      .title{
        .title-top{
            font-size: 21px;
            padding: 5px 0 10px;
        }
        .title-bottom{
            font-size: 14px;
            color: #4f4f4f;
        }
      } 
    }
   .header-center{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .center-text{
        width: 400px;
        height: 40px;
       
        input{
            border-radius: 10px 0 0 10px ;
            width:380px;
            height: 100%;
            padding-left: 20px;
            background-color: #f7f7f7;
            outline: none;
        }
    }
    .center-search{
        width: 70px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border-radius:0 10px 10px 0 ;
        background-color: #ffc000;
    }
   }
   .header-right{
     span{
        padding-left: 5px;
        cursor: pointer;
     }
   }
}
.nav{
    width: 1200px;
    background-color: #ffc000;
    ul{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        li{
          cursor: pointer;
            flex: 1;
            text-align: center;
        }
    }

   }
}
</style>