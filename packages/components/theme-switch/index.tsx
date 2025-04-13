import React from 'react';
import '@snow-design/foundation/theme-switch/theme-switch.scss';
import useMergedState from '../_utils/hooks/useMergedState';
import { CssProps } from '../_types';

type ThemeType = 'dark' | 'light';

export interface PaginationProps extends CssProps {
    defaultThemeType?: ThemeType;
    onChange?: () => void;
    themeType?: ThemeType;
}

// TODO: Update to Foundation / Adapter Model
export const ThemeSwitch: React.FC = (props: PaginationProps) => {
    const { defaultThemeType = 'light', themeType } = props;
    const handleThemeChange = () => {
        const willChangeMode = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'; // 判断是否白天黑夜;
        document.body.setAttribute('data-theme', willChangeMode);
    };
    const [curThemeType, setCurThemeType] = useMergedState<ThemeType>(defaultThemeType, {
        value: themeType,
        onChange: () => {
            handleThemeChange();
        },
    });
    console.log(curThemeType, setCurThemeType);
    return (
        <div className="container" onClick={handleThemeChange} style={{ fontSize: '0.5px' }}>
            <div className="components">
                <div className="main-button">
                    <div className="moon"></div>
                    <div className="moon"></div>
                    <div className="moon"></div>
                </div>
                <div className="daytime-backgrond"></div>
                <div className="daytime-backgrond"></div>
                <div className="daytime-backgrond"></div>
                <div className="cloud">
                    <div className="cloud-son"></div>
                    <div className="cloud-son"></div>
                    <div className="cloud-son"></div>
                    <div className="cloud-son"></div>
                    <div className="cloud-son"></div>
                    <div className="cloud-son"></div>
                </div>
                <div className="cloud-light">
                    <div className="cloud-son"></div>
                    <div className="cloud-son"></div>
                    <div className="cloud-son"></div>
                    <div className="cloud-son"></div>
                    <div className="cloud-son"></div>
                    <div className="cloud-son"></div>
                </div>
                <div className="stars">
                    <div className="star big">
                        <div className="star-son"></div>
                        <div className="star-son"></div>
                        <div className="star-son"></div>
                        <div className="star-son"></div>
                    </div>
                    <div className="star big">
                        <div className="star-son"></div>
                        <div className="star-son"></div>
                        <div className="star-son"></div>
                        <div className="star-son"></div>
                    </div>
                    <div className="star medium">
                        <div className="star-son"></div>
                        <div className="star-son"></div>
                        <div className="star-son"></div>
                        <div className="star-son"></div>
                    </div>
                    <div className="star medium">
                        <div className="star-son"></div>
                        <div className="star-son"></div>
                        <div className="star-son"></div>
                        <div className="star-son"></div>
                    </div>
                    <div className="star small">
                        <div className="star-son"></div>
                        <div className="star-son"></div>
                        <div className="star-son"></div>
                        <div className="star-son"></div>
                    </div>
                    <div className="star small">
                        <div className="star-son"></div>
                        <div className="star-son"></div>
                        <div className="star-son"></div>
                        <div className="star-son"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThemeSwitch;
