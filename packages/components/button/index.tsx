import React, { ReactNode } from 'react';
import '@snow-design/foundation/button/button.scss';
import { cssClasses } from '@snow-design/foundation/button/constants';
import classNames from 'classnames';
import { CssProps } from '@snow-design/components/_types';

const prefixCls = cssClasses.PREFIX;

export type ThemeType = 'default' | 'primary' | 'warning' | 'danger';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLElement>, 'type'>, CssProps {
    children?: ReactNode;
    type?: ThemeType;
}

const Button: React.FC<ButtonProps> = (props) => {
    const { children, style, className, type = 'default', ...baseProps } = props;

    const classes = classNames(className, prefixCls, {
        [`${prefixCls}-${type}`]: type,
    });

    return (
        <button {...baseProps} style={style} className={classes}>
            <span>{children}</span>
        </button>
    );
};

export default Button;
