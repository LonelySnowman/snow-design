import type { Meta, StoryObj } from '@storybook/react';
import React, {useState} from 'react'
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
              <Pagination showTotal currentPage={currentPage} total={20} pageSize={2} onChange={(a, b) => {
                  setCurrentPage(a)
              }}></Pagination>
              <h3>受控按钮</h3>
              <Button style={{ marginRight: '4px'}} onClick={()=>{
                  if (currentPage > 1) setCurrentPage((prev) => prev - 1);
              }}>上一页</Button>
              <Button onClick={()=>{
                  if (currentPage < 10) setCurrentPage((prev) => prev + 1);
              }}>下一页</Button>
          </>
        )
    }
};
