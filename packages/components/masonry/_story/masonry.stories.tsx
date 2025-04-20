import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Masonry from '../index';
import Button from '@snow-design/components/button';

const meta: Meta<typeof Masonry> = {
    title: 'Masonry',
    component: Masonry,
};

export default meta;

export const Base: StoryObj = {
    render() {
        const [heights, setHeights] = useState([400, 200, 100, 350]); // 假设你有一个高度数组，用于模拟不同的高度
        return (
            <>
                <Masonry columns={4} spacing={2}>
                    {heights.map((height, index) => (
                        <div
                            key={index}
                            style={{
                                height: 'max-content',
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                padding: '12px',
                                overflow: 'hidden',
                            }}
                        >
                            <img
                                src={`https://picsum.photos/200/${height}?random=${index}`}
                                style={{
                                    height: height,
                                    width: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '6px',
                                    marginBottom: '8px',
                                }}
                            />
                            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>小红书标题 {index + 1}</div>
                            <div
                                style={{
                                    fontSize: '12px',
                                    color: '#666',
                                    marginTop: '4px',
                                }}
                            >
                                这是一段小红书的描述文字...
                            </div>
                        </div>
                    ))}
                </Masonry>
                <Button
                    type="primary"
                    style={{
                        marginTop: '12px',
                    }}
                    onClick={() => {
                        setHeights([...heights, 200, 150, 100, 250]);
                    }}
                >
                    Load More
                </Button>
            </>
        );
    },
};
