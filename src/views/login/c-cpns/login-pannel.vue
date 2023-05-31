<template>
  <div class="login-pannel">
    <h1 class="title">后台管理系统</h1>
    
    <!-- tab切换 -->
    <div class="tabs">
      <el-tabs stretch type="border-card" v-model="activeName">
    <el-tab-pane label="账号登录" name="account">
      <template #label>
        <div class="label">
          <el-icon><User /></el-icon>
          <span class="text">账号登录</span>
        </div>

       

      </template>
      
     <!-- input -->
     <account-form ref="accountRef"/>

    </el-tab-pane>
    <el-tab-pane label="手机登录" name="phone">
      <template #label>
        <div class="label">
          <el-icon><Iphone /></el-icon>
          <span class="text">手机登录</span>

        </div>

      </template>
      <!-- input -->
      <phone-form/>
    </el-tab-pane>
   
  </el-tabs>
    </div>
   
    <!-- 控制栏 -->
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large"/>
      <el-link type="primary">忘记密码</el-link>
    </div>
   
    <!-- 登录按钮 -->
      <el-button type="primary" class="login-btn" size="large" @click="handleLogin">立即登录</el-button>
  


  </div>
</template>

<script setup lang="ts">
import { localCache } from "@/utils/cache";
import { ref, watch } from "vue";
import accountForm from './account-form.vue'
import phoneForm from "./phone-form.vue";



//记住密码 checkbox
const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
//定义account form ref DOM
const accountRef  = ref<InstanceType<typeof accountForm>>()

//tab 切换name
const activeName = ref('account')


watch(isRemPwd,(newVal) => {
 localCache.setCache('isRemPwd',newVal)
  
})

//账号登录
const handleAccount = () => {
   accountRef.value?.loginAction(isRemPwd.value)
  
}

//手机登录
const handlePhone = () => {
  console.log(222);
  
}

const handleLogin = () => {
  activeName.value ==='account' ? handleAccount() : handlePhone()
}







</script>

<style lang="less" scoped>

.login-pannel {
  width: 330px;
  margin-bottom: 130px;

  .title {
    text-align: center;
    margin-bottom: 10px;

  }
  .text {
    margin-left: 6px;
  }

  .controls {
    display: flex;
    justify-content: space-between;
    align-content: item-center;
  }

 .login-btn {
   width: 100%;
   margin-top: 10px;
 }


}

</style>