<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <template v-for="item in breadcrumbs" :key="item.name">
      <el-breadcrumb-item :to="item.path "
        >{{ item.name }}</el-breadcrumb-item
      >
    </template>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import useLoginStore from '@/stores/login/index'
import { mapPathToBreadcrumb } from '@/utils/map-menu'
import { computed, watch } from 'vue'



const route = useRoute()
const userMenus = useLoginStore().userMenus
const breadcrumbs = computed(()=>{
  return mapPathToBreadcrumb(route.path, userMenus)
})



</script>

<style lang="less" scoped></style>
