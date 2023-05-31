
import { getEntireDepartment, getEntireRoles } from "@/service/systems/system";
import { defineStore } from "pinia";


interface IMainState {
  entireRoles:any[],
  entireDepartment:any[]
}



const useMainStore = defineStore('main',{
  state:():IMainState => ({
    entireRoles:[],
    entireDepartment:[]

  }),

  actions :{

   async fetchEntireDataAction () {
     const resRoles = await  getEntireRoles()
    const resDepartment = await  getEntireDepartment()

    this.entireRoles = resRoles.data.list
    this.entireDepartment = resDepartment.data.list
    

    }

  }
})

export default useMainStore