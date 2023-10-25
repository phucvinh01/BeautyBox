import React from 'react';
import { Button, Popconfirm, message } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import { putUpdateStatus } from '../../axios/ProductRequest';
import { getProductList } from '../../redux/api';
import { useDispatch } from 'react-redux';
const PopconfirmDelPro = (props) => {

    const dispatch = useDispatch()
    const confirm = async () => {
        let r = await putUpdateStatus(_id)
        if (r.status) {
            message.success('Cập nhật trạng thái thành công');
            getProductList(dispatch)
        }
        else {
            message.error('Cập nhật trạng thái thất bại');
        }
    };

    const { _id } = props

    return (
        <>
            <Popconfirm
                title="Ngưng đăng bán sẩn phẩm"
                description={ _id?.match(/[0-9]+/g).join("") }
                okText="Yes"
                cancelText="No"
                onConfirm={ confirm }
                okButtonProps={ {
                    style: {
                        backgroundColor: "red"
                    },
                } }
            >
                <Button danger title='Ẩn sản phẩm trên trang khách hàng' icon={ <StopOutlined /> }></Button>
            </Popconfirm>
        </>
    )

};
export default PopconfirmDelPro;