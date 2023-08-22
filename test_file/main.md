* [](88889999 "首页")
* 开发指南
* 萌新必读

[芋道源码](88889999 "作者")  
[2023-03-05](88889999)  
目录

![](88889999)快速启动（适合"前端"工程师）
============================

目标：在 **本地** 将前端项目运行起来，使用 **远程** 演示环境的后端服务。

整个过程非常简单，预计 5 分钟就可以完成，取决于大家的网速。
> ↓↓↓ 技术交流群，一起苦练技术基本功，每日精进 30 公里！↓↓↓

![交流群](88889999)  
友情提示：

**远程** 演示环境的后端服务，只允许 `GET` 请求，不允许 `POST`、`PUT`、`DELETE` 等请求。

如果你要完整的后端服务，建议后续参考 [《快速启动（我是后端）》](88889999) 文档，将后端服务运行起来。

[#](88889999) 👍 相关视频教程 {#👍-相关视频教程}
------------------------------------

* [从零开始 02：在 Windows 环境下，如何运行前后端项目？ (opens new window)](88889999)
* [从零开始 03：在 MacOS 环境下，如何运行前后端项目？ (opens new window)](88889999)

[#](88889999) 1. Apifox 接口工具 {#_1-apifox-接口工具}
----------------------------------------------

点击 [Apifox (opens new window)](88889999) 首页，下载对应的 Apifox 桌面版。如下图所示：  
为什么要下载 Apifox 桌面版？

艿艿已经卸载 Postman，使用 Apifox 进行替代。国产软件，yyds 永远滴神！

国内很多互联网公司，包括百度、阿里、腾讯、字节跳动等等在内，都在使用 Apifox 作为 API 工具。

![Apifox 下载](88889999)

解压后，双击进行安装即可。黑色界面，非常酷炫。

![Apifox 界面](88889999)  
接口文档？

阅读 [《开发指南 ------ 接口文档》](88889999) 呀\~\~

[#](88889999) 2. 启动 Vue3 + element-plus 管理后台 {#_2-启动-vue3-element-plus-管理后台}
----------------------------------------------------------------------------

[`yudao-ui-admin-vue3` (opens new window)](88889999) 是前端 Vue3 管理后台项目。

① 克隆 [https://github.com/yudaocode/yudao-ui-admin-vue3.git (opens new window)](88889999) 项目，并 Star 关注下该项目。

② 在根目录执行如下命令，进行启动：

    # 安装 pnpm，提升依赖的安装速度
    npm config set registry https://registry.npmjs.org
    npm install -g pnpm
    # 安装依赖
    pnpm install
    
    # 启动服务
    npm run front

③ 启动完成后，浏览器会自动打开 [http://localhost:80 (opens new window)](88889999) 地址，可以看到前端界面。

![前端界面](88889999)  
友情提示：Vue3 使用 Vite 构建，所以它存在如下的情况，都是正常的：

1. 项目启动很快，浏览器打开需要等待 1 分钟左右，请保持耐心。
2. 点击菜单，感觉会有一点卡顿，因为 Vite 采用懒加载机制。不用担心，最终部署到生产环境，就不存在这个问题了。

详细说明，可见 [《为什么有人说 Vite 快，有人却说 Vite 慢？》 (opens new window)](88889999) 文章。

[#](88889999) 3. 启动 Vue3 + vben(ant-design-vue) 管理后台 {#_3-启动-vue3-vben-ant-design-vue-管理后台}
-------------------------------------------------------------------------------------------

[`yudao-ui-admin-vue3` (opens new window)](88889999) 是前端 Vue3 + vben(ant-design-vue) 管理后台项目。

① 克隆 [https://github.com/yudaocode/yudao-ui-admin-vben.git (opens new window)](88889999) 项目，并 Star 关注下该项目。

② 在根目录执行如下命令，进行启动：

    # 安装 pnpm，提升依赖的安装速度
    npm config set registry https://registry.npmjs.org
    npm install -g pnpm
    # 安装依赖
    pnpm install
    
    # 启动服务
    npm run front

③ 启动完成后，浏览器会自动打开 [http://localhost:80 (opens new window)](88889999) 地址，可以看到前端界面。

![前端界面](88889999)

[#](88889999) 4. 启动 Vue2 管理后台 {#_4-启动-vue2-管理后台}
------------------------------------------------

[`yudao-ui-admin` (opens new window)](88889999) 是前端 Vue2 管理后台项目。

〇 克隆 [https://github.com/YunaiV/ruoyi-vue-pro.git (opens new window)](88889999) 项目，并 Star 关注下该项目。

① 在 `yudao-ui-admin` 目录下，执行如下命令，进行启动：

    # 进入项目目录
    cd yudao-ui-admin
    
    # 安装 Yarn，提升依赖的安装速度
    npm install --global yarn
    # 安装依赖
    yarn install
    
    # 启动服务
    npm run front

![启动前端项目](88889999)

② 启动完成后，浏览器会自动打开 [http://localhost:1024 (opens new window)](88889999) 地址，可以看到前端界面。

![前端界面](88889999)

[#](88889999) 5. 启动 uni-app 管理后台 {#_5-启动-uni-app-管理后台}
------------------------------------------------------

[`yudao-ui-admin-uniapp` (opens new window)](88889999) 是前端 uni-app 管理后台项目。

〇 克隆 [https://github.com/YunaiV/ruoyi-vue-pro.git (opens new window)](88889999) 项目，并 Star 关注下该项目。

① 下载 [HBuilder (opens new window)](88889999) 工具，并进行安装。

② 点击 HBuilder 的 \[文件 -\> 导入 -\> 从本地项目导入...\] 菜单，选择项目的 `yudao-ui-admin-uniapp` 目录。

然后，修改 `config.js` 配置文件的 `baseUrl` 后端服务的地址为 `'http://api-dashboard.yudao.iocoder.cn`。如下图所示：

![修改 配置文件的 后端服务的地址](88889999)

③ 执行如下命令，安装 npm 依赖：

    # 进入项目目录
    cd yudao-ui-admin-uniapp
    
    # 安装 npm 依赖
    npm i

④ 点击 HBuilder 的 \[运行 -\> 运行到内置浏览器\] 菜单，使用 H5 的方式运行。成功后，界面如下图所示：

![前端界面](88889999)  
友情提示：登录时，滑块验证码，在内存浏览器可能存在兼容性的问题，此时使用 Chrome 浏览器，并使用"开发者工具"，设置为 iPhone 12 Pro 模式！

[#](88889999) 6. 启动 uni-app 用户前台 {#_6-启动-uni-app-用户前台}
------------------------------------------------------

[`yudao-ui-app` (opens new window)](88889999) 是前端 uni-app 用户前台项目。

〇 克隆 [https://github.com/YunaiV/ruoyi-vue-pro.git (opens new window)](88889999) 项目，并 Star 关注下该项目。

① 下载 [HBuilder (opens new window)](88889999) 工具，并进行安装。

② 点击 HBuilder 的 \[文件 -\> 导入 -\> 从本地项目导入...\] 菜单，选择项目的 `yudao-ui-app` 目录

然后，修改 `config.js` 配置文件的 `baseUrl` 后端服务的地址为 `'http://api-dashboard.yudao.iocoder.cn/app-api`。如下图所示：

![修改 配置文件的 后端服务的地址](88889999)

③ 点击 HBuilder 的 \[运行 -\> 运行到内置浏览器\] 菜单，使用 H5 的方式运行。成功后，界面如下图所示：

![前端界面](88889999)

[#](88889999) 7. 参与项目 {#_7-参与项目}
--------------------------------

如果你想参与到前端项目的开发，可以微信 wangwenbin-server 噢。

近期，重点开发 Vue3 管理后台、uniapp 商城，欢迎大家参与进来。  
上次更新: 2023/04/15, 00:03:57  
[快速启动（适合"后端"工程师）](88889999) [接口文档](88889999)  
← [快速启动（适合"后端"工程师）](88889999) [接口文档](88889999)→


Process finished with exit code 0
