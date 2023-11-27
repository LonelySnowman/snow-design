import type { StoryObj } from '@storybook/react';
import React from 'react'
import Button from '../index';

export default {
    title: 'Button',
}

export const Primary: StoryObj = {
    args: {
        primary: true,
        label: 'Button',
    },
    render() {
        return <Button>UI semi</Button>
    }
};
