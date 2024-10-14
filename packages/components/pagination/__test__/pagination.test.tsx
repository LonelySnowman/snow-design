import '@testing-library/jest-dom';
import React from 'react';
import Pagination from '../index';
import mountTest from '#test/react/mountTest';
import styleTest from '#test/react/styleTest';
import { cssClasses } from '@snow-design/foundation/pagination/constants';
import { render } from '@testing-library/react';

describe('Pagination', () => {
    const prefix = cssClasses.PREFIX;
    mountTest(() => <Pagination pageSize={10} total={20} />);
    styleTest(Pagination);

    it('renders correctly', () => {
        expect(
            render(<Pagination pageSize={10} total={20} />).container.firstChild,
        ).toMatchSnapshot();
    });

    it('having correct pagination', () => {
        const { container } = render(<Pagination pageSize={2} total={20} />);
        expect(container.getElementsByTagName('li').length).toEqual(9);
        expect(container.firstChild).toHaveClass(prefix);
    });
});
