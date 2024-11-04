# SnowDesign

## 📕文档

-   官方文档：[查看文档](https://snow-design.snowhouse.space/)

## 📖介绍

-   SnowDesign 目前是一个教学性质的项目，助力您快速搭建`Web`组件库。
-   ~~从零到一的搭建文章~~（努力更新中...）
-   参考学习以下项目：
    -   [semi-design](https://github.com/DouyinFE/semi-design)
    -   [ant-design](https://github.com/ant-design/ant-design)
    -   [ant-design-vue](https://github.com/vueComponent/ant-design-vue)

## 📦能力

-   一套逻辑代码支持`Vue`与`React`框架，F/A 架构实践：[UI组件库如何分层设计，使其具备适配多种Web框架能力](https://bytedance.larkoffice.com/wiki/wikcnOVYexosCS1Rmvb5qCsWT1f)。
-   支持 ES6 导出，无缝 TreeShaking。
-   包含`Webpack`与`Vite`插件支持自定义组件样式主题，可进行全局`CSS`变量覆盖及组件级`SCSS`变量覆盖。
-   完善的单元测试与~~端到端测试~~。
-   支持国际化与~~无障碍访问~~。
-   ~~内置黑暗主题~~
-   努力更新中...

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

## 💻项目结构

采用 pnpm workspace 实现 monorepo 进行多仓库管理。

-   docs: 静态文档站，采用 rspress 搭建。
-   packages/components: React 组件库核心代码。
-   packages/components: Vue3 组件库核心代码。
-   packages/foundation: 与框架无关的组件逻辑层和通用层代码。
-   packages/locale: 组件库国际化语言包。
-   packages/theme-default: 组件库默认主题包。
-   packages/tools: 脚本工具集合，用于组件库的编译构建。
-   packages/vite-plugin: 自定义主题 Vite 插件。
-   packages/webpack-plugin: 自定义主题 Webpack 插件。
