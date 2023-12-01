import type { StoryObj } from '@storybook/react';
import React from 'react'
import Button from '../index';

export default {
    title: 'Button',
}

export const Base: StoryObj = {
    args: {
        primary: true,
        label: 'Button',
    },
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
