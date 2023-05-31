<template>
  <div>
 <page-search 
 :search-config = "searchConfig"
 
 @query-click="handleQueryClick" @reset-click="handleResetClick"
 
 />
 <page-content ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick"
 :content-config = "contentConfig"
 />
 <page-modal ref="modalRef"/>

  </div>
</template>

<script setup lang="ts">
import pageSearch from '@/components/page-search/page-search.vue'
// import pageContent from './c-cpns/page-content.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from './c-cpns/page-modal.vue'
import searchConfig from './config/search.config'
import contentConfig from '@/components/page-content/config/content.config'
import { ref } from 'vue'


const contentRef = ref<InstanceType<typeof pageContent>>()
  const modalRef = ref<InstanceType<typeof pageModal>>()

const handleQueryClick = (searchForm:any) => {

      contentRef.value?.fetchPageListData(searchForm)



}
const handleResetClick = () => {
    contentRef.value?.fetchPageListData()
}

const handleNewClick = () => {
  modalRef.value?.modalVisable()

}

const handleEditClick = (itemData:any) => {
  modalRef.value?.modalVisable(false,itemData)

}

</script>

<style lang="less" scoped>

</style>