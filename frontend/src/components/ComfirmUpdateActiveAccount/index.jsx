import React from 'react';
import { Button, message, Popconfirm } from 'antd';
import { BlockOutlined, PoweroffOutlined, ReloadOutlined, StopOutlined } from '@ant-design/icons';
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
            isActive: !isActive
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

    const { id, isActive } = props
    return (
        <>{
            isActive ?
                <Popconfirm
                    title="Block tài khoản nhân viên"
                    description="Bạn có chắc chắn?"
                    onConfirm={ () => confirm(id) }
                    onCancel={ cancel }
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger icon={ <PoweroffOutlined /> }></Button>
                </Popconfirm> : <Popconfirm
                    title="Mở khóa tài khoản nhân viên"
                    description="Bạn có chắc chắn?"
                    onConfirm={ () => confirm(id) }
                    onCancel={ cancel }
                    okText="Yes"
                    cancelText="No"
                >
                    <Button icon={ <ReloadOutlined /> }></Button>
                </Popconfirm>

        }
        </>
    )
};
export default ComfirmUpdateActiveAccount;