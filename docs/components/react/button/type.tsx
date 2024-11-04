import React from 'react';
import { Button } from '@snow-design/components';

const ButtonType = () => {
    return (
        <div className="flex-box">
            <Button>你好</Button>
            <Button type="primary">你好</Button>
            <Button type="warning">你好</Button>
            <Button type="danger">你好</Button>
        </div>
    );
};

export default ButtonType;
