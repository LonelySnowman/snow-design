import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import React from 'react';
import Button from '../index'
import mountTest from "#test/react/mountTest";
import styleTest from "#test/react/styleTest";
import { cssClasses } from '@snow-design/foundation/button/constants';

describe('Button', () => {
    const prefix = cssClasses.PREFIX;
    mountTest(() => <Button>SnowDesign</Button>);
    styleTest(Button);

    it('renders correctly', () => {
        expect(render(<Button>SnowDesign</Button>).container.firstChild).toMatchSnapshot();
    });

    it('have type class', () => {
        const { container } = render(<Button type="primary">Test</Button>);
        expect(container.firstChild).toHaveClass(`${prefix}-primary`)
    });
});
