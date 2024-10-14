import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Pagination from '@snow-design/components/pagination';
import Button from '@snow-design/components/button';

const meta: Meta<typeof Pagination> = {
    title: 'Pagination',
    component: Pagination,
};

export default meta;

export const PaginationTest: StoryObj = {
    render() {
        const [currentPage, setCurrentPage] = useState(5);
        return (
            <>
                <h3>受控模式</h3>
                <Pagination
                    showTotal
                    currentPage={currentPage}
                    total={20}
                    pageSize={2}
                    onChange={(targetPage) => {
                        setCurrentPage(targetPage);
                    }}
                />
                <h4>自定义受控按钮</h4>
                <Button
                    style={{ marginRight: '4px' }}
                    onClick={() => {
                        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
                    }}
                >
                    上一页
                </Button>
                <Button
                    onClick={() => {
                        if (currentPage < 10) setCurrentPage((prev) => prev + 1);
                    }}
                >
                    下一页
                </Button>
                <br />
                <h3>非受控模式</h3>
                <Pagination defaultCurrentPage={1} total={20} pageSize={2} />
            </>
        );
    },
};
