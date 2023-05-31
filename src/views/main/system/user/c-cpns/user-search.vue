<template>
  <div class="search">

    <el-form label-width="80px" size="large" :model="searchForm" ref="formRef">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
        <el-input placeholder="请输入查询用户名" v-model="searchForm.name"/>
      </el-form-item></el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
        <el-input placeholder="请输入真实姓名" v-model="searchForm.realname"/>
      </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
        <el-input placeholder="请输入手机号码" v-model="searchForm.cellphone"/>
      </el-form-item></el-col>
     
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select placeholder="请输入查询的状态" style="width: 100%;" v-model="searchForm.enable">
              <el-option :value="1" label="启用"></el-option>
              <el-option :value="0" label="禁用"></el-option>
            </el-select>

          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
       v-model="searchForm.createAt"
        type="daterange"
        range-separator="-"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        
      />

          </el-form-item>
        </el-col>
     
  




      </el-row>

      <div class="btns">
        <el-button size="large" icon="Refresh" @click="handleReset">重置</el-button>
        <el-button type="primary" size="large" icon="Search" @click="handleQuery">查询</el-button>
      </div>
      
    
     
  
 
    </el-form>

  </div>
</template>

<script setup lang="ts">
import { ElForm } from "element-plus";
import { reactive, ref } from "vue";
const emit = defineEmits(['queryClick','resetClick'])


const searchForm = reactive({
  name:'',
  realname:'',
  cellphone:'',
  enable:1,
  createAt:[],
 

})

const formRef = ref<InstanceType<typeof ElForm>>()

const handleReset = () => {
 
  
  formRef?.value.resetFields()

  //
  emit('resetClick')


}

const handleQuery = () => {
 emit('queryClick',searchForm)
  
}


</script>

<style lang="less" scoped>


.el-form-item {
  padding: 20px;
  margin-bottom: 0px;


 
}

 .btns {
    text-align: right;
    padding: 0 50px 10px 0;
  }



</style>