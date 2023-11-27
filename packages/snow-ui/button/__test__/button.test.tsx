import { render } from '@testing-library/react';
import React from 'react';
import Button from '../index'
import { cssClasses } from '@snow-design/snow-foundation/button/constants';

describe('Empty', () => {
    it('image size should change', () => {
        const { container } = render(<Button style={{ color: 'red' }}>Test</Button>);
        expect(container.querySelector<HTMLDivElement>(`.${cssClasses.PREFIX}`)?.style.color).toBe('red');
    });
});