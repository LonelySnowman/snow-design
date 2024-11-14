import mountTest from '#test/vue/mountTest';
import '@testing-library/jest-dom';
import ConfigProvider from '../index';
import Pagination from '@snow-design/vue3/pagination';
import { render } from '@testing-library/vue';
import { zh_CN } from '@snow-design/locale';

describe('ConfigProvider', () => {
    mountTest(<ConfigProvider />);

    it('renders correctly', () => {
        const { container } = render(
            <ConfigProvider>
                <Pagination showTotal total={20} pageSize={2}></Pagination>
            </ConfigProvider>,
        );
        expect(container).toMatchSnapshot();
    });

    it('use the correct language', () => {
        expect(
            render(
                <ConfigProvider locale={zh_CN}>
                    <Pagination showTotal total={20} pageSize={2}></Pagination>
                </ConfigProvider>,
            ).container,
        ).toContainHTML('总页数');
        expect(
            render(
                <ConfigProvider>
                    <Pagination showTotal total={20} pageSize={2}></Pagination>
                </ConfigProvider>,
            ).container,
        ).toContainHTML('Total pages');
    });
});
