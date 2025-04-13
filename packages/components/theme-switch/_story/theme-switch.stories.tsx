import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ThemeSwitch from '../index';

type Story = StoryObj<typeof ThemeSwitch>;

const meta: Meta<typeof ThemeSwitch> = {
    title: 'ThemeSwitch',
    component: ThemeSwitch,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;

export const ThemeSwitchBasic: Story = {
    name: 'Theme Switch Basic',
    render: () => {
        return <ThemeSwitch />;
    },
};
