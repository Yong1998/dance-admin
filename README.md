项目基础搭建

```js
1. 异常拦截和统一响应数据
  error.filter.ts
  transform.interceptor.ts
    响应数据
      {
        "code": "请求状态", // 200 正常 其他异常
        "success": false,
        "message": "信息",
        "data": null,
        "timestamp": null
      }
2. ValidationPipe - dto管道校验 验证传入数据
  安装 npm install class-validator class-transformer -d

3. jwt鉴权
  安装 npm install --save passport-jwt @nestjs/jwt @nestjs/passport
  
  使用守卫Guard - authGuard

  自定义public装饰器, 允许白名单接口访问 isPublic
```

待完成功能
User 用户表
  account
  passwordHash
  username
  email
1. 用户注册/登录/权限
   1.1 注册接口 create
    account password username email 

   1.2 登录 login jwt鉴权
    account password

   1.3 重置密码 resetPassword
    id oldPassword newPassword
