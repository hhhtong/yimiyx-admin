# yimiyx-admin

# 前端 Vue 开发规范

- 变量名全部为小驼峰式
- 1个下划线表示计算属性(computed)
- 2个下划线表示私有方法(methods)
- `handle` 开头命名的为事件绑定

<p align="center">
    <a href="https://www.iviewui.com">
        <img width="200" src="https://file.iviewui.com/logo-new.svg">
    </a>
</p>

## 当前版本：v2.0-beta.1

## Install
```bush
yarn
```

## Development
```bush
yarn dev
```
## Production(Build)
```bush
yarn build
```

## 简介
&emsp;&emsp;yimiyx-admin是基于Vue.js、iView搭建的一套生鲜配送后台管理系统，由[壹米优鲜](https://github.com/hhhtong)前端可视化团队部分成员开发维护。

## 功能

- 登录/登出
- 权限管理
    - 列表过滤
    - 权限切换
- 优惠券管理
- 采购管理
    - 供货商管理
    - 询价明细
    - 采购管理
- 商品管理
    - 商品列表
    - 商品分类
- 错误页面
    - 403页面
    - 404页面
    - 500页面
- 高级路由
    - 动态路由
    - 带参页面
- 换肤
- 收缩侧边栏
- tag标签导航
- 面包屑导航
- 全屏/退出全屏
- 锁屏
- 消息中心
- 个人中心

## 文件结构
```shell
.
├── build  项目构建配置
├── config  开发相关配置
├── public  打包所需静态资源
└── src
    ├── api  接口信息
    └── assets  项目静态资源
        ├── icons  自定义图标资源
        └── images  图片资源
    ├── components  业务组件
    ├── config  项目运行配置
    ├── directive  自定义指令
    ├── libs  封装工具函数
    ├── locale  多语言文件
    ├── mock  mock模拟数据
    ├── plugin  Vue插件
    ├── router  路由配置
    ├── store  Vuex配置
    ├── styles  样式文件
    ├── view  页面文件
    └── tests  测试相关
```

## Links

- [yimiyx-server](https://github.com/hhhtong/yimiyx-server)
- [yimiyx-miniprogram](https://github.com/hhhtong/yimiyx-miniprogram)

## License
[EPL-2.0](LICENSE)

Copyright (c) 2018-present, 浩海鸿通
