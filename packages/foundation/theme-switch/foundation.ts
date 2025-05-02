import { ThemeType } from './constants';

export interface ThemeSwitchAdapter {
    setThemeType: (themeType: ThemeType) => void;
    getState: () => {
        themeType: ThemeType;
    };
}

const useThemeSwitchFoundation = (adapter: ThemeSwitchAdapter) => {
    return {
        handleThemeChange: () => {
            if (adapter.getState().themeType === 'light') {
                adapter.setThemeType('dark');
            } else {
                adapter.setThemeType('light');
            }
        },
    };
};

export default useThemeSwitchFoundation;
