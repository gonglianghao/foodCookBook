<template>
    <div class="cook-all">
        <MenuHeader></MenuHeader>
        <div class="cook-wrap">
           <div class="mian">
            <article class="article">
                 <div class="title">
                    <h2>菜谱大全</h2>
                 </div>
                 <div  class="title-btn">
                    <div class="title-btn-name" v-for="(item,index) in titleName" :key="index">
                      <el-button type="info">{{item}}</el-button>
                    </div>
                 </div>
                   <!-- 各种肉类信息 -->
                   <div class="contentall">
                 <section class="section" v-for="(item,index) in contentAll" :key="index">
                      <h2>{{item.title}}</h2>
                      <div class="type-name">
                        <p v-for="(typeName,index) in item.typeName" :key="index">{{typeName}}</p>
                      </div>
                 </section>
                </div>
                 <!-- 各种肉类信息结束 -->
            </article>
           </div>
        </div>
    </div>
</template>

<script setup>
import {btnameStore} from '@/stores/index'
const {titleName,contentAll}  =btnameStore()

</script>

<style lang="less" scoped>
  .cook-all{
    width: 1200px;
    margin: 0 auto;
    .cook-wrap{
        .mian{
         .article{
           width: 100%; 
           .title{
            margin: 30px 0;
            width: 100%;
            text-align: center;
            h2{
                font-size: 24px;
                color: #817c74;
            }
           }
           .title-btn{
            width: 1200px;
            display: flex;
            flex-wrap: wrap;
            .title-btn-name{
              margin: 10px 10px;
              :deep(.el-button){
                  padding: 20px 30px; 
                  font-size: 20px;
                }
            }
           }
           .contentall{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .section{
              width: 550px;
              border: 1px solid #eae6e3;
              margin: 10px 20px;
            h2{
              font-size: 22px;
              padding: 10px;
              background-color: #f1f0ee;
            }
            .type-name{
              display: flex;
              flex-wrap: wrap;
              p{
                padding: 10px 8px;
                margin: 5px 8px;
                cursor: pointer;
              }
            }
           }
           }
         }
        }
    }
  }
</style>