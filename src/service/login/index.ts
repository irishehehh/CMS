import type { IAccount } from "@/types";
import { localCache } from "@/utils/cache";
import hyRequest from "..";

export function accountLogin (account:IAccount) {

 return hyRequest.post({
    url:'/login',
    data:account
  })

}

export function  getUserInfoById (id:number) {

  return hyRequest.get({
    url:'/users/' + id,
    headers:{
      Authorization:localCache.getCache('token')
    }
  })

}

export function getUserMenusByRoleId (id:number) {
  return hyRequest.get({
    url:`/role/${id}/menu`

  })
}