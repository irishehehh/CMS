<template>
  <div class="main-menu">
    <div class="logo">
        <img src="@/assets/images.png" alt="logo">
        <h2 class="title">后台管理系统</h2>
    </div>
    <div class="menu">
     
     <el-menu 
     :default-active="defaultActive"
     text-color="#b7bdc3"
     active-text-color="#fff"
     background-color="#001529"
     :collapse="isCollapse"
     
     >
     <template v-for="item in userMenus" :key = "item.id">
      <el-sub-menu :index="String(item.id)">
        <template #title>
          <el-icon>
            <component :is="item.icon.split('-icon-')[1]"/>
          </el-icon>
          <span>{{ item.name }}</span>

        </template>
       
        <!-- 子菜单 -->
        <template v-for="subItem in item.children" :key="subItem.id">
         
          <el-menu-item :index="String(subItem.id)" @click="handleItemClick(subItem)">{{ subItem.name }}</el-menu-item>

     
        </template>

      </el-sub-menu>

     </template>
     
  
         

      

     </el-menu>

    </div>
  

  </div>
</template>

<script setup lang="ts">

import useLoginStore from '@/stores/login';
import { useRoute, useRouter } from 'vue-router';
import {mapPathToMenu} from '@/utils/map-menu'
import { computed, ref } from 'vue';

defineProps({
  isCollapse:{
    type:Boolean,
    default:false
  }
})

const loginStore = useLoginStore()


const userMenus = loginStore.userMenus



 

 
 
const router = useRouter()

const handleItemClick = (subItem:any) => {
 const url = subItem.url
 router.push(url)
  

}
const route = useRoute()
const defaultActive = computed(() => {
  const pathMenu  =mapPathToMenu(route.path,userMenus)
    return ref(pathMenu?.id + '').value 
 })


</script>

<style lang="less" scoped>

.main-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 30px;
    flex-direction: row;
    padding: 12px 10px 8px 12px;
    justify-content: start;
    align-items: center;
    overflow: hidden;

    img {
      height: 100%;
      margin: 0 10px;
    }


    .title {
      color: #fff;
      font-size: 20px;
      font-weight: 700;
      white-space: nowrap;
    }
  }


  .el-menu {
    border-right: none;
    user-select: none;
 

    .el-sub-menu {
      .el-menu-item {
        padding-left: 50px !important;
        background-color: #001529;
      }

      .el-menu-item:hover{
        color: #fff;
      }

      .el-menu-item.is-active {
        background-color: #0a60bd;
      }



    }
  }






}

</style>