import React from 'react';
import LocaleProvider from '../_locale';
import { Locale } from '@snow-design/locale/index';

export interface ConfigProviderProps {
    locale?: Locale;
    children: React.ReactNode;
}

const ConfigProvider: React.FC<ConfigProviderProps> = (props) => {
    const { locale, children } = props;

    let childNode = <>{children}</>;

    if (locale) {
        childNode = <LocaleProvider locale={locale}>{childNode}</LocaleProvider>;
    }

    return childNode;
};

export default ConfigProvider;
