import { BASE_CLASS_PREFIX } from '../_base/constants';

const cssClasses = {
    PREFIX: `${BASE_CLASS_PREFIX}-pagination`
};

const strings = {};

const numbers = {
    PAGE_SHOW_MAX: 7,
    REST_PAGE_SHOW_MAX: 5,
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTION: [10, 20, 40, 100],
    REST_PAGE_MAX_SIZE: 1000000,
}

export { cssClasses, strings, numbers };
