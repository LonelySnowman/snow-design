---
nav:
  title: 快速开始
  order: 0
group:
  title: 开始
  order: 0
order: 0
---

# 快速开始

> 目前组件支持较少，主要为架构上的实现，更多代码火速更新中...

## 安装 SnowDesign

```bash
# 使用 npm
npm install @semi-design/components

# 使用 yarn
yarn add @semi-design/components

# 使用 pnpm
pnpm add @semi-design/components
```

## 使用组件


### ES6 模块引入

- 组件分包构建，支持按需导入，自动 TreeShaking。

```js
import { Button } from "@snow-design/components"

export default () => {
    return (<Button>你好</Button>)
}
```

### UMD 引入

- 可以通过 `script` 标签直接引入文件，并使用全局变量 SnowUI。
- @x.x.x，为版本号，可根据需要进行调整。

| 资源名称                         | 资源路径                                                     |
| -------------------------------- | ------------------------------------------------------------ |
| @snow-design/components (min)    | https://unpkg.com/@snow-design/components@0.0.22/dist/umd/components.js |
| @snow-design/components (normal) | https://unpkg.com/@snow-design/components@0.0.22/dist/umd/components.min.js |
| snow.css                         | https://unpkg.com/@snow-design/components@0.0.22/dist/css/snow.css |

```html
<html>
    <head>
        <!-- 确保引入了 ReactDOM 及需要的依赖 -->
        <!-- 引入全局变量 SnowUI -->
        <script src="https://unpkg.com/@snow-design/components@0.0.22/dist/umd/components.js"></script>
		<!-- 引入全局样式 -->
        <link rel="stylesheet" href="https://unpkg.com/@snow-design/components@0.0.22/dist/css/snow.css">
    </head>
    <body>
        <div id="root"></div>
    </body>
    <script type="text/babel">
        const { Button } = SnowUI;
        ReactDOM.render(
            <Button type="warning">你好</Button>,
            document.getElementById('root')
        );
    </script>
</html>
```
