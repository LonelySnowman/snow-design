import React from 'react';
import LocaleContext from './context';
import type { Locale, LocaleComponentName } from '@snow-design/locale';
import { en_US as defaultLocaleData } from '@snow-design/locale';

const useLocale = <C extends LocaleComponentName = LocaleComponentName>(
    componentName: C,
    defaultLocale?: Locale[C] | (() => Locale[C]),
): readonly [NonNullable<Locale[C]>, string] => {
    const fullLocale = React.useContext<Locale | undefined>(LocaleContext);

    // 返回值为 Locale 对象
    const getLocale = React.useMemo<NonNullable<Locale[C]>>(() => {
        const locale = defaultLocale || defaultLocaleData[componentName]; // 默认兜底
        const localeFromContext = fullLocale?.[componentName] ?? {}; // 从 Context 获取
        return {
            ...(typeof locale === 'function' ? locale() : locale),
            ...(localeFromContext || {}),
        };
    }, [componentName, defaultLocale, fullLocale]);

    // 返回值为 Locale Code zh_CN en_US 等
    const getLocaleCode = React.useMemo<string>(() => {
        const localeCode = fullLocale?.locale;
        return localeCode || defaultLocaleData.locale;
    }, [fullLocale]);

    return [getLocale, getLocaleCode] as const;
};

export default useLocale;
