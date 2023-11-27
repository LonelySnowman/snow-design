import React, { ReactNode } from 'react';
import '@snow-design/snow-foundation/button/button.scss'
import { cssClasses } from '@snow-design/snow-foundation/button/constants';

const prefixCls = cssClasses.PREFIX;

export type Type = 'primary' | 'secondary' | 'tertiary' | 'warning' | 'danger';
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>{
    id?: string;
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
        style
    } = props;

    return (
        <div className={prefixCls} style={style}>
            <button onClick={onClick}>{children}</button>
        </div>
    )
}

export default Button;