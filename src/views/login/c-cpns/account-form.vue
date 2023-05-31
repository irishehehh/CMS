<template>
  <div class="account">
    <el-form label-width="60px" size="large" :model="account" :rules="rules" ref="formRef" >
    <el-form-item label="账号" prop="name">
      <el-input  v-model="account.name"/>
    </el-form-item>
    <el-form-item  label="密码" prop="password">
      <el-input  v-model="account.password" show-password/>
    </el-form-item>
 
  </el-form>

  </div>
</template>

<script setup lang="ts"> 
import useLoginStore from '@/stores/login';
import { FormRules,ElForm, ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import type {IAccount} from '@/types/index'
import { localCache } from '@/utils/cache';


const account = reactive<IAccount>({
  name:localCache.getCache('name') ?? '',
  password:localCache.getCache('password') ?? ''
})
//获取表单 form DOM 节点
const formRef = ref<InstanceType<typeof ElForm>>()
  // 登录store
  const loginStore = useLoginStore()

// 表单校验规则
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入有效账号名', trigger: 'blur' },
    {pattern:/^[a-z0-9]{6,20}$/,message:'必须是6~20位长度',trigger:'blur'}
  
  ],
  password:[
    {required:true,message:'请输入有效密码',trigger:'blur'},
    {pattern:/^[a-z0-9]{3,}$/,message:'必须三位以上',trigger:'blur'}

  ]

})

// 执行账号登录逻辑

const loginAction = (isRemPwd:boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      const name = account.name
      const password = account.password

      // 发起网络请求
    
      
     loginStore.loginAccountLogin(account).then(() => {

      // 是否需要记住密码
      if (isRemPwd) {
        localCache.setCache('name',name)
      localCache.setCache('password',password)
      }else {
        localCache.deleteCache('name')
        localCache.deleteCache('password')
      }
     
       
     })

    

      
      
    } else {
      ElMessage.error('登录失败')
      
    }
    

  })

 
  
}

//暴露出去
defineExpose({
  loginAction
})

</script>

<style lang="less" scoped>

</style>