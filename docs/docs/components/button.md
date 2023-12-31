---
nav:
  title: 组件
  order: 1
group:
  title: 基础
  order: 1
---

# Button 按钮

用于用户点击操作交互。

## 按钮类型

Button 支持使用 `type` 改变按钮基础风格。

```tsx
import { Button } from "@snow-design/components"

export default () => {
    return (
        <div className="snow-flex">
          <Button>你好</Button>
          <Button type="primary">你好</Button>
          <Button type="warning">你好</Button>
          <Button type="danger">你好</Button>
        </div>
    )
}
```

## API 参数

### Button

| 属性         | 说明                                            | 类型                 | 默认值       |
| ------------ |-----------------------------------------------| -------------------- |-----------|
| alt          | 图像的替代文本描述                                     | string               | -         |
| className    | 类名                                            | string               | -         |
| style        | 样式名                                           | CSSProperties        | -         |
| type         | 类型，可选值：`default`、`primary`、`warning`、`danger` | string               | "default" |
| onClick      | 单击事件                                          | function(MouseEvent) | -         |
| onMouseDown  | 鼠标按下事件                                        | function(MouseEvent) | -         |
| onMouseEnter | 鼠标移入事件                                        | function(MouseEvent) | -         |
| onMouseLeave | 鼠标移出事件                                        | function(MouseEvent) | -         |
