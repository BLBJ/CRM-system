# CRM-system
利用express+vue 构建一个权限管理系统，根据用户身份实现不同权限管理。

### 系统介绍
用户通过注册登录进入网站系统，不同的身份对应不同的权限管理，管理员可以进行用户和权限管理，可根据不同用户身份改变UI内容，进行各自的身份操作.

+ 网站预览：
  + 登录
  ![LOGIN](https://github.com/BLBJ/CRM-system/blob/master/crm_image/login.png)
  + 注册
   ![注册](https://github.com/BLBJ/CRM-system/blob/master/crm_image/register.png)
  + 普通会员登录后页面
  ![注册](https://github.com/BLBJ/CRM-system/blob/master/crm_image/pg_member.png)
  + 管理员登录后页面
  ![管理员登录后页面](https://github.com/BLBJ/CRM-system/blob/master/crm_image/pg_user_admin.png)

### 系统运行介绍：
1. 目录结构介绍：
   + app: 系统后台端,基于express构建
   + web：前端js打包,基于vue构建
2. 下载npm包
    + 分别进入app和web目录下：运行 `npm install` 加载所需要的模块包。
3. 安装数据库
   + 本系统使用的是redis和PostgreSQL,需本地下载安装。
4. 运行
   + 进入app/bin文件夹下，命令行： `node www`即可运行网站
  
  
