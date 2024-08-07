import LocaleProvider from "@snow-design/vue3/_locale";
import { Locale } from "@snow-design/locale/index";
import { defineComponent, PropType } from "vue";
import { withInstall } from "@snow-design/vue3/_utils/type";

export interface ConfigProviderProps {
  locale?: Locale;
}

const ConfigProvider = defineComponent({
  name: 'SConfigProvider',
  props: {
    locale: {
      type: Object as PropType<Locale>,
    }
  },
  setup(props, {slots}) {
    const {
      locale,
    } = props;
    const children = slots.default?.();
    let childNode = (
      <>
        {children}
      </>
    );

    if (locale) {
      childNode = (
        <LocaleProvider locale={locale}>
          {childNode}
        </LocaleProvider>
      )
    }
    return () => childNode
  }
})


export default withInstall(ConfigProvider);
