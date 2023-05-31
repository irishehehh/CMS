import hyRequest from "..";

export function postUserListData (queryInfo:any) {

  return hyRequest.post({
    url:'/users/list',
    data:queryInfo
  })
}

export function deleteUserById (id:number) {

    return hyRequest.delete({
      url:`/users/${id}`
    })

}


export function getEntireRoles () {
  return hyRequest.post({
    url:'/role/list',

  })
}

export function getEntireDepartment () {
  return hyRequest.post({
    url:'/department/list',
  
  })
}

export function createUserData(userInfo:any) {
  return hyRequest.post({
    url:'/users',
    data:userInfo
  })
}

export function updateUserData (id:number,userInfo:any) {

  return hyRequest.patch({
    url:`/users/${id}`,
    data:userInfo
  })

}



export function postPageListData (pageName:string,queryInfo:any) {

  return hyRequest.post({
    url:`/${pageName}/list`,
    data:queryInfo
  })



}

export function deletePageById (pageName:string,id:number) {

  return hyRequest.delete({
    url:`/${pageName}/${id}`
  })

}

export function newPageList (pageName:string,itemData:any) {

  return hyRequest.post({
    url:`/${pageName}`,
    data:itemData
  })
}

export function editPageData (pageName:string,id:number,queryInfo:any) {

  return hyRequest.patch({
    url:`/${pageName}/${id}`,
    data:queryInfo
  })
}
