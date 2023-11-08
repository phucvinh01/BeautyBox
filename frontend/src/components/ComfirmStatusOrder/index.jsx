import React from 'react';
import { Button, message, Popconfirm } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { putConfirmOrder } from '../../axios/OrderRequest';
import { getOrder } from '../../redux/api';
import { useDispatch } from 'react-redux';

const ConfirmStatusOrder = (props) => {

    const dispatch = useDispatch()
    const confirm = async (e) => {
        let r = await putConfirmOrder(e)
        if (r.success) {
            message.success("Đã gữi mail đến cho khách hàng")
            getOrder(dispatch)
        }
        else {
            message.error("Xác nhận thất bại")
        }
    };

    return (
        <Popconfirm
            title="Xác nhận đơn hàng"
            description="Xác nhận đơn hàng sẽ được chuẩn bị và gữi đi"
            onConfirm={ () => confirm(props.id) }
            okText="Yes"
            cancelText="No"
        >
            <Button icon={ <CheckCircleFilled /> }></Button>
        </Popconfirm>
    )



};
export default ConfirmStatusOrder;