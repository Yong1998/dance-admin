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

  自定义public装饰器, 允许白名单接口如创建用户接口, 登录接口访问 isPublic

4. swagger 接入   
```

待完成功能
User 用户表
account
passwordHash
usernam
email
Role 角色表
Permission 权限表

1.用户
  1.1 注册接口 auth/register (已完成)
  1.2 登录接口 auth/login (已完成)
  1.3 接入jwt-token校验 (已完成)
  1.4 创建用户 (已完成)
  1.5 获取列表 (已完成)
  1.6 获取用户 (已完成)
  1.7 删除用户 (已完成)
  1.8 修改密码 (已完成)
  1.9 添加用户 (已完成)
  1.10 更新用户 (已完成)

2. 角色/权限管理 
    2.1 创建角色接口
        获取角色列表
        查询角色
        更新角色
        授权角色用户



        授权权限接口
          获取权限菜单
    2.2 创建权限接口  
          
     


