import Pagination from '../index';
import { defineComponent, ref } from 'vue';
import Button from '@snow-design/vue3/button';

const meta = {
    title: 'Pagination',
    component: Pagination,
};

export default meta;

export const Template = () =>
    defineComponent({
        components: { Pagination, Button },
        compatConfig: { MODE: 3 },
        setup() {
            const currentPage = ref(1);
            const subPageNum = () => {
                if (currentPage.value > 1) currentPage.value--;
            };
            const addPageNum = () => {
                if (currentPage.value < 10) currentPage.value++;
            };
            return {
                addPageNum,
                subPageNum,
                currentPage,
            };
        },
        template: `
    <h3>受控组件</h3>
    <Pagination
        v-model:currentPage="currentPage"
        showTotal
        :total="20"
        :pageSize="2"
    />
    <h4>自定义受控按钮</h4>
    <Button style="margin-right: 4px;" @click="subPageNum">上一页</Button>
    <Button @click="addPageNum">下一页</Button>
    <h3>非受控组件</h3>
    <Pagination
        showTotal
        :total="20"
        :pageSize="2"
    />
  `,
    });
