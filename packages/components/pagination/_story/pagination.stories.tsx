import type { Meta, StoryObj } from '@storybook/react';
import React from 'react'
import Pagination from '../index';
import ConfigProvider from "@snow-design/components/config-provider";
import zh_CN from "@snow-design/locale/zh_CN";

const meta: Meta<typeof Pagination> = {
    title: 'Pagination',
    component: Pagination,
};

export default meta;

export const PaginationTest: StoryObj = {
    render() {
        return (
          <>
            <ConfigProvider locale={zh_CN}>
              <Pagination showTotal total={20} pageSize={2} onChange={(a, b) => {
                console.log(a, b)
              }}></Pagination>
            </ConfigProvider>
            <Pagination showTotal total={20} pageSize={2} onChange={(a, b) => {
              console.log(a, b)
            }}></Pagination>
          </>
        )
    }
};
