import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import React from 'react';
import Button from '../index'
import { cssClasses } from '@snow-design/foundation/button/constants';

describe('Button', () => {
    const prefix = cssClasses.PREFIX;
    it('Button rendered', () => {
        const { container } = render(<Button style={{ color: 'red' }}>Test</Button>);
        expect(container.querySelector<HTMLDivElement>(`.${prefix}`)?.style.color).toBe('red');
    });
    it('Type have class', () => {
        const { container } = render(<Button type="primary">Test</Button>);
        expect(container.firstChild).toHaveClass(`${prefix}-primary`)
    });
});
