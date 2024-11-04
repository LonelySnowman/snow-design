import React from 'react';
import { Pagination } from '@snow-design/components';

const Base = () => {
    return (
        <div className="snow-flex">
            <Pagination
                showTotal
                total={20}
                pageSize={2}
                onChange={(page, pageSize) => {
                    alert(`Page Change: ${page}, Page Size: ${pageSize}`);
                }}
            />
        </div>
    );
};

export default Base;
