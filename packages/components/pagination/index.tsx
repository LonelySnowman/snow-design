import React, { useEffect, useState } from 'react';
import '@snow-design/foundation/pagination/pagination.scss'
import { cssClasses } from '@snow-design/foundation/pagination/constants';
import classNames from 'classnames';
import { useLocale } from '../_locale';
import usePaginationFoundation from "@snow-design/foundation/pagination/foundation";
import useMergedState from "../_utils/hooks/useMergedState";

const prefixCls = cssClasses.PREFIX;

export interface PaginationProps {
    currentPage?: number;
    defaultCurrentPage?: number;
    pageSize: number;
    total: number;
    showTotal?: number;
    onChange?: (page: number, pageSize: number) => void;
    disabled?: boolean;
    nextText?: React.ReactNode;
    prevText?: React.ReactNode;
    className?: string; // LJQFLAG 改为全局支持 各个组件均支持
    style?: React.CSSProperties;
}

const Button: React.FC<PaginationProps> = (props) => {
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

    const [contextLocale] = useLocale('Pagination');
    const [btnDisabled, setBtnDisabled] = useState<{prevIsDisabled: boolean, nextDisabled: boolean}>({
        prevIsDisabled: false,
        nextDisabled: false
    })
    const [pageList, setPageList] = useState([]);
    const [curPageValue, setCurPageValue] = useMergedState<number>(defaultCurrentPage, currentPage);

    const foundation = usePaginationFoundation({
        // LJQFLAG 抽离公共 Foundation
        getProps() {
            return props;
        },
        getStates() {
            return {
                currentPage: curPageValue,
                total,
                pageSize
            }
        },
        setCurrentPage(pageIndex: number) {
            setCurPageValue(pageIndex);
        },
        setPageList(pageList){
            setPageList(pageList);
        },
        setDisabled: (prevIsDisabled: boolean, nextIsDisabled: boolean) => {
            setBtnDisabled({ prevIsDisabled: prevIsDisabled, nextDisabled: nextIsDisabled });
        },
        notifyChange: (pageIndex: number, pageSize: number) => {
            onChange(pageIndex, pageSize);
        }
    })

    useEffect(() => {
        foundation.init();
    }, []);

    const renderPrevBtn = () => {
        const isDisabled = btnDisabled.prevIsDisabled || disabled;
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
            className={preClassName}
          >
              {/* LJQFLAG 自定义 ICON */}
              {/*{prevText || <IconChevronLeft size="large" />}*/}
              {prevText || contextLocale.previous}
          </li>
        );
    }

    const renderNextBtn = () => {
        const isDisabled = btnDisabled.nextDisabled || disabled;
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
            className={nextClassName}
          >
              {/* LJQFLAG 自定义 ICON */}
              {/*{prevText || <IconChevronLeft size="large" />}*/}
              {nextText || contextLocale.next}
          </li>
        );
    }

    const renderPageList = () => {
        return pageList.map((page, i) => {
            const pageListClassName = classNames(`${prefixCls}-item`, {
                [`${prefixCls}-item-active`]: curPageValue === page,
                [`${prefixCls}-item-all-disabled`]: disabled,
                [`${prefixCls}-item-all-disabled-active`]: curPageValue === page && disabled,
            });
            const pageEl = (
              <li
                key={`${page}${i}`}
                onClick={() => !disabled && foundation.goPage(page)}
                className={pageListClassName}
                aria-label={page === '...' ? 'More' : `Page ${page}`}
                aria-current={curPageValue === page ? "page" : false}
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

    return (
      <ul className={paginationCls} style={style}>
          {showTotal ? (
            <span className={showTotalCls}>{totalToken}</span>
          ) : null}
          {renderPrevBtn()}
          {renderPageList()}
          {renderNextBtn()}
      </ul>
    );
}

export default Button;
