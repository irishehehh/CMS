import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from "path";
dotenv.config()
 
const app = express()

//盐值加密 
// const secret = bcrypt.genSaltSync(10)

const jwtSecret = 'ashdkashdkjshdfkjsdf'


app.use(express.json())
app.use(cors())

// 登录

app.post('/login',async (req,res) => {
  const {name,password} = req.body

  fs.readFile(path.resolve('./data/userlogin/user.json'),'utf-8',(err,data) => {
    if (err) {
      throw err
    }
    const userData = JSON.parse(data)
   
  const isCorUser =   userData.map((user) => {

      return user.name === name && user.password === password  }
      )
   
     
      const corUser = userData.filter((user) => {
       
      return user.name === name && user.password === password
    })[0]
    
     
     const id = corUser.id
 
      if (isCorUser) {
        jwt.sign({id,name,password},jwtSecret,{},(err,token) => {
          if (err) throw err;
        
    
          res.status(200).json({
            success:'ok', 
            code:0,
            data:{
              id,  
              name,
              password,
              token,

            }
          })
        })
    
      }
   
  })




})


// 获取用户信息

app.get(`/users/:id`, async (req,res) => {
 
  const id = parseInt(req.params.id,10)
  const token = req.headers.authorization
  
 
  fs.readFile(path.resolve('./data/systemManagement/userManage/findUser.json'),'utf-8',(err,datas) => {
    const {data} = JSON.parse(datas)
   
    if (token) {
      jwt.verify(token,jwtSecret,{},async (err,userData) => {
        if (err) throw err;
        if (userData.id ===data.id) {
          res.status(200).json({
            code:0,
            success:'ok',
            data
          })

        }
       

      })
    }
    
  


  })



})

//获取用户权限

app.get('/role/:id/menu',async (req,res) => {
  const id = parseInt(req.params.id,10)
  const token = req.headers.authorization

  if (token) {
    jwt.verify(token,jwtSecret,{},(err,RoleData) => {
        fs.readFile(path.resolve('./data/systemManagement/roleManage/list.json'),'utf-8',(err,RoleInfos) => {
          if (err) throw err;
          const {data} = JSON.parse(RoleInfos)
          data.list.map((RoleInfo) => {
           
            if (RoleInfo.id === id) {
             
              res.status(200).json({
                code:0,
                success:'ok',
                data:RoleInfo.menuList
              })
            }
          })
        
        })
    })
  
  }
})

//  获取user 列表

app.post('/users/list', async (req,res) => {
  const {offset,size,name='',realname='',cellphone='',enable=-1,createAt=[]} = req.body


  fs.readFile(path.resolve('./data/systemManagement/userManage/user.json'),'utf-8',(err,userList)=> {
    if (err) throw err
    const { data:{list} } = JSON.parse(userList)
    const sliceUserList = list.splice(offset,size)
    let queryItem 
        if (!!name ||!!cellphone ) {
        queryItem =   sliceUserList.filter((item) => {
            if (item.name.includes(name)  || item.cellphone ===cellphone ) {
             
            
                  return item
              
            }

      
          })
  
      
        }
      
    const totalCount = JSON.parse(userList).data.totalCount


    if (sliceUserList && !queryItem ) {
      res.status(200).json({
        code:0,
        data:{
          list:sliceUserList,
          totalCount

        }
      })

    } else {
      res.status(200).json({
        code:0,
        data:{
          list:queryItem,
          totalCount
        },
        
      })
    }
   

   
    
  })
 



})

    // 删除userList

  app.delete('/users/:id',async (req,res) => {
      const {id} = req.params
      let newUser 
      fs.readFile(path.resolve('./data/systemManagement/userManage/user.json'),'utf-8',(err,datas) => {
        if (err) throw err

        const resList = JSON.parse(datas).data
        
        const deletedList  = resList.list.filter((item) => {
          
          

          return item.id !=id

        })
       

        const totalCount = deletedList.length -1


      newUser = {
        code:0,
        data:{
          list:deletedList,
          totalCount
          
          
        }


      }
     
      

       fs.writeFile(path.resolve('./data/systemManagement/userManage/user.json'),JSON.stringify(newUser),(err) =>{
         if (err) throw err
       })









       

      })

      res.status(200).json({
        code:0,
        data:'删除用户成功'
      })

    
      
  })

  // 获取角色数据
  app.post('/role/list', async (req,res) => {
    fs.readFile(path.resolve('./data/systemManagement/roleManage/list.json'),'utf-8',(err,roleData) => {
      if (err) throw err
        const turnedRole = JSON.parse(roleData).data

        res.status(200).json({
          code:0,
          data:{list:turnedRole.list,
          totalCount:turnedRole.totalCount}
        })
    })

  })

  // 获取部门数据

  app.post('/department/list', async (req,res) => {
    fs.readFile(path.resolve('./data/systemManagement/department/list.json'),'utf-8',(err,departmentData) => {
      if (err) throw err;
      const turnedDepartment = JSON.parse(departmentData).data
      
      res.status(200).json({
        code:0,
        data:{
          list:turnedDepartment.list,
          totalCount:turnedDepartment.totalCount}
        
      })
    })
  })

  app.post('/departments/list', async (req,res) => {
    const {size,offset,name,leader,createAt} = req.body
    let entireList 

    if (name || leader || createAt ) {
    fs.readFile(path.resolve('./data/systemManagement/department/list.json'),'utf-8',(err,departmentList) => {
      if (err) throw err;

    const turnedDepartments = JSON.parse(departmentList).data

 const turnRes =  turnedDepartments.list.filter((item) => {
        if (item.name === name || item.leader === leader) {
          return item
        }

    })

    entireList = {
      code:0,
      data:{
        list:turnRes,
        totalCount:turnRes.length
      }
    }
   



   

    res.status(200).json(entireList)

    })
   
  

    } else {
      fs.readFile(path.resolve('./data/systemManagement/department/list.json'),'utf-8',(err,departmentData) => {
        if (err) throw err;
        const entireLists = JSON.parse(departmentData).data
     let   entireLi = entireLists.list.splice(offset,size)
    
      
        entireList = {
          code:0,
          data:{
            list:  entireLi,
            totalCount:entireLi.length

          }
       
        }
       
        res.status(200).json(entireList)
 
      })
  
      



    }
   

   
    

   
    



  })

  //  删除部门 item

  app.delete('/departmentDelete/:id',async (req,res) => {
  
    const {id} = req.params
    let deletedResult
    fs.readFile(path.resolve('./data/systemManagement/department/list.json'),'utf-8',(err,departmentData) => {
      if (err) throw err
      const turnedDepartment = JSON.parse(departmentData).data

   const deleteDepartment =   turnedDepartment.list.filter((item) => {
        if (id !=item.id) {
          return item
        }
      })

     deletedResult = {
       code:0,
       data:{
          list:  deleteDepartment,
          totalCount:deleteDepartment.length

       }
     }

     fs.writeFile(path.resolve('./data/systemManagement/department/list.json'),JSON.stringify(deletedResult),(err) => {
       if (err) throw err;
     })

      


    })

    res.status(200).json({
      code:0,
      data:'删除部门成功'
    })
    
  })

  // 新建部门

  app.post('/department',async (req,res) => {
    const {name,leader,parentId} = req.body
    const newDepartment = {
      id:new Date().getTime(),
      name,
      leader,
      parentId,
     createAt:"2021-01-02T10:04:02.000Z",
     updateAt:"2021-08-03T11:14:32.000Z"

      
    }
    fs.readFile(path.resolve('./data/systemManagement/department/list.json'),'utf-8',(err,departmentData) => {
      if (err) throw err
      const turnedDepartment = JSON.parse(departmentData).data

      turnedDepartment.list.unshift(newDepartment)
      const newDepartmentData = {
        code:0,
        data:turnedDepartment
     
      }

      fs.writeFile(path.resolve('./data/systemManagement/department/list.json'),JSON.stringify(newDepartmentData),(err) => {
        if(err) throw err;
      })



    })

    res.status(200).json({
      code:0,
      data:'新建部门成功'
    })

   
  })

  // 编辑部门
  app.patch('/department/:id', async (req,res) => {
    const {id} = req.params
    const obj = req.body
  
    const editDepartment = {...obj,id,createAt:"2023-02-22T07:57:14.000Z",updateAt:"2023-02-22T07:57:14.000Z"}
    fs.readFile(path.resolve('./data/systemManagement/department/list.json'),'utf-8',(err,departmentData) => {
      if (err) throw err
      const turnedDepartment = JSON.parse(departmentData).data
  const res =     turnedDepartment.list.map((item) => {
        if (item.id == id) {
          for (const key in item) {
            item[key] = editDepartment[key]
          }

        }
        return item
      })
      const total = {
        code:0,
        data:{
          list:res,
          totalCount:res.length
        }
      }

      fs.writeFile(path.resolve('./data/systemManagement/department/list.json'),JSON.stringify(total),(err) => {
        if (err) throw err
      })


    })

    res.status(200).json({
      code:0,
      data:'修改部门成功'
    })

    
  })





  // 创建新用户
  app.post('/users', async (req,res) => {
    const userInfo= req.body
    let newUserList

    fs.readFile(path.resolve('./data/systemManagement/userManage/user.json'),'utf-8',(err,userData) => {
      if (err) throw err

      const turnedUserData = JSON.parse(userData).data
      const turnedNewInfo = {...userInfo,id:56,
        createAt:"2021-05-02T07:24:12.000Z",
        updateAt:"2021-08-20T04:07:23.000Z"
      
      
      }
   
     
       turnedUserData.list.unshift(turnedNewInfo)
    


      newUserList = {
        code:0,
        data:{
          list:turnedUserData.list,
          totalCount:turnedUserData.list.length 

        }
      }

      
      // 写入数据
      fs.writeFile(path.resolve('./data/systemManagement/userManage/user.json'),JSON.stringify(newUserList),(err)=>{
        if(err) throw err;
      })
    



    })

    res.status(200).json({
      code:0,
      data:'添加用户成功'
    })



  })

  // 修改用户数据

  app.patch('/users/:id',async (req,res) => {
    const {id} = req.params
    const userInfo = req.body
    const allUser = {...userInfo,enable:1,id,createAt:"2023-02-22T07:57:14.000Z",updateAt:"2023-02-22T07:57:14.000Z"}
   

    fs.readFile(path.resolve('./data/systemManagement/userManage/user.json'),'utf-8',(err,userData) => {
      if (err) throw err;
      const turnedUserData = JSON.parse(userData).data
   
  const res =   turnedUserData.list.map((item) => {
        
        if (item.id == id) {
          
          for (const key in item) {
         
            item[key] = allUser[key]
            
           

          }

        }

        return item
       
      })

    const total = {
      code:0,
      data:{
        list:res,
        totalCount:res.length
      }
    }

   fs.writeFile(path.resolve('./data/systemManagement/userManage/user.json'),JSON.stringify(total),(err) => {
     if (err) throw err

   })
    
    })

    
    res.status(200).json({
      code:0,
      data:'修改用户成功'
    })
  


  })

app.listen(3000,()=>{
  console.log('ok')
})





