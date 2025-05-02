import classNames from 'classnames';
import { defineComponent, computed, PropType } from 'vue';
import { cssClasses, ThemeType } from '@snow-design/foundation/theme-switch/constants';
import '@snow-design/foundation/theme-switch/theme-switch.scss';
import useThemeSwitchFoundation from '@snow-design/foundation/theme-switch/foundation';
import { withInstall } from '../_utils';
import { CssProps } from '../_utils/type';
import useMergedState from '@snow-design/vue3/_utils/hooks/useMergedState';

const prefixCls = cssClasses.PREFIX;

export const themeSwitchProps = () => ({
    defaultThemeType: String as PropType<ThemeType>,
    themeType: String as PropType<ThemeType>,
    onChange: Function as PropType<() => void>,
    size: Number as PropType<number>,
    ...CssProps,
});

const ThemeSwitch = defineComponent({
    name: 'SThemeSwitch',
    compatConfig: { MODE: 3 },
    inheritAttrs: false,
    props: themeSwitchProps(),
    emits: ['update:themeType'],
    setup(props, { emit }) {
        const { defaultThemeType = 'light', size = 1 } = props;

        const foundation = useThemeSwitchFoundation({
            setThemeType: (val: ThemeType) => {
                setCurThemeType(val);
            },
            getState: () => {
                return {
                    themeType: curThemeType.value,
                };
            },
        });

        const [curThemeType, setCurThemeType] = useMergedState<ThemeType>(defaultThemeType, {
            value: computed(() => props.themeType),
            onChange: (value: ThemeType) => {
                emit('update:themeType', value);
            },
        });

        const themeClass = computed(() =>
            curThemeType.value === 'light' ? `${prefixCls}-light` : `${prefixCls}-dark`,
        );

        return () => (
            <div
                class={classNames(prefixCls, themeClass.value)}
                onClick={() => {
                    foundation.handleThemeChange();
                }}
                style={{ fontSize: `${size}px` }}
            >
                <div class="components">
                    <div class="main-button">
                        <div class="moon"></div>
                        <div class="moon"></div>
                        <div class="moon"></div>
                    </div>
                    <div class="daytime-backgrond"></div>
                    <div class="daytime-backgrond"></div>
                    <div class="daytime-backgrond"></div>
                    <div class="cloud">
                        <div class="cloud-son"></div>
                        <div class="cloud-son"></div>
                        <div class="cloud-son"></div>
                        <div class="cloud-son"></div>
                        <div class="cloud-son"></div>
                        <div class="cloud-son"></div>
                    </div>
                    <div class="cloud-light">
                        <div class="cloud-son"></div>
                        <div class="cloud-son"></div>
                        <div class="cloud-son"></div>
                        <div class="cloud-son"></div>
                        <div class="cloud-son"></div>
                        <div class="cloud-son"></div>
                    </div>
                    <div class="stars">
                        <div class="star big">
                            <div class="star-son"></div>
                            <div class="star-son"></div>
                            <div class="star-son"></div>
                            <div class="star-son"></div>
                        </div>
                        <div class="star big">
                            <div class="star-son"></div>
                            <div class="star-son"></div>
                            <div class="star-son"></div>
                            <div class="star-son"></div>
                        </div>
                        <div class="star medium">
                            <div class="star-son"></div>
                            <div class="star-son"></div>
                            <div class="star-son"></div>
                            <div class="star-son"></div>
                        </div>
                        <div class="star medium">
                            <div class="star-son"></div>
                            <div class="star-son"></div>
                            <div class="star-son"></div>
                            <div class="star-son"></div>
                        </div>
                        <div class="star small">
                            <div class="star-son"></div>
                            <div class="star-son"></div>
                            <div class="star-son"></div>
                            <div class="star-son"></div>
                        </div>
                        <div class="star small">
                            <div class="star-son"></div>
                            <div class="star-son"></div>
                            <div class="star-son"></div>
                            <div class="star-son"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
});

export default withInstall(ThemeSwitch);
