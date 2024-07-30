export interface Locale {
  locale: string;
  Pagination: {
    pageSize: string;
    total: string;
    previous: string,
    next: string,
    jumpTo: string;
    page: string;
  }
}

export type LocaleComponentName = Exclude<keyof Locale, 'locale'>;
