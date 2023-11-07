import React from 'react';
import { Button, message, Popconfirm } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
const confirm = (e) => {
    console.log(e);
    message.success('Click on Yes');
};
const ConfirmStatusOrder = () => (
    <Popconfirm
        title="Xác nhận đơn hàng"
        description="Xác nhận đơn hàng sẽ được chuẩn bị và gữi đi"
        onConfirm={ confirm }
        okText="Yes"
        cancelText="No"
    >
        <Button icon={ <CheckCircleFilled /> }></Button>
    </Popconfirm>
);
export default ConfirmStatusOrder;