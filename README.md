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
    2.1 创建角色接口(已完成)
        获取角色列表
        查询角色(已完成)
        更新角色(已完成)
        授权角色用户

        授权权限接口   
        根据用户获取权限菜单
          规定:
            一级权限-只能拥有菜单
            二级权限-只能拥有二级菜单
            三级权限-拥有页面\按钮权限\接口权限

    2.2 创建权限接口(已完成)



todo....
  服务端
    实现用户-店铺-角色-权限 *

  后台项目搭建 vue3/react   
    初始化      
     

学习记录
  数据库中列类型int和tinyint的区别
    tinyint：用于存储小整数值，例如布尔值（true/false）或枚举值。
    int：用于存储较大的整数值，例如计数、日期等。
