import { inject, computed } from 'vue';
import type { Locale, LocaleComponentName } from '@snow-design/locale/index';
import defaultLocaleData from '@snow-design/locale/en_US';
import { VueSnowLocale } from "./index";

const useLocale = <C extends LocaleComponentName = LocaleComponentName>(
  componentName: C,
  defaultLocale?: Locale[C] | (() => Locale[C]),
): readonly [NonNullable<Locale[C]>, string] => {
  const localeData = inject<VueSnowLocale>('localeData', {} as VueSnowLocale);

  const getLocale = computed(() => {
    const locale = defaultLocale || defaultLocaleData[componentName];
    const localeFromContext = localeData.snowLocale?.[componentName] ?? {};
    return {
      ...(typeof locale === 'function' ? locale() : locale),
      ...(localeFromContext || {}),
    };
  });

  const getLocaleCode = computed(() => {
    const localeCode = localeData.snowLocale?.locale;
    return localeCode || defaultLocaleData.locale;;
  })

  return [getLocale.value, getLocaleCode.value];
};

export default useLocale;
