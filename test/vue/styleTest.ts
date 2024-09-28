import { VueElement } from 'vue';
import { render } from '@testing-library/vue';
import '@testing-library/jest-dom'

export default function styleTest(Component: VueElement) {
    describe(`style and className`, () => {
        it(`component could have style and className`, () => {
            const props = {
                className: 'class-test',
                style: { color: 'red' }
            };
            const { container } = render(Component);
            expect(container.firstChild).toHaveClass('class-test');
            expect(container.firstChild).toHaveStyle('color: red');
        });
    });
}
