<template>
  <div class="search">

    <el-form label-width="80px" size="large" :model="searchForm" ref="formRef">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
          <el-form-item :label="item.label" :prop="item.prop">
              <!-- <component :is="'el-' + item.type" /> -->
              <template v-if="item.type ==='input'">
                <el-input  v-model="searchForm[item.prop]"
                
                :placeholder="item.placeholder"/>

              </template>
              <template v-if="item.type ==='date-picker'">
                <el-date-picker
         v-model="searchForm[item.prop]"
          type="daterange"
         range-separator="-"
         start-placeholder="开始时间"
          end-placeholder="结束时间"                                                       
        
      />

              </template>
          </el-form-item>
          </el-col> 

        </template>

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

interface IProps {
  searchConfig:{
    formItems:any[]

  }
}
const props = defineProps<IProps>()


const initalForm:any = {}
for (const item of props.searchConfig.formItems) {

    initalForm[item.prop] = item.initalValue
      
    
  }

const searchForm = reactive(initalForm)

const formRef = ref<InstanceType<typeof ElForm>>()

const handleReset = () => {
 
  
  formRef?.value.resetFields()


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