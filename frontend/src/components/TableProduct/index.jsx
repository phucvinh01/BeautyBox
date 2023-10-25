import React from 'react';
import { Button, Modal, Space, Table, Tag } from 'antd';
import { useSelector } from 'react-redux';
import { EditOutlined, EyeOutlined, StopOutlined } from '@ant-design/icons'
import ModalEdit from '../ModelEdit';
import ModalDetail from '../ModalDetail';
import { deleteProduct } from '../../axios/ProductRequest';
import ModalEditProduct from '../ModalEditProduct';
import formatCurrency from '../../util/formatCurrency';
import PopconfirmDelPro from '../PopconfirmDelPro';




const TableProduct = () => {

    const data = useSelector((state) => state.product.products.data);

    const columns = [
        {
            title: 'Hình ảnh',
            dataIndex: 'img',
            key: 'img',
            render: (img) => (
                <img src={ img } width={ 60 } />
            ),
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (
                <Space direction='vertical' size="small">
                    <strong>{ record.name }</strong>
                    <p>SKU: <small className='text-danger'>{ record._id.match(/[0-9]+/g).join("") }</small></p>
                </Space>
            ),
        },
        {
            title: 'Số lượng',
            dataIndex: 'in_stock',
            key: 'in_stock',
            sorter: (a, b) => a.in_stock - b.in_stock,
        },
        {
            title: 'Giá nhập',
            dataIndex: 'priceIn',
            key: 'priceIn',
            render: (priceIn) => (
                <span>{ formatCurrency.format(priceIn) }</span>
            ),
        },
        {
            title: 'Giá bán',
            dataIndex: 'priceSale',
            key: 'priceSale',
            render: (priceSale) => (
                <span>{ formatCurrency.format(priceSale) }</span>
            ),
        },
        {
            title: 'Nhà phân phối',
            dataIndex: 'distributor',
            key: 'distributor',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span>{ status ? "Đang được đăng bán" : "Đã ấn" }</span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="small">
                    <ModalEditProduct state={ record } />
                    <ModalDetail state={ record } isAdmin={ true } />
                    <PopconfirmDelPro _id={ record._id } />
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table columns={ columns } dataSource={ data } />
        </>

    )
}
export default TableProduct;
