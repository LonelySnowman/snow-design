export interface Locale {
    locale: string;
    Pagination: {
        pageSize: string;
        total: string;
        previous: string;
        next: string;
        jumpTo: string;
        page: string;
    };
}

export type LocaleComponentName = Exclude<keyof Locale, 'locale'>;

export { default as zh_CN } from './zh_CN';

export { default as en_US } from './en_US';
