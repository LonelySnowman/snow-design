import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import ConfigProvider from '../index';
import mountTest from '#test/react/mountTest';
import Pagination from '@snow-design/components/pagination';
import zh_CN from '@snow-design/locale/zh_CN';

describe('ConfigProvider', () => {
    mountTest(() => <ConfigProvider>Test</ConfigProvider>);

    it('renders correctly', () => {
        expect(
            render(
                <ConfigProvider>
                    <Pagination showTotal total={20} pageSize={2}></Pagination>
                </ConfigProvider>,
            ).container.firstChild,
        ).toMatchSnapshot();
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
