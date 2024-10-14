import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

export default function styleTest(Component: React.ComponentType) {
    describe(`style and className`, () => {
        it(`component could have style and className`, () => {
            const props = {
                className: 'class-test',
                style: { color: 'red' },
            };
            const { container } = render(<Component {...props} />);
            expect(container.firstChild).toHaveClass('class-test');
            expect(container.firstChild).toHaveStyle('color: red');
        });
    });
}
