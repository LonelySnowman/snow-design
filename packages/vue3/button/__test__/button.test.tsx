import mountTest from '#test/vue/mountTest';
import styleTest from '#test/vue/styleTest';
import Button from '../index';
import { cssClasses } from '@snow-design/foundation/button/constants';
import { render } from '@testing-library/vue';

describe('Button', () => {
    const prefix = cssClasses.PREFIX;
    mountTest(<Button>SnowDesign</Button>);
    styleTest(Button);

    it('renders correctly', () => {
        const { container } = render(<Button>SnowDesign</Button>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('have type class', () => {
        const { container } = render(<Button type="primary">SnowDesign</Button>);
        expect(container.firstChild).toHaveClass(`${prefix}-primary`);
    });
});
