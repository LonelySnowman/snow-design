import React from 'react';
import LocaleContext from './context';
import { Locale } from "@snow-design/locale/index";
export { default as useLocale } from './useLocale';

export interface LocaleProviderProps {
  locale: Locale;
  children?: React.ReactNode;
}

const LocaleProvider: React.FC<LocaleProviderProps> = (props) => {
  const { locale = {} as Locale, children } = props;
  const getMemoizedContextValue = React.useMemo<Locale>(
    () => ({ ...locale }),
    [locale],
  );
  return (
    <LocaleContext.Provider value={getMemoizedContextValue}>{children}</LocaleContext.Provider>
  );
};

export default LocaleProvider;
