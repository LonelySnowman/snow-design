import mountTest from "#test/vue/mountTest";
import styleTest from "#test/vue/styleTest";
import Pagination from '../index';
import { render } from "@testing-library/vue";
import { cssClasses } from '@snow-design/foundation/pagination/constants';
import '@testing-library/jest-dom'

describe('Pagination', () => {
    const prefix = cssClasses.PREFIX;
    mountTest(<Pagination pageSize={10} total={20} />);
    styleTest(Pagination);

    it('renders correctly', () => {
        const { container } = render(<Pagination pageSize={10} total={20} />)
        expect(container.firstChild).toMatchSnapshot();
    })

    it('having correct pagination', () => {
        const { container } = render(<Pagination pageSize={2} total={20} />)
        expect(container.getElementsByTagName('li').length).toEqual(9)
        expect(container.firstChild).toHaveClass(prefix);
    })
});
