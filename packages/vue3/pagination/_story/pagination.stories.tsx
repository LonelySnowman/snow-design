import Pagination from '../index';
import { defineComponent } from "vue";
import ConfigProvider from "@snow-design/vue3/config-provider";
import zh_CN from "@snow-design/locale/zh_CN";

const meta = {
  title: 'Example/Pagination',
  component: Pagination,
}

export default meta;

export const Template = () => defineComponent({
  components: { Pagination, ConfigProvider },
  compatConfig: { MODE: 3 },
  setup() {
    const onChange = (a, b) => {
      console.log(a, b)
    }
    return () => <>
      <ConfigProvider locale={zh_CN}>
        <Pagination
          showTotal
          total={20}
          pageSize={2}
          onChange={onChange}
        />
      </ConfigProvider>
      <Pagination
        showTotal
        total={20}
        pageSize={2}
        onChange={onChange}
      />
    </>
  }
});
