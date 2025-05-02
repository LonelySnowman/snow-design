import { defineComponent } from 'vue';
import ThemeSwitch from '../index';

const meta = {
    title: 'ThemeSwitch',
    component: ThemeSwitch,
};

export default meta;

export const ThemeSwitchBasic = {
    name: 'Theme Switch Basic',
    render: () =>
        defineComponent({
            components: { ThemeSwitch },
            template: '<ThemeSwitch />',
        }),
};
