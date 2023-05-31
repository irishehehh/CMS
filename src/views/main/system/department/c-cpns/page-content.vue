<template>
  <div class="content">
    <div class="header">
      <div class="title">部门列表</div>
      <el-button type="primary" size="large" @click="addNewUserClick">新建部门</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <el-table-column type="selection" align="center" width="50px" />
        <el-table-column type="index" label="序号"  align="center" width="60px"/>
        <el-table-column label="部门名称" prop="name"  align="center" width="150px"/>
        <el-table-column label="部门领导" prop="leader"  align="center" width="150px"/>
        <el-table-column label="上级部门" prop="parentId"  align="center" width="150px"/>
        <el-table-column label="状态" prop="enable"  align="center" width="80px">
          <template #default="scope">
            <el-button size="small" :type="scope.row.enable ? 'primary' : 'danger'" plain>{{ scope.row.enable ? '启用':'禁用' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createAt"  align="center">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
            
          </template>
        </el-table-column>
        <el-table-column label="更新时间" prop="updateAt"  align="center">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
            
          </template>
        </el-table-column>

        <el-table-column label="操作" width="180px"  align="center">
          <template #default="scope">
            <el-button size="small" text type="primary" icon="Edit" @click="handleEditClick(scope.row)">编辑</el-button>
          <el-button size="small" text type="danger" icon="Delete" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
       
      </el-table>
    </div>
    <div class="pageination">
      <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30]"
      small="small"
      layout="total ,sizes, prev, pager, next, jumper"
      :total="pageTotalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/stores/system/system'
import { storeToRefs } from 'pinia'
import {formatUTC} from '@/utils/format-date'
import { ref } from 'vue'

const currentPage = ref(1)
const pageSize = ref(10)

const emit = defineEmits(['newClick','editClick'])


const systemStore = useSystemStore()

fetchPageListData()


const { pageList,pageTotalCount } = storeToRefs(systemStore)

const handleSizeChange = () => {
  fetchPageListData()

}
const handleEditClick = (info:any) => {
    emit('editClick',info)
  


}
const handleCurrentChange = () => {

  
  fetchPageListData()

}

const handleDelete = (id:number) => {

  

    systemStore.deletePageByIdAction('departmentDelete',id)
  
  

}

const addNewUserClick = () => {
  emit('newClick')

}

function fetchPageListData (formData:any ={}) {
  const size = pageSize.value
  const offset = (currentPage.value -1) * size

  const pageInfo = {size,offset}

  const queryInfo = {...pageInfo,...formData}


  systemStore.postPageListAction('departments',queryInfo)

}

defineExpose({fetchPageListData})


</script>

<style lang="less" scoped>
.content {
  margin-top: 25px;
  background-color: #fff;
  padding: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;

    .title {
      font-size: 22px;
      font-weight: 700;
    }
  }
}

.table {
  .el-table__cell {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
  }
}

.pageination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
