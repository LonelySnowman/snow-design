import mountTest from "#test/vue/mountTest";
import styleTest from "#test/vue/styleTest";
import Pagination from '../index';
import { cssClasses } from '@snow-design/foundation/button/constants';

describe('Button', () => {
    const prefix = cssClasses.PREFIX;
    mountTest(Pagination)
    styleTest(Pagination)
});
