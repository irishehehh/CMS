
import { createUserData, deletePageById, deleteUserById, editPageData, newPageList, postPageListData, postUserListData,updateUserData } from "@/service/systems/system";
import { defineStore } from "pinia";


export interface IUser {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  createAt: string
  updateAt: string
}
interface ISystemState {
  userList:IUser[],
  userTotalCount:number,
  pageList:any[],
  pageTotalCount:number
}


const useSystemStore = defineStore('system',{
   state:():ISystemState =>({
     userList:[],
     userTotalCount:0,
     pageList:[],
     pageTotalCount:0

  }),

  actions:{

  async  postUsersAction (queryInfo:any) {

      const userListRes = await postUserListData(queryInfo)
      
      const {totalCount,list} = userListRes.data
      
      

    
      

      this.userTotalCount = totalCount
      this.userList = list

      

      

    },


    async deleteUserByIdAction(id:number) {

      const deleteRes = await deleteUserById(id)
     
      this.postUsersAction({offset:0,size:10})
      

    },

    async newUserInfoAction (userInfo:any) {
      const newResult = await createUserData(userInfo)
 
        this.postUsersAction({offset:0,size:10})

    },

    async editUserDataAction (id:number,userInfo:any) {

      const eidtResult = await updateUserData(id,userInfo)
      this.postUsersAction({offset:0,size:10})
      
     
      

    },

    //  部门

    async postPageListAction (pageName:string,queryInfo:any) {

      const pageListData = await postPageListData(pageName,queryInfo)
      const {list,totalCount} = pageListData.data
      this.pageList = list
      this.pageTotalCount = totalCount
      
      

        
        


    },

    async deletePageByIdAction (pageName:string,id:number) {

      const deleteRes = await deletePageById(pageName,id)

      this.postPageListAction('departments',{offset:0,size:10})

    },

      async newPageListAction (pageName:string,itemData:any) {

        
        
        const newResult = await newPageList(pageName,itemData)
        this.postPageListAction('departments',{offset:0,size:10})


    },

    // 编辑部门数据

    async  editPageDataAction (pageName:string,id:number,queryInfo:any) {

      const editResult = await editPageData(pageName,id,queryInfo)
     
      this.postPageListAction('departments',{offset:0,size:10})


    }




  }

  
})

export default useSystemStore