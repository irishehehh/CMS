<template>
  <div class="main">
   
 
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'" >
        <main-menu :isCollapse="isCollapse"/>
      </el-aside>
     
      <el-container>
        <el-header height="50px">

          <main-headers @folder-change="handleFoldChange"/>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
 



   
  </div>
</template>

<script setup lang="ts">
import {mainHeaders,mainMenu} from '@/components/index'
import { ref } from 'vue'

const isCollapse = ref(false)
const handleFoldChange = (isFold:boolean) => {
  isCollapse.value = isFold


}


</script>

<style lang="less" scoped>

.main {
  height: 100%;
}

.main-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.3s linear;
    scrollbar-width: none;


  }

  .el-header {
    background-color: #fff;
  }
  .el-main {
      background-color: #f2f2f2;
  }
}



</style>
