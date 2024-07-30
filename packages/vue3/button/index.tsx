import React, { ReactNode } from 'react';
import '@snow-design/foundation/button/button.scss'
import { cssClasses } from '@snow-design/foundation/button/constants';
import classNames from "classnames";

const prefixCls = cssClasses.PREFIX;

export type ThemeType = 'default' | 'primary' | 'warning' | 'danger';

export interface ButtonProps {
    children?: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    type?: ThemeType;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    onMouseDown?: React.MouseEventHandler<HTMLButtonElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = (props) => {
    const {
        onClick,
        children,
        style,
        className,
        type = 'default',
        ...baseProps
    } = props;

    const classes = classNames(
        className,
        prefixCls,
        {
            [`${prefixCls}-${type}`]: type,
        }
    );

    return (
        <button {...baseProps} style={style} className={classes} onClick={onClick}>
            <span>
                {children}
            </span>
        </button>
    );
}

export default Button;
