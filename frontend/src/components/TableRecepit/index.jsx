import { Space, Table } from 'antd';
import React from 'react'

const TableRecepit = (props) => {

    const { data } = props

    const columns = [
        {
            title: 'Hình ảnh',
            dataIndex: 'productId',
            key: 'productId',
            render: (productId) => (
                <img src={ productId.img } width={ 60 } />
            ),
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'productId',
            key: 'productId',
            render: (productId) => (
                <Space direction='vertical' size="small">
                    <strong>{ productId.name }</strong>
                    <p>SKU: <small className='text-danger'>{ productId._id.match(/[0-9]+/g).join("") }</small></p>
                </Space>
            ),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            sorter: (a, b) => a.quantity - b.quantity,
            render: (quantity) => (
                <span className='text-danger animate__animated animate__flash'>{ quantity }</span>
            ),
        },
        {
            title: 'Ngày nhập',
            dataIndex: 'date',
            key: 'date',
            render: (date) => (
                <strong>{ date }</strong>
            )
        },
        {
            title: 'Người nhập',
            dataIndex: 'employeeId',
            key: 'employeeId',
            render: (employeeId) => (
                <strong>{ employeeId.name }</strong>
            ),
        },
    ];

    return (
        <div><Table columns={ columns } dataSource={ data } /></div>
    )
}

export default TableRecepit