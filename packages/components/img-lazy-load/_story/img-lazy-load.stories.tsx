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
        return (
            <div style={{ height: '150vh', padding: '20px' }}>
                <p>Scroll down to see lazy loading images</p>
                <div style={{ marginTop: '1000px' }}>
                    <ImgLazyLoad
                        src="https://fastly.picsum.photos/id/83/200/300.jpg?hmac=avqtE9ZSAkPbFtYCXzxg4TeAA-fMWqX6jUQeWI_HjLc"
                        placeholder={<div style={{ width: 200, height: 300, background: '#eee' }}>Loading...</div>}
                    />
                    <ImgLazyLoad
                        src="https://fastly.picsum.photos/id/320/200/301.jpg?hmac=bqN7yJjlYBYWppeCGdfOrSdD1n8qlt-PaWbcnhRkyG8"
                        placeholder={<div style={{ width: 200, height: 300, background: '#eee' }}>Loading...</div>}
                    />
                </div>
            </div>
        );
    },
};
