// 数据库连接的相关操作
const mysql = require('mysql2')
const config = require('../config/index')

// 创建线程池 mysql  才能连上mysql
// pool就可以代表MySQL
const pool = mysql.createPool({
    host:config.database.HOST,
    user:config.database.USERNAME,
    password:config.database.PASSWORD,
    database:config.database.DATABASE,
    port:config.database.PORT
})
// 连接MySQL  异步操作（网络不好）
//allServers的query调用就会连接数据库
const allServers = {
  query:function(sql,values){
     //pool 连接
     return new Promise((resolve,reject)=>{  
        pool.getConnection((err,connection)=>{    // getConnection 自带连接方法，连接数据库
           if(err){    //连接MySQL失败
            reject(err)
           }else{
            //  connection.query成功连上mysql后执行sql语句 query()sql自带方法
            // 写入sql就会执行，values往数据库植入什么值，若读值可以不传
            // rows是执行成功后的结果
             connection.query(sql,values,(err,rows)=>{
              if(err){     //执行sql语句出错
                reject(err)       //连接失败err有至，连接成功connection有值
              }else{
                // 成功后执行业务逻辑，但应单独出去执行，此处不执行
                resolve(rows)  //resolve出来的值(row)会在这个函数.then()回调函数的形参上
              }                                   //此处的函数为最上面的query
                connection.release() // 释放mysql连接 (用完了)                   
             })  //与上面query不同，上面是自己定义
           }
        }) 
     })
  }
}


 //若返回了数据 allServers.query(_sql)执行结果将返回到 userLogin
//allServers.query(_sql)的执行结果是一个promise实例对象 第19行
// promise往外层函数在return一次 即userlogin后面就可以接.then()
//.then的参数就是第32行的resolve(rows)的rows值
// 登录的功能 
const userLogin = (phone,password)=>{
let _sql = `select * from user where phone="${phone}" and password="${password}";` 
 return allServers.query(_sql)
}

//查询数据库是否有数据
const  userFind = (phone)=>{
  let _sql = `select * from user where username="${phone}";`
  return allServers.query(_sql)
}
//注册功能   values = [username,password,nickname,phone]  写成数组
const userRegister = (values)=>{   //会匹配到values中的值
let _sql = `insert into user set username=?, password=?, nickname=?,phone=?;`
  return allServers.query(_sql,values)
}

//首页轮播图获取
const homePageBanner = ()=>{
  let _sql = `select * from bannerlist`
  return allServers.query(_sql)
}
//今天吃饭推荐
const todayEat = ()=>{
  let _sql = `select * from todayeat`
  return allServers.query(_sql)
}

// 热门推荐
const hot = ()=>{
  let _sql = `select * from hot`
  return allServers.query(_sql)
}


module.exports = {
  userLogin,
  userFind,
  userRegister,
  homePageBanner,
  todayEat,
  hot,
  
}