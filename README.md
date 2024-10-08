# SnowDesign

## 📕文档

- 官方文档：[查看文档](https://snow-design.snowhouse.space/)

## 📖介绍

- 助力您快速搭建属于自己的`Web`组件库。
- 包含从零到一构建组件库教程，帮助您更好理解组件库搭建原理。
- 项目架构学习[semi-design](https://github.com/DouyinFE/semi-design)与[ant-design](https://github.com/ant-design/ant-design)搭建，使用主流组件库搭建方式。

## 📦能力

- F/A 架构 `vue3` 与 `react` 实践: [UI组件库如何分层设计，使其具备适配多种Web框架能力](https://bytedance.larkoffice.com/wiki/wikcnOVYexosCS1Rmvb5qCsWT1f)。
- 内置黑暗主题（Dark Mode）。
- 自定义预构建，分包构建，支持组件按需引入。
- 编写 `JS` 脚本快速生成组件模板。
- 包含 `Webpack` 与 `Vite` 插件支持自定义组件样式主题与 `CSS Prefix`，可进行全局`CSS`变量覆盖及组件级`SCSS`变量覆盖。
- 支持单元测试与端到端测试（端到端测试待支持...）。

## 🚀快速开始

- 推荐使用 pnpm 进行依赖管理
- `node` 版本 ≥ 18

```bash
# 安装依赖
pnpm install @snow-design/components
```

```jsx
import React from "react";
import { Button } from "@snow-design/components";

const Demon = () => {
    return (<div>
	    <Button type="primary">按钮</Button>
    </div>)
}
```

## 💻项目结构

采用 pnpm workspace 实现 monorepo 进行多仓库管理。

- docs: 静态文档站，采用 dumi 搭建。
- packages/components: React 组件库核心代码。
- packages/components: Vue3 组件库核心代码。
- packages/foundation: 与框架无关的组件逻辑层和通用层代码。
- packages/locale: 组件库国际化语言包。
- packages/theme-default: 组件库默认主题包。
- packages/tools: 脚本工具集合，用于组件库的编译构建。
- packages/vite-plugin: 自定义主题 Vite 插件。
- packages/webpack-plugin: 自定义主题 Webpack 插件。
