import { defineComponent, onMounted, reactive, CSSProperties } from 'vue';
// import '@snow-design/foundation/pagination/pagination.scss'
import { cssClasses } from '@snow-design/foundation/pagination/constants';
import classNames from 'classnames';
import usePaginationFoundation from "@snow-design/foundation/pagination/foundation";
import { anyType, objectType, withInstall, VueNode } from '../_utils/type';
import useLocale from "../_locale/useLocale";

const prefixCls = cssClasses.PREFIX;

export const paginationProps = () => ({
  currentPage: Number,
  defaultCurrentPage: Number,
  pageSize: Number,
  total: Number,
  showTotal: Boolean,
  onChange: Function,
  disabled: Boolean,
  nextText: anyType<VueNode>(),
  prevText: anyType<VueNode>(),
  class: String,
  style: objectType<CSSProperties>(),
});

const Pagination = defineComponent({
  name: 'SPagination',
  compatConfig: { MODE: 3 },
  inheritAttrs: false,
  props: paginationProps(),
  setup(props: any) {
    const {
      currentPage,
      defaultCurrentPage = 1,
      pageSize,
      total,
      showTotal,
      disabled = false,
      onChange,
      nextText,
      prevText,
      className,
      style,
    } = props;

    console.log(props.pageSize);

    const [contextLocale] = useLocale('Pagination');

    const paginationState = reactive({
      prevIsDisabled: false,
      nextIsDisabled: false,
      pageList: [],
      curPageValue: defaultCurrentPage,
    })

    const foundation = usePaginationFoundation({
      // LJQFLAG 抽离公共 Foundation
      getProps() {
        return props;
      },
      getStates() {
        return {
          currentPage: paginationState.curPageValue,
          total,
          pageSize
        }
      },
      setCurrentPage(pageIndex: number) {
        paginationState.curPageValue = pageIndex;
      },
      setPageList(pageList){
        paginationState.pageList = pageList;
      },
      setDisabled: (prevIsDisabled: boolean, nextIsDisabled: boolean) => {
        paginationState.prevIsDisabled = prevIsDisabled;
        paginationState.nextIsDisabled = nextIsDisabled;
      },
      notifyChange: (pageIndex: number, pageSize: number) => {
        onChange(pageIndex, pageSize);
      }
    })

    onMounted(() => {
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
          onClick={e => !isDisabled && foundation.goPrev()}
          class={preClassName}
        >
          {/* LJQFLAG 自定义 ICON */}
          {/*{prevText || <IconChevronLeft size="large" />}*/}
          {prevText || contextLocale.previous}
        </li>
      );
    }

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
          onClick={e => !isDisabled && foundation.goNext()}
          class={nextClassName}
        >
          {/* LJQFLAG 自定义 ICON */}
          {/*{prevText || <IconChevronLeft size="large" />}*/}
          {nextText || contextLocale.next}
        </li>
      );
    }

    const renderPageList = () => {
      return paginationState.pageList.map((page, i) => {
        const pageListClassName = classNames(`${prefixCls}-item`, {
          [`${prefixCls}-item-active`]: paginationState.curPageValue === page,
          [`${prefixCls}-item-all-disabled`]: disabled,
          [`${prefixCls}-item-all-disabled-active`]: paginationState.curPageValue === page && disabled,
        });
        const pageEl = (
          <li
            key={`${page}${i}`}
            onClick={() => !disabled && foundation.goPage(page)}
            class={pageListClassName}
            aria-label={page === '...' ? 'More' : `Page ${page}`}
            aria-current={paginationState.curPageValue === page ? "page" : false}
          >
            {page}
          </li>
        );
        return pageEl;
      });
    }

    const paginationCls = classNames(className, `${prefixCls}`, { [`${prefixCls}-disabled`]: disabled });
    const showTotalCls = `${prefixCls}-total`;

    const totalNum = Math.ceil(total / pageSize);
    const totalToken = contextLocale.total.replace('${total}', totalNum.toString());

    return () => (
      <ul class={paginationCls} style={style}>
        {showTotal ? (
          <span class={showTotalCls}>{totalToken}</span>
        ) : null}
        {renderPrevBtn()}
        {renderPageList()}
        {renderNextBtn()}
      </ul>
    )
  }
})

export default withInstall(Pagination);
