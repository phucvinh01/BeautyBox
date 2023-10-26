import React from 'react';
import { Button, Popconfirm, message } from 'antd';
import { ArrowUpOutlined, StopOutlined } from '@ant-design/icons';
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

    const { _id, status } = props

    return (
        <>
            <Popconfirm
                title={ status ? "Ngưng đăng bán sản phẩm" : "Đăng bán sản phẩm" }
                description={ _id?.match(/[0-9]+/g).join("") }
                okText="Yes"
                cancelText="No"
                onConfirm={ confirm }
                okButtonProps={ {
                    style: {
                        backgroundColor: "red"
                    },
                } }
            >{
                    status ? <Button danger title='Ẩn sản phẩm trên trang khách hàng' icon={ <StopOutlined /> }></Button>
                        : <Button title='Đăng bán sản phẩm' icon={ <ArrowUpOutlined /> }></Button>
                }

            </Popconfirm>
        </>
    )

};
export default PopconfirmDelPro;