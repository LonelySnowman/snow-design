import React, { useEffect, useState } from 'react';
import '@snow-design/foundation/pagination/pagination.scss'
import { cssClasses } from '@snow-design/foundation/pagination/constants';
import classNames from 'classnames';
import { useLocale } from '../_locale';
import usePaginationFoundation from "@snow-design/foundation/pagination/foundation";
import useMergedState from "../_utils/hooks/useMergedState";
import { CssProps } from "@snow-design/components/_types";

const prefixCls = cssClasses.PREFIX;

export interface PaginationProps extends CssProps {
    pageSize: number;
    total: number;
    currentPage?: number;
    defaultCurrentPage?: number;
    showTotal?: boolean;
    onChange?: (page: number, pageSize: number) => void;
    disabled?: boolean;
    nextText?: React.ReactNode;
    prevText?: React.ReactNode;
}

const Button: React.FC<PaginationProps> = (props) => {
    const {
        currentPage,
        defaultCurrentPage = 1,
        pageSize,
        total,
        showTotal = false,
        disabled = false,
        onChange,
        nextText,
        prevText,
        className,
        style,
    } = props;

    if (currentPage && !onChange) {
        console.warn(
            'Warning: you have provide currentPage prop for pagination but without onChange handler ,' +
            ' this will cause no-change when you change page. '
        );
    }

    const [btnDisabled, setBtnDisabled] = useState<{prevIsDisabled: boolean, nextDisabled: boolean}>({
        prevIsDisabled: false,
        nextDisabled: false
    })
    const [pageList, setPageList] = useState([]);
    const [curPageValue, setCurPageValue] = useMergedState<number>(defaultCurrentPage, {
        value: currentPage,
        onChange: (value) => {
            foundation.goPage(value);
        }
    });

    const [contextLocale] = useLocale('Pagination');
    const isControlComponent = currentPage !== undefined;
    const foundation = usePaginationFoundation({
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
            if (typeof onChange === "function") {
                onChange(pageIndex, pageSize);
            }
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
            onClick={() => !isDisabled && foundation.goPrev()}
            className={preClassName}
          >
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
            onClick={() => !isDisabled && foundation.goNext()}
            className={nextClassName}
          >
              {/* @todo: Icon 模块待设计 */}
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
                onClick={() => !disabled && foundation.goPage(page, !isControlComponent)}
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

    const totalNum = Math.ceil(total / pageSize);
    const totalToken = contextLocale.total.replace('${total}', totalNum.toString());

    return (
      <ul className={paginationCls} style={style}>
          {showTotal ? (
            <span className={`${prefixCls}-total`}>{totalToken}</span>
          ) : null}
          {renderPrevBtn()}
          {renderPageList()}
          {renderNextBtn()}
      </ul>
    );
}

export default Button;
