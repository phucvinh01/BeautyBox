import React from 'react';
import { Button, message, Popconfirm } from 'antd';
import { ArrowUpOutlined, DeleteOutlined, StopOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../axios/ProductRequest';
import { getDataListDistributor, getProductList } from '../../redux/api';
import { deleteDistributor } from '../../axios/DistributorRequest';
const PopupUpdateSttDitributor = (props) => {
    const dispatch = useDispatch()
    const confirm = async () => {
        let r = await deleteDistributor(_id)
        if (r.status) {
            message.success('Cập nhật trạng thái thành công');
            getDataListDistributor(dispatch)
        }
        else {
            message.error('Cập nhật trạng thái thất bại');
        }
    };

    const { _id, status } = props
    return (
        <Popconfirm
            title={ status ? "Ngưng hợp tác với nhà phân phối" : "Hợp tác lại" }
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
                status ? <Button danger title='Ngưng hợp tác với nhà phân phối' icon={ <StopOutlined /> }></Button>
                    : <Button title='Hợp tác lại' icon={ <ArrowUpOutlined /> }></Button>
            }

        </Popconfirm>
    );
}
export default PopupUpdateSttDitributor;