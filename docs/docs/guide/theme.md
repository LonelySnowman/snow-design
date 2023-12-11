---
nav:
  title: 快速开始
  order: 0
group:
  title: 开始
  order: 0
order: 1
---

# 自定义主题

> 搭配 Vite 插件与 Webpack5 插件，支持全局 CSS 变量定义及组件及 SCSS 变量定义，助力您构建自己的专属主题。
>
> 目前仅支持按照规范自主编写主题，主题生成工具正在加紧开发中...

## 编写主题

### 克隆主题模板

- 需要`clone`主题模板并对其进行更改。

```bash
# 下载主题模板
git clone git@github.com:LonelySnowman/snow-design-theme-demo.git
```

### 更改主题变量

- 主题文件存放在`scss`文件夹下。
- 变量详情请查阅对应组件文档和全局样式变量。
- 可以更改以下文件：
  - _palette.scss：用于`CSS`色版变量的存放。
  - global.scss：用于全局`CSS`变量的存放。
  - local.scss：用于组件级`SCSS`变量存放。

### 发布主题

- 完成编写后需要更改`package.json`文件，将`name`改为自定义的主题名称并发布。

```bash
# 发布主题
npm run publish
```



## 使用主题

### Wbpack5

> 请确保`Webpack`版本 ≥ 5。

- 下载`@snow-design/webpack-plugin`。

```bash
npm install @snow-design/webpack-plugin -D
```

- 在`Webpack`插件配置中使用。

```js
import SnowDesign from "@snow-design/webpack-plugin";

// ...
{
    plugin: [
        new SnowDesign({
             // 自定义的主题 npm 包名称
  			    theme: "@snow-design/snow-theme-dark",
		    }),
    ]
}
// ...
```

### Vite

> 请确保`Vite`版本 ≥ 3。

- 下载`@snow-design/vite-plugin`。

```bash
npm install @snow-design/vite-plugin -D
```

- 在`vite`插件配置中使用。

```js
import SnowDesign from "@snow-design/webpack-plugin";

// ...
{
    plugins: [
        new SnowDesign({
             // 自定义的主题 npm 包名称
  			    theme: "@snow-design/snow-theme-dark",
		    }),
    ]
}
// ...
```

