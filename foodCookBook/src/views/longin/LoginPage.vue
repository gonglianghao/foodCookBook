<template>
  <el-row class="login-page">
    <!-- 总共24份左侧背景占14份 -->
    <el-col :span="14" class="bg"></el-col> 
    <el-col :span="6" :offset="2" class="form">
      <el-form
       ref="form"
       size="large" 
       autocomplete="off"
        v-if="isRegister"
        :model="formModel"
        :rules="rules"
        >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="formModel.username"></el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input :prefix-icon="User" placeholder="请输入昵称" v-model="formModel.nickname"></el-input>
        </el-form-item >
        <el-form-item prop="phone">
          <el-input :prefix-icon="Iphone" placeholder="请输入手机号" v-model="formModel.phone"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            v-model="formModel.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请再次输入密码"
            v-model="formModel.repassword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="register" class="button" type="primary" auto-insert-space>
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <el-form 
      ref="form" 
      size="large" 
      autocomplete="off"
      :model="formModel"
      :rules="rules"
       v-else
       >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input :prefix-icon="Iphone" v-model="formModel.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            :prefix-icon="Lock"
            type="password"
            v-model="formModel.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button  @click="login" class="button" type="primary" auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>


<script setup>
import { Iphone, Lock,User} from '@element-plus/icons-vue'
import { ref ,watch } from 'vue'
import {userRegisterServer,userLoginServer} from '@/api/user'
import { useRouter } from 'vue-router';
const router = new useRouter()
const isRegister = ref(false)
const form = ref()
// 注册校验
 const formModel=ref({
  username:'',
  nickname:'',
  phone:'',
  password:'',
  repassword:''
 })
 const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 8, message: '用户名必须是2-8位字符', trigger: 'blur' }
  ],
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 1, max: 8, message: '用户名必须是1-8位字符', trigger: 'blur' }
  ], 
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern:/^1[3-9]\d{9}$/, message: '必须11位以1开头第二位数字为3-9', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^\S{3,15}$/, message: '密码长度为3-15', trigger: 'blur' }
  ],
  repassword: [
    { required: true, message: '请输入二次密码', trigger: 'blur' },
    { pattern: /^\S{3,15}$/, message: '密码长度为3-15', trigger: 'blur' },
    {
      //自定义校验  validator
      validator: (rule, value, calllback) => {
        //判断value和当前form中收集的password是否一致
        if (value !== formModel.value.password) {
          calllback(new Error('两次密码不一致'))
        } else {
          calllback() //校验成功也要callback
        }
      },
      trigger: 'blur'
    }
  ]
 }

//  点击注册按钮
const register = async()=>{
     await form.value.validate()
     await userRegisterServer(formModel.value)
     ElMessage.success('注册成功')
  setTimeout(()=>{
  // 切换到登录
  isRegister.value = false
  },1500)
}
// 切换登录注册重置表单,监听页面改变
watch(isRegister, () => {
  formModel.value = {
  username:'',
  nickname:'',
  phone:'',
  password:'',
  repassword:''
  }
})

// 点击登录
const login= async()=>{
  await form.value.validate()
  const res = await userLoginServer(formModel.value)
  console.log(res);
  ElMessage.success('登录成功')
  localStorage.setItem('userInfo',JSON.stringify(res.data))
 setTimeout(()=>{
  router.push('/homePage')
 },1500)
}
</script>


<style lang="less" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background: url('@/assets/img/background.jpg') no-repeat;
     background-size: cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>