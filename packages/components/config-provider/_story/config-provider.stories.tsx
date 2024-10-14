import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Pagination from '@snow-design/components/pagination';
import ConfigProvider from '@snow-design/components/config-provider';
import zh_CN from '@snow-design/locale/zh_CN';

const meta: Meta<typeof ConfigProvider> = {
    title: 'ConfigProvider',
    component: ConfigProvider,
};

export default meta;

export const ConfigProviderBase: StoryObj = {
    render() {
        return (
            <>
                <h3>通过提供不同的语言包实现国际化</h3>
                <ConfigProvider locale={zh_CN}>
                    <Pagination
                        showTotal
                        total={20}
                        pageSize={2}
                        onChange={(a, b) => {
                            console.log(a, b);
                        }}
                    ></Pagination>
                </ConfigProvider>
                <Pagination
                    showTotal
                    total={20}
                    pageSize={2}
                    onChange={(a, b) => {
                        console.log(a, b);
                    }}
                ></Pagination>
            </>
        );
    },
};
