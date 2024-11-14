import React from 'react';
import type { Locale } from '@snow-design/locale';

const LocaleContext = React.createContext<Locale | undefined>(undefined);

export default LocaleContext;
