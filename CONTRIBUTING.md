# 贡献指南

如果你想为 SnowDesign 贡献一份力量，请花几分钟的时间阅读本指南，帮助您正确的提出 ISSUE 与 PULL_REQUEST。

## 提出 ISSUE

前往[New Issue · LonelySnowman/snow-design](https://github.com/LonelySnowman/snow-design/issues/new/choose)发起一个新的 ISSUE，在这里上报项目中存在的问题或者提出一些能让项目变得更好的新想法。

## 提出 PULL_REQUEST

如果您已经了解本项目并希望参与项目开发，请 fork 本项目，并且在 ISSUE 列表中找到一些您感兴趣的问题。如果您找到了可解决的 ISSUE 请在该 ISSUE 下留言表示您正在解决这个问题，并附带预计的开发时间。如果您未能在预计时间内解决该 ISSUE 请重新评论表示您仍愿意继续解决它并预留开发时间，否则该问题可由其他人解决。避免重复劳作，可以在 ISSUE 下友好讨论。😀

在您 fork 的项目仓库中基于 `master` 分支切出一个新的分支进行开发，在解决问题后发起 PR，新增特性请合并至 `feature` 分支，文档变更或 BUG 修复请合并至 `master` 分支。团队成员会在空闲时间 review 您的代码，请友好讨论直到您的代码符合项目要求。

我们会定期将 `feature` 分支合并至 `master` 并在适当的时间发布新版本。

## 开发指南

为了避免一些奇怪的奇怪的问题，建议您使用以下环境版本：

-   node ≥ 20
-   npm ≥ 10
-   pnpm ≥ 9

### 基本命令

使用以下命令启动项目：

```bash
pnpm install # 安装依赖

pnpm run start:react # 启动 react 版 stroybook

pnpm run start:vue3 # 启动 vue3 版 storybook

pnpm run start:docs # 启动文档站点
```

在代码变更后请运行以下指令确保项目正常：

```bash
pnpm run test:unit # 运行单元测试

pnpm run build:lib # 构建项目产物
```

Tip：单元测试中的快照如有变更需要在本地更新后提交至远程仓库。

### 项目架结构

采用 pnpm workspace 实现 monorepo 进行多仓库管理：

-   docs: 静态文档站，采用 rspress 搭建。
-   packages/components: React 组件库核心代码。
-   packages/components: Vue3 组件库核心代码。
-   packages/foundation: 与框架无关的组件逻辑层和通用层代码。
-   packages/locale: 组件库国际化语言包。
-   packages/theme-default: 组件库默认主题包。
-   packages/tools: 脚本工具集合，用于组件库的编译构建。
-   packages/vite-plugin: 自定义主题 Vite 插件。
-   packages/webpack-plugin: 自定义主题 Webpack 插件。
