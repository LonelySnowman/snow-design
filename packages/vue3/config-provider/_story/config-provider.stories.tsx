import { defineComponent } from 'vue';
import ConfigProvider from '../index';
import Pagination from '@snow-design/vue3/pagination';
import { zh_CN } from '@snow-design/locale';

const meta = {
    title: 'Example/ConfigProvider',
    component: ConfigProvider,
};

export default meta;

export const ProvideLanguage = () =>
    defineComponent({
        components: { Pagination, ConfigProvider },
        compatConfig: { MODE: 3 },
        setup() {
            return {
                zh_CN,
            };
        },
        template: `
      <h3>使用 ConfigProvider 提供不同的语言包</h3>
      <ConfigProvider :locale="zh_CN">
        <Pagination
            showTotal
            :total="20"
            :pageSize="2"
        />
      </ConfigProvider>
      <Pagination
          showTotal
          :total="20"
          :pageSize="2"
      />
    `,
    });
