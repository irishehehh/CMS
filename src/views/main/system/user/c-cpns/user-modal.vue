<template>
  <div>
    <el-dialog v-model="centerDialogVisible" title="新建用户" width="30%" center>

      <div class="form">
        <el-form :model="formData" label-width="100px">
          <el-form-item label="用户名" prop="name">
            <el-input placeholder="请输入用户名" v-model="formData.name"/>
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input placeholder="请输入真实姓名" v-model="formData.realname"/>
          </el-form-item>
          <el-form-item label="密码" prop="password" v-if="isNewRef">
            <el-input placeholder="请输入密码" v-model="formData.password"/>
          </el-form-item>
          <el-form-item label="电话号码" prop="cellphone">
            <el-input placeholder="请输入电话号码" v-model="formData.cellphone"/>
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select v-model="formData.roleId" placeholder="请选择角色" style="width: 100%;">
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>

              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
           <el-select v-model="formData.departmentId" placeholder="请选择部门" style="width: 100%;">
            <template v-for="item in entireDepartment" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>

              </template>
           </el-select>
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
  realname:'',
  cellphone:'',
  password:'',
  roleId:'',
  departmentId:''

})

const isNewRef = ref(true)
const editData = ref()
const mainStore = useMainStore()

const {entireDepartment,entireRoles} = storeToRefs(mainStore)

// 确定逻辑
const handleConfirmClick = () => {
  centerDialogVisible.value = false

  if (isNewRef.value) {
      // 创建新的用户
  systemStore.newUserInfoAction(formData)
  } else {
    // 编辑数据
    systemStore.editUserDataAction(editData.value.id ,formData)
  }



}







function modalVisable (isNew:boolean,itemData?:any) {
 
  
 
  isNewRef.value = isNew
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