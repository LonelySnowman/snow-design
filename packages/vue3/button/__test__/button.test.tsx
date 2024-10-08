import mountTest from "#test/vue/mountTest";
import styleTest from "#test/vue/styleTest";
import Button from '../index';
import { cssClasses } from '@snow-design/foundation/button/constants';
import { render } from "@testing-library/vue";

describe('Button', () => {
    const prefix = cssClasses.PREFIX;
    mountTest(<Button/>);
    styleTest(<Button/>);

    it('renders correctly', () => {
        expect(render(<Button>SnowDesign</Button>).container.firstChild).toMatchSnapshot();
    });

    it('have type class', () => {
        const { container } = render(<Button type="primary">SnowDesign</Button>);
        expect(container.firstChild).toHaveClass(`${prefix}-primary`);
    });
});
