import { createContext } from 'react';
import type { Locale } from '@snow-design/locale/index';

const LocaleContext = createContext<Locale | undefined>(undefined);

export default LocaleContext;
