# 暗色模式

内置暗色模式通过`CSS`变量实现。`CSS`选择器判断`body`标签`theme-mode`参数为`dark`或`light`（默认`light`）。
支持`snow-always-light`，`snow-always-dark`类名进行主题色切换。

## 全局切换

-   目前支持通过切换`body`标签属性进行更改。（暴露主题变更方法，待更新...）

```js
const body = document.body;
if (body.hasAttribute('theme-mode')) {
    body.removeAttribute('theme-mode');
} else {
    body.setAttribute('theme-mode', 'dark');
}
```

## 局部切换

-   更改`className`为`snow-always-dark`和`snow-always-light`实现。（实现`ConfigProvider`组件待更新...）

```js
import { Button } from '@snow-design/components';

const Home = () => {
    return (
        <div className="snow-always-dark">
            <Button>暗色模式</Button>
        </div>
    );
};
```
