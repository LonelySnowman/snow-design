import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Masonry from '../index';

const meta: Meta<typeof Masonry> = {
    title: 'Masonry',
    component: Masonry,
};

export const Basic: StoryObj = {
    parameters: {
        layout: 'centered', // 将组件居中显示
    },
    args: {
        children: '瀑布流',
        type: 'default',
    },
};

export default meta;

export const Base: StoryObj = {
    render() {
        const [heights, setHeights] = useState([40, 20, 50, 35]); // 假设你有一个高度数组，用于模拟不同的高度
        return (
            <>
                <Masonry columns={4} spacing={2}>
                    {heights.map((height, index) => (
                        <div key={index} style={{ height, backgroundColor: 'red' }}>
                            {index + 1}
                        </div>
                    ))}
                </Masonry>
                <div
                    onClick={() => {
                        setHeights([...heights, 40, 20, 50, 35]);
                    }}
                >
                    Load More
                </div>
            </>
        );
    },
};
