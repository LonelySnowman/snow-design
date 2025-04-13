import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import VirtualList from '../index';
import { ItemProps } from '@snow-design/foundation/virtual-list/constants';
import Button from '@snow-design/components/button';

const meta: Meta<typeof VirtualList> = {
    title: 'VirtualList',
    component: VirtualList,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VirtualList>;

const Row = ({ index, style }: ItemProps) => {
    return (
        <div
            style={{
                ...style,
                display: 'flex',
                alignItems: 'center',
                padding: '0 20px',
                backgroundColor: index % 2 ? '#f5f5f5' : 'white',
                boxSizing: 'border-box',
                borderBottom: '1px solid #e8e8e8',
            }}
        >
            {`Row ${index}`}
        </div>
    );
};

export const FixedSizeBasic: Story = {
    name: 'Fixed Size Virtual List',
    render: () => {
        return (
            <div style={{ border: '1px solid #e8e8e8', borderRadius: '4px' }}>
                <VirtualList height={300} width={400} itemSize={50} itemCount={1000}>
                    {Row}
                </VirtualList>
            </div>
        );
    },
};

export const VariableSizeBasic: Story = {
    name: 'Variable Size Virtual List',
    render: () => {
        const getItemSize = (index: number) => (index % 3 === 0 ? 80 : 50);
        return (
            <div style={{ border: '1px solid #e8e8e8', borderRadius: '4px' }}>
                <VirtualList height={300} width={400} itemSize={getItemSize} itemCount={1000}>
                    {Row}
                </VirtualList>
            </div>
        );
    },
};

export const UseRef: Story = {
    name: 'Virtual List Ref Scroll To',
    render: () => {
        const ref = React.useRef(null);
        return (
            <>
                <Button
                    type="primary"
                    onClick={() => {
                        ref.current?.scrollTo(25000);
                    }}
                >
                    Scroll To 25000
                </Button>
                <div style={{ border: '1px solid #e8e8e8', borderRadius: '4px', marginTop: '4px' }}>
                    <VirtualList ref={ref} height={300} width={400} itemSize={50} itemCount={1000}>
                        {Row}
                    </VirtualList>
                </div>
            </>
        );
    },
};
