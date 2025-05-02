import React from 'react';
import classNames from 'classnames';
import { CssProps } from '../_types';
import useMergedState from '../_utils/hooks/useMergedState';
import { cssClasses, ThemeType } from '@snow-design/foundation/theme-switch/constants';
import '@snow-design/foundation/theme-switch/theme-switch.scss';
import useThemeSwitchFoundation from '@snow-design/foundation/theme-switch/foundation';

const prefixCls = cssClasses.PREFIX;

export interface PaginationProps extends CssProps {
    defaultThemeType?: ThemeType;
    onChange?: (theme: ThemeType) => void;
    themeType?: ThemeType;
    size?: number;
}

// TODO: Update to Foundation / Adapter Model
export const ThemeSwitch: React.FC = (props: PaginationProps) => {
    const { defaultThemeType = 'light', themeType, onChange, size = 1, className: customClass, style } = props;

    const foundation = useThemeSwitchFoundation({
        setThemeType: (val: ThemeType) => {
            onChange?.(val);
            setCurThemeType(val);
        },
        getState: () => {
            return {
                themeType: curThemeType,
            };
        },
    });

    const [curThemeType, setCurThemeType] = useMergedState<ThemeType>(defaultThemeType, {
        value: themeType,
    });

    const themeClass = curThemeType === 'light' ? `${prefixCls}-light` : `${prefixCls}-dark`;

    return (
        <div
            className={classNames(prefixCls, themeClass, customClass)}
            onClick={() => {
                foundation.handleThemeChange();
            }}
            style={{ fontSize: `${size}px`, ...style }}
        >
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
