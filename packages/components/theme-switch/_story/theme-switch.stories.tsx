import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import ThemeSwitch from '../index';
import { Button } from '@snow-design/components';

type Story = StoryObj<typeof ThemeSwitch>;

const meta: Meta<typeof ThemeSwitch> = {
    title: 'ThemeSwitch',
    component: ThemeSwitch,
};

export default meta;

export const ThemeSwitchBasic: Story = {
    render: () => {
        return <ThemeSwitch defaultThemeType="dark" />;
    },
};

export const ThemeSwitchBasicControl: Story = {
    render: () => {
        const [themeType, setThemeType] = useState('light');
        return (
            <>
                <h3>受控模式</h3>
                <ThemeSwitch themeType={themeType} onChange={setThemeType} />
                <h4>自定义受控按钮</h4>
                <Button style={{ marginRight: '4px' }} onClick={() => setThemeType('light')}>
                    亮色主题
                </Button>
                <Button onClick={() => setThemeType('dark')}>暗色主题</Button>
            </>
        );
    },
};
