import React, { ReactNode } from 'react';
import '@snow-design/foundation/button/button.scss'
import { cssClasses } from '@snow-design/foundation/button/constants';
import classNames from "classnames";

const prefixCls = cssClasses.PREFIX;

export type Type = 'default' | 'primary' | 'warning' | 'danger';
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>{
    children?: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    type?: Type;
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
    )

    return (
        <button {...baseProps} style={style} className={classes} onClick={onClick}>
            <span>
                {children}
            </span>
        </button>
    )
}

export default Button;
