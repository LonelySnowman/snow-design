import classNames from 'classnames';
import { defineComponent, reactive, computed, onBeforeMount } from 'vue';
import '@snow-design/foundation/pagination/pagination.scss';
import { cssClasses } from '@snow-design/foundation/pagination/constants';
import usePaginationFoundation from '@snow-design/foundation/pagination/foundation';
import { anyType, VueNode, CssProps } from '../_utils/type';
import { withInstall } from '../_utils';
import useLocale from '../_locale/useLocale';
import useMergedState from '../_utils/hooks/useMergedState';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

const prefixCls = cssClasses.PREFIX;

export const paginationProps = () => ({
    currentPage: Number,
    defaultCurrentPage: Number,
    pageSize: Number,
    total: Number,
    showTotal: Boolean,
    disabled: Boolean,
    nextText: anyType<VueNode>(),
    prevText: anyType<VueNode>(),
    ...CssProps,
});

const Pagination = defineComponent({
    name: 'SPagination',
    compatConfig: { MODE: 3 },
    inheritAttrs: false,
    props: paginationProps(),
    emits: ['update:currentPage', 'change'],
    setup(props, { emit }) {
        const {
            currentPage,
            pageSize,
            defaultCurrentPage = 1,
            total,
            showTotal,
            disabled = false,
            nextText,
            prevText,
            class: className,
            style,
        } = props;

        const [curPageValue, setCurPageValue] = useMergedState<number>(defaultCurrentPage, {
            value: computed(() => props.currentPage),
            onChange: (value) => {
                foundation.goPage(value);
            },
        });

        const paginationState = reactive({
            prevIsDisabled: false,
            nextIsDisabled: false,
            pageList: [],
        });

        const [contextLocale] = useLocale('Pagination');
        const isControlComponent = currentPage !== undefined;
        const foundation = usePaginationFoundation({
            getProps() {
                return props;
            },
            getStates() {
                return {
                    currentPage: curPageValue.value,
                    total,
                    pageSize,
                };
            },
            setCurrentPage(pageIndex: number) {
                setCurPageValue(pageIndex);
            },
            setPageList(pageList) {
                paginationState.pageList = pageList;
            },
            setDisabled: (prevIsDisabled: boolean, nextIsDisabled: boolean) => {
                paginationState.prevIsDisabled = prevIsDisabled;
                paginationState.nextIsDisabled = nextIsDisabled;
            },
            notifyChange: (pageIndex: number, pageSize: number) => {
                if (isControlComponent) {
                    emit('update:currentPage', pageIndex);
                }
                emit('change', pageIndex, pageSize);
            },
        });

        onBeforeMount(() => {
            foundation.init();
        });

        const renderPrevBtn = () => {
            const isDisabled = paginationState.prevIsDisabled || disabled;
            const preClassName = classNames({
                [`${prefixCls}-item`]: true,
                [`${prefixCls}-prev`]: true,
                [`${prefixCls}-item-disabled`]: isDisabled,
            });
            return (
                <li
                    role="button"
                    aria-disabled={isDisabled}
                    aria-label="Previous"
                    onClick={() => !isDisabled && foundation.goPrev()}
                    class={preClassName}
                >
                    {prevText || <ChevronLeft />}
                </li>
            );
        };

        const renderNextBtn = () => {
            const isDisabled = paginationState.nextIsDisabled || disabled;
            const nextClassName = classNames({
                [`${prefixCls}-item`]: true,
                [`${prefixCls}-next`]: true,
                [`${prefixCls}-item-disabled`]: isDisabled,
            });
            return (
                <li
                    role="button"
                    aria-disabled={isDisabled}
                    aria-label="Next"
                    onClick={() => !isDisabled && foundation.goNext()}
                    class={nextClassName}
                >
                    {nextText || <ChevronRight />}
                </li>
            );
        };

        const renderPageList = () => {
            return paginationState.pageList.map((page, i) => {
                const pageListClassName = classNames(`${prefixCls}-item`, {
                    [`${prefixCls}-item-active`]: curPageValue.value === page,
                    [`${prefixCls}-item-all-disabled`]: disabled,
                    [`${prefixCls}-item-all-disabled-active`]: curPageValue.value === page && disabled,
                });
                const pageEl = (
                    <li
                        key={`${page}${i}`}
                        onClick={() => !disabled && foundation.goPage(page, !isControlComponent)}
                        class={pageListClassName}
                        aria-label={page === '...' ? 'More' : `Page ${page}`}
                        aria-current={curPageValue.value === page ? 'page' : false}
                    >
                        {page}
                    </li>
                );
                return pageEl;
            });
        };

        const paginationCls = classNames(className, `${prefixCls}`, {
            [`${prefixCls}-disabled`]: disabled,
        });
        const showTotalCls = `${prefixCls}-total`;

        const totalNum = Math.ceil(total / pageSize);
        const totalToken = contextLocale.total.replace('${total}', totalNum.toString());

        return () => (
            <ul class={paginationCls} style={style}>
                {showTotal ? <span class={showTotalCls}>{totalToken}</span> : null}
                {renderPrevBtn()}
                {renderPageList()}
                {renderNextBtn()}
            </ul>
        );
    },
});

export default withInstall(Pagination);
