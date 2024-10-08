import mountTest from "#test/vue/mountTest";
import styleTest from "#test/vue/styleTest";
import Pagination from '../index';
import { render } from "@testing-library/vue";

describe('Pagination', () => {
    mountTest(<Pagination />);
    styleTest(<Pagination />);

    it('renders correctly', () => {
        expect(render(<Pagination />).container.firstChild).toMatchSnapshot();
    });
});
