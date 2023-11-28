import React from 'react';
import { Button, message, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../axios/ProductRequest';
import { getProductList } from '../../redux/api';
const PopupDeleteProduct = (props) => {
    const dispatch = useDispatch()
    const confirm = async () => {
        let r = await deleteProduct(_id)
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
        <Popconfirm
            title={ "Xóa sản phẩm" }
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
                <Button danger title='Xóa sản phẩm' icon={ <DeleteOutlined /> }></Button>
            }

        </Popconfirm>
    );
}
export default PopupDeleteProduct;