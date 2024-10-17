# Pagination 分页器

进行基础分页操作。

## 基础使用

Pagination 支持使用 `total`、`pagSize` 设置总页数与每页的大小。

```tsx
import { Pagination } from '@snow-design/components';

export default () => {
    return (
        <div className="snow-flex">
            <Pagination
                showTotal
                total={20}
                pageSize={2}
                onChange={(a, b) => {
                    console.log(a, b);
                }}
            />
        </div>
    );
};
```

## API 参数

### Pagination

| 属性      | 说明                 | 类型     | 默认值 |
| --------- | -------------------- | -------- | ------ |
| showTotal | 是否展示总页数       | boolean  | false  |
| onChange  | 页码变更时产生的回调 | Function | -      |
| total     | 总页数               | number   | -      |
| pageSize  | 每一页的大小         | number   | -      |
