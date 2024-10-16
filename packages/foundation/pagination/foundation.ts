import { numbers } from './constants';

export interface PaginationAdapter {
    setPageList: (pageListState: PageRenderText[]) => void;
    setDisabled: (prevIsDisabled: boolean, nextIsDisabled: boolean) => void;
    setCurrentPage: (pageIndex: number) => void;
    notifyChange: (pageIndex: number, pageSize: number) => void;
    getStates: () => {
        currentPage: number;
        total: number;
        pageSize: number;
    };
    getProps: () => any;
}

export type PageRenderText = number | '...';
export type PageList = PageRenderText[];

const usePaginationFoundation = (adapter: PaginationAdapter) => {
    const isControlComponent = adapter.getProps().currentPage !== undefined;

    // 获取总页数
    const getTotalPageNumber = (total: number, pageSize: number) => {
        const totalPageNum = Math.ceil(total / pageSize);
        return totalPageNum;
    };

    // 获取禁用状态
    const updateDisabled = (pageInfo: { currentPage: number; total: number; pageSize: number }) => {
        const { currentPage, total, pageSize } = pageInfo;
        const totalPageNum = getTotalPageNumber(total, pageSize);
        let prevIsDisabled = false;
        let nextIsDisabled = false;
        if (currentPage === 1) {
            prevIsDisabled = true;
            nextIsDisabled = totalPageNum < 2;
        } else if (currentPage === totalPageNum) {
            prevIsDisabled = false;
            nextIsDisabled = true;
        }
        adapter.setDisabled(prevIsDisabled, nextIsDisabled);
    };

    // 更新 page 渲染列
    const updatePageList = (pageListInfo: { currentPage: number; total: number; pageSize: number }) => {
        const { currentPage, total, pageSize } = pageListInfo;
        let pageList: PageList = [];
        /** Pager truncation logic (t is the total number of pages, c is the current page):
     - No need to truncate when t<=7 pages
     - When t>7
     - When c<4, the fourth is a truncation symbol (...)
     - When c=4, the sixth is the truncation symbol (...)
     - When 4<c<t-3, the second and sixth are truncation symbols (...)
     - When t-3<=c<=t, the second is the truncation symbol (...), followed by the 5th from the bottom-the 1st from the bottom
     Truncation character + number, the total number is 7

     分页器截断逻辑（t为总页数，c为当前页）：
     - t<=7 页的时候不需要截断
     - 当 t>7 时
     - 当 c<4 时，第4个为截断符号（...）
     - 当 c=4 时，第6个为截断符号（...）
     - 当 4<c<t-3 时，第2个与第6个为截断符号（...）
     - 当 t-3<=c<=t 时，第 2 个为截断符号（...），后面为倒数第5个-倒数第1个
     截断符+数字 总共个数为7个
     */
        const totalPageNum = getTotalPageNumber(total, pageSize);
        const { PAGE_SHOW_MAX } = numbers;
        if (totalPageNum <= PAGE_SHOW_MAX) {
            pageList = Array.from({ length: totalPageNum }, (_v, i) => i + 1);
        } else {
            switch (true) {
                case currentPage < 4:
                    pageList = [1, 2, 3, 4, '...', totalPageNum - 1, totalPageNum];
                    break;
                case currentPage === 4:
                    pageList = [1, 2, 3, 4, 5, '...', totalPageNum];
                    break;
                case 4 < currentPage && currentPage < totalPageNum - 3:
                    const middle = Array.from({ length: 3 }, (_v, i) => currentPage + (i - 1));
                    pageList = ([1] as PageList).concat('...', middle, '...', totalPageNum);
                    break;
                case currentPage - 3 <= currentPage && currentPage <= totalPageNum:
                    const right = Array.from({ length: 5 }, (_v, i) => totalPageNum - (4 - i));
                    pageList = [1, '...' as const].concat(right);
                    break;
                default:
                    break;
            }
        }
        adapter.setPageList(pageList);
    };

    // 更新当前页
    const updatePage = (targetPageIndex = 1, total?: number, pageSize?: number) => {
        if (total === null || typeof total === 'undefined') total = adapter.getStates().total;
        if (pageSize === null || typeof pageSize === 'undefined') pageSize = adapter.getStates().pageSize;
        updateDisabled({ currentPage: targetPageIndex, total, pageSize });
        updatePageList({ currentPage: targetPageIndex, total, pageSize });
        adapter.setCurrentPage(targetPageIndex);
    };

    // 跳转至对应 page
    const goPage = (targetPageIndex: number | '...', update = true) => {
        const { currentPage, pageSize } = adapter.getStates();
        if (targetPageIndex === '...') return;
        if (targetPageIndex === currentPage && !isControlComponent) return;
        adapter.notifyChange(targetPageIndex, pageSize);
        if (update) updatePage(targetPageIndex);
    };

    return {
        init() {
            const { currentPage, total, pageSize } = adapter.getStates();
            updateDisabled({ currentPage, total, pageSize });
            updatePageList({ currentPage, total, pageSize });
        },
        goNext() {
            const { currentPage, total, pageSize } = adapter.getStates();
            const totalPageNum = getTotalPageNumber(total, pageSize);
            if (currentPage <= totalPageNum - 1) goPage(currentPage + 1, !isControlComponent);
        },
        goPrev() {
            const { currentPage } = adapter.getStates();
            if (currentPage > 1) goPage(currentPage - 1, !isControlComponent);
        },
        goPage,
    };
};

export default usePaginationFoundation;
