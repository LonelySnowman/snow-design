import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ImgLazyLoad from '../index';

const meta: Meta<typeof ImgLazyLoad> = {
    title: 'ImgLazyLoad',
    component: ImgLazyLoad,
};

export default meta;

export const ImgLazyLoadBase: StoryObj = {
    render() {
        const LoadingPlaceholder = (
            <div
                style={{
                    width: '200px',
                    height: '300px',
                    background: '#eee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999',
                }}
            >
                Loading...
            </div>
        );
        return (
            <div style={{ height: '150vh', padding: '20px' }}>
                <p>向下滚动查看懒加载图片</p>
                <div style={{ marginTop: '1000px' }}>
                    <ImgLazyLoad
                        src="https://fastly.picsum.photos/id/83/200/300.jpg?hmac=avqtE9ZSAkPbFtYCXzxg4TeAA-fMWqX6jUQeWI_HjLc"
                        placeholder={LoadingPlaceholder}
                    />
                    <ImgLazyLoad
                        src="https://fastly.picsum.photos/id/320/200/301.jpg?hmac=bqN7yJjlYBYWppeCGdfOrSdD1n8qlt-PaWbcnhRkyG8"
                        placeholder={LoadingPlaceholder}
                    />
                </div>
            </div>
        );
    },
};
