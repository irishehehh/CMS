<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuClick">
      <el-icon size="30px">
        <component :is="isFold ? 'Expand' : 'Fold'"/>
      </el-icon>

    </div>
    <div class="content">
      <div class="breadcrumb"><breadcrumb/></div>
      <div class="info">
        <headerInfo/>
      </div>

    </div>
    
  
   
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import breadcrumb from "./c-cpns/breadcrumb.vue";
import headerInfo from "./c-cpns/header-info.vue";


const emit = defineEmits(['FolderChange'])
const isFold = ref(false)

const handleMenuClick = () => {
  isFold.value = !isFold.value
  emit('FolderChange',isFold.value)

}

</script>

<style lang="less" scoped>

.main-header {
  display: flex;
  flex: 1;
  align-items: center;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }

}

</style>