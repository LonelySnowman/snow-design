import '@snow-design/foundation/button/button.scss'
import { cssClasses } from '@snow-design/foundation/button/constants';
import classNames from "classnames";
import { CssProps } from '../_utils/type';
import { withInstall } from "../_utils";
import { defineComponent, PropType } from "vue";

const prefixCls = cssClasses.PREFIX;

export type ThemeType = 'default' | 'primary' | 'warning' | 'danger';

export const buttonProps = () => ({
    type: String as PropType<ThemeType>,
    ...CssProps
});

const Button = defineComponent({
    name: 'SButton',
    compatConfig: { MODE: 3 },
    props: buttonProps(),
    setup(props, { slots }) {
        const {
            style,
            class: className,
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

        return () => (
            <button {...baseProps} style={style} class={classes}>
                <span>
                    {slots.default?.()}
                </span>
            </button>
        );
    },
});

export default withInstall(Button);
