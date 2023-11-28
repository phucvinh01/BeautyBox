import React, { useEffect, useState } from 'react';
import { Button, Modal, Space, Table, Tag } from 'antd';
import { useSelector } from 'react-redux';
import { ArrowUpOutlined, DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, StopOutlined } from '@ant-design/icons'
import ModalEdit from '../ModelEdit';
import ModalDetail from '../ModalDetail';
import { deleteProduct } from '../../axios/ProductRequest';
import ModalEditProduct from '../ModalEditProduct';
import formatCurrency from '../../util/formatCurrency';
import PopconfirmDelPro from '../PopconfirmDelPro';
import ModalDiscount from '../ModalDiscount';
import PopupDeleteProduct from '../PopupDeleteProduct';




const TableProduct = (props) => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [products, setProducts] = useState([]);

    const { dataFilter } = props
    const data = useSelector((state) => state.product.products.data);

    useEffect(() => {
        setProducts(dataFilter ? dataFilter : data);
        setFilteredProducts(products.filter(product => !product.isDelete));
    }, [dataFilter, data]);

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
            render: (in_stock) => (
                +in_stock <= 50 ? <span className='text-danger animate__animated animate__flash'>{ in_stock }</span> : <span className='text-dark'>{ in_stock }</span>
            ),
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
            title: 'Giá bán khuyết mãi',
            dataIndex: 'price',
            key: 'price',
            render: (price) => (
                <span>{ formatCurrency.format(price) }</span>
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
                <Space direction='vertical'>
                    <Space size="small">
                        <ModalDetail state={ record } isAdmin={ true } />
                        <ModalEditProduct state={ record } />
                        <Button title='Thêm số lượng sản phẩm' icon={ <PlusOutlined /> }></Button>
                    </Space>
                    <Space size="small">
                        <PopupDeleteProduct _id={ record._id } />
                        <PopconfirmDelPro _id={ record._id } status={ record.status } />
                        <ModalDiscount state={ record } />
                    </Space>
                </Space>

            ),
        },
    ];

    return (
        <>
            <Table columns={ columns } dataSource={ filteredProducts } />
        </>

    )
}
export default TableProduct;
