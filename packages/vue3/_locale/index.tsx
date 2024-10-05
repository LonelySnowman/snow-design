import { defineComponent, provide, PropType, watch, App, reactive } from 'vue';
import { withInstall } from '../_utils';
import { Locale } from '@snow-design/locale/index';

export interface VueSnowLocale {
  snowLocale: Locale;
}

const LocaleProvider = defineComponent({
  name: 'SLocaleProvider',
  props: {
    locale: {
      type: Object as PropType<Locale>,
    }
  },
  setup(props, { slots }) {
    const state = reactive<VueSnowLocale>({
      snowLocale: {
        ...props.locale
      }
    });
    provide('localeData', state);
    watch(
      () => props.locale,
      locale => {
        state.snowLocale = { ...props.locale }
      },
      { immediate: true },
    );
    return () => {
      return slots.default?.();
    };
  },
});

LocaleProvider.install = function (app: App) {
  app.component(LocaleProvider.name, LocaleProvider);
  return app;
};

export default withInstall(LocaleProvider);
