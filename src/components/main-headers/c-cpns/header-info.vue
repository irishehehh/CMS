<template>
  <div class="header-info">

    <div class="operation">
      <span><el-icon><Message /></el-icon></span>
      <span><el-icon><ChatDotRound /></el-icon>
        <i class="dot"></i>
      </span>
      <span><el-icon><Search /></el-icon>
       
      </span>
    

    </div>

      <!-- info -->
  <div class="info">
    <el-dropdown>
    <span class="el-dropdown-link">
     <div class="user-info">
      <el-avatar :size="30" src="https://i.ibb.co/ZVpM8Rm/8536177.jpg"/>
        <span class="name">SJS</span>

     </div>
  
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="handleLogout">
          <el-icon><CircleClose /></el-icon>
          <span>退出登录</span>
        </el-dropdown-item>
        <el-dropdown-item divided> 
          <el-icon><InfoFilled /></el-icon>
          <span>个人信息</span>

        </el-dropdown-item>
        <el-dropdown-item>
          <el-icon><Unlock /></el-icon>
          <span>修改密码</span>
        </el-dropdown-item>
       
      </el-dropdown-menu>
    </template>
  </el-dropdown>


  </div>
  

  </div>


</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { localCache } from '@/utils/cache';

const router = useRouter()


//退出登录

const handleLogout = () => {
  localCache.deleteCache('token')
  router.push('/login')
}




</script>

<style lang="less" scoped>

.header-info {
  display: flex;
  align-items: center;
}

.operation {
  display: inline-flex;
  margin-right: 20px;
  span {
    position: relative;
    width: 40px;
    height:25px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: #f2f2f2;
    }

    i {
      font-size: 20px;

    }

    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      width: 6px;
      height:6px;
      border-radius: 100%;
      background: red;
      z-index: 10;

    }



  }





}

.info {
  cursor: pointer;

  .el-dropdown-menu__item {
    line-height: 36px !important;
    padding: 6px 22px;
  }

  .user-info {
    display: flex;
    
   align-items: center;
   justify-content: center;

   .name {
     margin-left: 10px;
   }
  }

 

}
</style>
