<template>
   <div class="home-banner">
    <div class="carousel" @mouseenter="stop"  @mouseleave="start">
        <!-- 轮播图图片 -->
        <ul class="carousel-body">
            <li class="carousel-item" :class="{ fade: active==index }" v-for="(item, index) in slides"
                :key="item.id">
                    <img :src="item.imageUrl" alt="" />
                <div class="content">
                   <h3>{{item.title}}</h3>
                     <p>{{item.content}}</p>
                 </div>
            </li>

        </ul>
        <div class="carousel-btn prev" @click="prev"><span class="iconfont icon-xiangzuoanniu"></span></div>
        <div  class="carousel-btn next" @click="next"><span class="iconfont icon-youanniu-moren"></span></div>
         
        <!-- 底部小圆点 -->
        <div class="carousel-indicator">
            <span v-for="(item, index) in slides" @click="active=index" :class="{ active: active === index }"
                :key="item.id"></span>
        </div>
    </div>
   </div>
    
   
</template>



<script setup >
import { ref ,onUnmounted} from 'vue';
const { slides} =  defineProps({
       slides:{
        type:Array
       }
})

// console.log(slides);
const active = ref('0')

// 上一张下一张
const prev = () => {
    active.value--;
    if (active.value < 0) {
        active.value = 4
    }
}
const next = () => {
    active.value++;
    
    if (active.value > 4) {
        active.value = 0
    }
}


let timer = null
timer = setInterval(() => {
  next()
}, 2000)
const stop = () => {
  clearInterval(timer)
}
const start = () => {
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    next()
  }, 2000)
}
onUnmounted(() => {
  if (timer != null) {
    clearInterval(timer)
  }
})

</script>

<style scoped lang="less">

.home-banner{
    background-color: pink;
    .carousel{
    width:900px;
    height: 504px;
    position: relative;
   
    .carousel-body{
        position: relative;
        .carousel-item{
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            transition: opacity 0.5s linear;
            img{
                width: 100%;
                height: 100%;
            }
            .content{
                position: absolute;
                left: 25px;
                bottom: 50px;
                color: #fff;
                h3{
                    font-size: 20px;
                }
                p{
                    margin-top: 10px;
                }
            }
        }
        .fade{
            opacity: 1;
            z-index: 1;
        }
    }
    .carousel-btn{
        width: 44px;
        height: 44px;
        background: rgba(0, 0, 0, 0.2);
        color: #fff;
        border-radius: 50%;
        position: absolute;
        top: 228px;
        z-index: 2;
        text-align: center;
        line-height: 44px;
        opacity: 0;
        transition: all 0.5s;
        cursor: pointer;
        border: 0;
    }
    .prev{
        left: 20px;
    }
    .next{
        right: 20px;
    }
    .carousel-indicator{
        position: absolute;
        left: 0;
        bottom: 20px;
        z-index: 2;
        width: 100%;
        text-align: center;
        span{
            display: inline-block;
            width: 12px;
            height: 12px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 50%;
            cursor: pointer;
            margin-left: 12px;
        }
        .active{
            background: #fff;
        }
    }
 }
 &:hover{
    .carousel-btn{
        opacity: 1;
    }
}
}

</style>
