# SnowDesign

## 📕文档

-   官方文档：[查看文档](https://snow-design.snowhouse.space/)
-   贡献指南：[查看指南](https://snow-design.snowhouse.space/guide/contribution.html)

## 📖介绍

-   SnowDesign 的目标是搭建一个通用的物料库，可以找到任何你需要的组件，助力您快速搭建`Web`组件库。
-   ~~从零到一的搭建文章~~（努力更新中...）
-   受到以下项目启发：
    -   [semi-design](https://github.com/DouyinFE/semi-design)
    -   [ant-design](https://github.com/ant-design/ant-design)
    -   [ant-design-vue](https://github.com/vueComponent/ant-design-vue)

## 📦能力

-   使用 Foundation/Adapter 分层架构，一套逻辑代码支持`Vue`与`React`框架。[UI组件库如何分层设计，使其具备适配多种Web框架能力](https://bytedance.larkoffice.com/wiki/wikcnOVYexosCS1Rmvb5qCsWT1f)。
-   基于 `glup`、`babel`与`webpack`输出 `ES6`、`CJS`和`UMD` 导出，支持无缝 TreeShaking。
-   包含`Webpack`与`Vite`插件支持自定义组件样式主题，可进行全局`CSS`变量覆盖及组件级`SCSS`变量覆盖。
-   搭配单元测试和~~端到端测试~~以及 Github CI/CD 流程，确保组件的稳定性和质量。
-   ~~内置暗夜模式~~、搭配国际化语言与~~友好的无障碍支持~~。
-   实现虚拟列表、图片懒加载、瀑布流等多框架通用组件。

## 🚀快速开始

-   `node` 版本 ≥ 18

```bash
# React 版
npm install @snow-design/components
# Vue3 版
npm install @snow-design/vue3
```

```tsx
import React from 'react';
import { Button } from '@snow-design/components';

const Demo = () => {
    return <Button type="primary">按钮</Button>;
};
```

```vue
<template>
    <Button type="primary">按钮</Button>
</template>

<script setup lang="ts">
import { Button } from '@snow-design/vue3';
</script>
```

## ⚙启动项目

```bash
pnpm install
pnpm run build:lib

# 启动 react 组件本地调试
pnpm run start:react
# 启动 vue3 组件本地调试
pnpm run start:vue3
# 启动项目文档
pnpm run start:docs
```
