# 介绍

-   助力您快速搭建`React`组件库。
-   包含从零到一构建组件库教程（更新中...），帮助您更好理解`React`组件库搭建原理。
-   项目架构学习[semi-design](https://github.com/DouyinFE/semi-design)与[ant-design](https://github.com/ant-design/ant-design)搭建，使用主流组件库搭建方式。

## 📦能力

-   内置黑暗主题（Dark Mode）。
-   自定义分包构建，支持组件按需引入。
-   编写js脚本快速生成组件模板。
-   包含`Webpack`与`Vite`插件支持自定义组件样式主题，可进行全局`CSS`变量覆盖及组件级`SCSS`变量覆盖。
-   支持单元测试与端到端测试（端到端测试待支持...）。

## 🚀CSS架构

项目将主题包和组件样式包分离。

主题包包含以下文件：

-   global.scss
    -   全局`CSS`变量定义
-   index.scss
    -   全局`SCSS`入口文件
-   variables.scss
    -   用于全局`SCSS`变量定义
-   \_palette.scss
    -   用于基础色版定义

组件包包含以下文件：

-   xxx.scss
    -   组件样式编写
-   variables.scss
    -   组件级`SCSS`变量定义

`CSS`变量及`SCSS`变量在编译时动态插入，实现主题更改。
编译后会将`SCSS`文件保留，`Vite`与`Webpack`插件将原本读取的`CSS`文件转化为读取`SCSS`文件并使用`sass`或`WebpackLoader`
进行编译，实现主题包加载。
