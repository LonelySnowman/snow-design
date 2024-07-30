import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import React from 'react';
import Button from '../index'
import mountTest from "../../../../test/shared/mountTest";
import styleTest from "../../../../test/shared/styleTest";
import { cssClasses } from '@snow-design/foundation/button/constants';

describe('Button', () => {
    const prefix = cssClasses.PREFIX;
    mountTest(() => <Button>Test</Button>)
    styleTest(Button)

    it('renders correctly', () => {
        expect(render(<Button>按钮</Button>).container.firstChild).toMatchSnapshot();
    });

    it('have type class', () => {
        const { container } = render(<Button type="primary">Test</Button>);
        expect(container.firstChild).toHaveClass(`${prefix}-primary`)
    });
});
