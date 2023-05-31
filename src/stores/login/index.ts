import { accountLogin, getUserInfoById, getUserMenusByRoleId } from "@/service/login";
import { defineStore } from "pinia";
import type { IAccount } from "@/types";
import { localCache } from "@/utils/cache";
import router, { addRoutesWithMenu } from "@/router";
import useMainStore from "../main/main";


interface ILoginState {
  token:string
  userInfo:any,
  userMenus:any
}


const useLoginStore = defineStore('login',{
  state:():ILoginState=> ({
    token:localCache.getCache('token') ?? '',
    userInfo:localCache.getCache('userInfo')?? {},
    userMenus:localCache.getCache('userMenus') ?? []


  }),
  actions:{
  async loginAccountLogin (account:IAccount) {
   const  loginRes = await accountLogin(account)


    
   const id  = loginRes.data.id
   this.token = loginRes.data.token
   const name = loginRes.data.name
    
   //本地缓存 持久化
   localCache.setCache('token',this.token)


  

  // 获取用户登录的详细信息

   const userInfoRes = await getUserInfoById(id)
     const userInfo = userInfoRes.data
    this.userInfo = userInfo
  

    //根据角色请求用户的权限
    const userMenusList =  await getUserMenusByRoleId(id)
    const userMenus = userMenusList.data

    this.userMenus = userMenus


    
    localCache.setCache('userInfo',userInfo)
    localCache.setCache('userMenus',userMenus)

    addRoutesWithMenu(localCache.getCache('userMenus'))
    
    // 请求部门，role数据
    const mainStore = useMainStore()
    mainStore.fetchEntireDataAction()
    

  // 跳转main界面


  router.push('/main')





    },

    loadLocalDataAction() {
      this.token = localCache.getCache('token')
      this.userInfo = localCache.getCache('userInfo')
      this.userMenus = localCache.getCache('userMenus')

        // 请求部门，role数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      if (this.token && this.userMenus) {
        addRoutesWithMenu(this.userMenus)
      }

     
    }
  }
})


 export default useLoginStore
