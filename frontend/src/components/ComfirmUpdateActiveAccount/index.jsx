import React from 'react';
import { Button, message, Popconfirm } from 'antd';
import { BlockOutlined, StopOutlined } from '@ant-design/icons';
import { postEditActiveEmp } from '../../axios/EmpRequest';
import { useDispatch } from 'react-redux';
import { getDataEmp } from '../../redux/api';

const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
};
const ComfirmUpdateActiveAccount = (props) => {
    const dispatch = useDispatch()

    const confirm = async (e) => {
        let body = {
            active: false
        }
        const r = await postEditActiveEmp(e, body)
        if (r.success) {
            message.info('Block tài khoản nhân viên thành công');
            getDataEmp(dispatch)
        }
        else {
            message.error("Block tài khoản nhân viên thất bại")
        }
    };

    const { id } = props
    return (
        <>
            <Popconfirm
                title="Block tài khoản nhân viên"
                description="Bạn có chắc chắn?"
                onConfirm={ () => confirm(id) }
                onCancel={ cancel }
                okText="Yes"
                cancelText="No"
            >
                <Button danger icon={ <StopOutlined /> }></Button>
            </Popconfirm>
        </>
    )
};
export default ComfirmUpdateActiveAccount;