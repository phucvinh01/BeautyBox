import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import TableProduct from '../TableProduct';
const ModalProductDistributor = (props) => {

    const { name } = props
    const data = useSelector((state) => state.product.products.data);



    const filterDistributor = data.filter(item => item.distributor === name)


    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button title="Xem các sản phẩm" icon={ <EyeOutlined /> } onClick={ showModal } />
            <Modal centered width={ 1200 } title="Danh sách sản phẩm của nhà cung cấp" open={ isModalOpen } onOk={ handleOk } onCancel={ handleCancel }>
                <TableProduct dataFilter={ filterDistributor } />
            </Modal>
        </>
    );
};
export default ModalProductDistributor;