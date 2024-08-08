# SnowDesign

## 📕文档

- 官方文档：[查看文档](https://snow-design.snowhouse.space/)

## 📖介绍

- 助力您快速搭建属于自己的`Web`组件库。
- 包含从零到一构建组件库教程，帮助您更好理解组件库搭建原理。
- 项目架构学习[semi-design](https://github.com/DouyinFE/semi-design)与[ant-design](https://github.com/ant-design/ant-design)搭建，使用主流组件库搭建方式。

## 📦能力

- F/A 架构 `vue3` 与 `react` 实践: [UI组件库如何分层设计，使其具备适配多种mvvm框架能力](https://bytedance.larkoffice.com/wiki/wikcnOVYexosCS1Rmvb5qCsWT1f)。
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
