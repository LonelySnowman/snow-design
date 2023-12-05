import type { Meta, StoryObj } from '@storybook/react';
import React from 'react'
import Button from '../index';

const meta: Meta<typeof Button> = {
    title: 'Button',
    component: Button,
};

export const Basic: StoryObj = {
    parameters: {
        layout: 'centered', // 将组件居中显示
    },
    args: {
        children: '按钮',
        type: 'default'
    },
    argTypes: {
        type: {
            options: ['default', 'primary', 'warning', 'danger'],
            control: { type: 'radio' },
        },
    }
};

export default meta;

export const Type: StoryObj = {
    render() {
        return (<>
            <Button>Default</Button>
            <br/><br/>
            <Button type="primary">Primary</Button>
            <br/><br/>
            <Button type="warning">Warning</Button>
            <br/><br/>
            <Button type="danger">Danger</Button>
        </>)
    }
};
