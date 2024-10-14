import { render } from '@testing-library/vue';
import '@testing-library/jest-dom';

export default function styleTest(Component) {
    describe(`style and className`, () => {
        it(`component could have style and className`, () => {
            const props = {
                class: 'class-test',
                style: { color: 'red' },
            };
            const { container } = render(<Component {...props} />);
            expect(container.firstChild).toHaveClass('class-test');
            expect(container.firstChild).toHaveStyle('color: red');
        });
    });
}
