<template>
  


    <div class="search"><user-search @query-click="handleQueryClick" @reset-click="handleResetClick"/></div>
    <user-content ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick"/>
    <user-modal ref="modalRef"/>



</template>

<script setup lang="ts">
import { ref } from 'vue';
import userContent from './c-cpns/user-content.vue';
import userSearch from './c-cpns/user-search.vue';
import userModal from './c-cpns/user-modal.vue';


const contentRef = ref<InstanceType<typeof userContent>>()
  const modalRef = ref<InstanceType<typeof userModal>>()
  

const handleQueryClick = (formData:any) => {

  contentRef.value?.fetchUserList(formData)

 
  


}
let isNew = ref(true)

const handleEditClick = (itemData:any) => {

  isNew.value = false

  modalRef.value?.modalVisable(isNew.value,itemData)


}

const handleNewClick = () => {
  isNew.value = true
  modalRef.value?.modalVisable(isNew.value)

}
const handleResetClick = () => {
  contentRef.value?.fetchUserList()

}
</script>

<style lang="less" scoped>

.search {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  overflow: hidden;
}

</style>