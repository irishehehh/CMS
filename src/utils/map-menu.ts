import { localRoutes } from "@/router"
import { RouteRecordRaw } from "vue-router"


export let firstMenu:any = null
export function mapMenusToRoutes (userMenus:any[]) {

  const routes:RouteRecordRaw[]  = [] 

  for (const menu of userMenus) {

    for (const subMenu of menu.children) {

      const route = localRoutes.find((item) => item.path === subMenu.url)

      if (route) {

        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({path:menu.url,redirect:route.path})
        }
        routes.push(route)

      }

      if (!firstMenu  && route)  firstMenu =subMenu


    }




  }

  return routes



}







export function mapPathToMenu (path:string,useMenus:any[]) {

  for (const menu of useMenus) {
    for(const subMenu of menu.children) {
      if (subMenu.url === path) {
        return subMenu
      }

    }
  }
  return undefined


}


interface IBreadCrumb {
  name:string
  path:string
}
export function mapPathToBreadcrumb (path:string,useMenus:any[]) {
  const breadCrumb:IBreadCrumb[] = [] 
  for (const menu of useMenus) {
    for(const subMenu of menu.children) {
      if (subMenu.url === path) {
        breadCrumb.push({name:menu.name,path:menu.url})
        breadCrumb.push({name:subMenu.name,path:subMenu.url})
          
      }

    }
  }

  return breadCrumb


}