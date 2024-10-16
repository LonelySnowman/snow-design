import LocaleProvider from '../_locale';
import { Locale } from '@snow-design/locale/index';
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { withInstall } from '../_utils';

export const configProviderProps = () => ({
    locale: Object as PropType<Locale>,
});

const ConfigProvider = defineComponent({
    name: 'SConfigProvider',
    props: configProviderProps(),
    setup(props, { slots }) {
        const { locale } = props;
        const children = slots.default?.();
        let childNode = <>{children}</>;

        if (locale) {
            childNode = <LocaleProvider locale={locale}>{childNode}</LocaleProvider>;
        }
        return () => childNode;
    },
});

export default withInstall(ConfigProvider);
