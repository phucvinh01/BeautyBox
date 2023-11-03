import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, message } from 'antd';
import { getSaleEachProduct } from '../../axios/SaleRequest';
import formatCurrency from '../../util/formatCurrency';
const columns = [
    {
        title: 'Hình ảnh',
        dataIndex: 'productImg',
        key: 'productImg',
        render: (productImg) => (
            <img src={ productImg } width={ 60 } />
        ),
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'productName',
        key: 'productName',
        render: (_, record) => (
            <Space direction='vertical' size="small">
                <strong>{ record.productName }</strong>
                <p>SKU: <small className='text-danger'>{ record._id.match(/[0-9]+/g).join("") }</small></p>
            </Space>
        ),
    },
    {
        title: 'Số lượng',
        dataIndex: 'totalQuantity',
        key: 'totalQuantity',
        sorter: (a, b) => a.totalQuantity - b.totalQuantity,
    },
    {
        title: 'Doanh thu',
        dataIndex: 'totalSale',
        key: 'totalSale',
        sorter: (a, b) => a.totalSale - b.totalSale,
        render: (totalSale) => (
            <span>{ formatCurrency.format(totalSale) }</span>
        ),
    },
];

const TableStatitisProduct = (props) => {

    const { data } = props

    return (
        <>
            <Table columns={ columns } dataSource={ data && data } />
        </>
    )
};
export default TableStatitisProduct;