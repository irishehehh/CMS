<template>
  <div>
    <el-dialog v-model="centerDialogVisible" :title="isNewRef ?'新建部门' : '编辑部门'" width="30%" center>

      <div class="form">
        <el-form :model="formData" label-width="100px">
          <el-form-item label="部门名称" prop="name">
            <el-input placeholder="请输入部门名称" v-model="formData.name"/>
          </el-form-item>
          <el-form-item label="上级部门" prop="parentId">
           <el-select v-model="formData.parentId" placeholder="请选择上级部门" style="width: 100%;">
            <template v-for="item in entireDepartment" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>

              </template>
           </el-select>
          </el-form-item>
          <el-form-item label="部门领导" prop="leader">
            <el-input placeholder="请输入领导名称" v-model="formData.leader"/>
          </el-form-item>
        
    
      
        
        </el-form>

      </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirmClick">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>

  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import useMainStore from '@/stores/main/main'
import useSystemStore from '@/stores/system/system'


import { storeToRefs } from "pinia";


const centerDialogVisible = ref(false)
const systemStore = useSystemStore()
const formData = reactive<any>({
  name:'',
  leader:'',
  parentId:'',


})

const isNewRef = ref(true)
const editData = ref()
const mainStore = useMainStore()

const {entireDepartment} = storeToRefs(mainStore)

// 确定逻辑
const handleConfirmClick = () => {
  centerDialogVisible.value = false


  if (isNewRef.value) {
      // 创建新的用户
     console.log(formData);
     
      
  systemStore.newPageListAction('department',formData)
  } else {
    // 编辑数据
    systemStore.editPageDataAction('department',editData.value.id,formData)
  }



}







function modalVisable (isNew?:boolean,itemData?:any) {
 
  
 
  isNewRef.value = isNew ?? true
  centerDialogVisible.value = true

 

  
  if (!isNew && itemData) {
  
    
   
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData

  }else {
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value  = null

  }
}




defineExpose({
  modalVisable
})

</script>

<style lang="less" scoped>

</style>