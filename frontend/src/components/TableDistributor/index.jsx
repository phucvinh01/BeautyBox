import React from 'react';
import { Button, Space, Table, Tag } from 'antd';
import { useSelector } from 'react-redux';
import { EyeOutlined, FundViewOutlined, StopFilled } from '@ant-design/icons';
const columns = [
    {
        title: 'Tên nhà phân phối',
        dataIndex: 'name',
        key: 'name',
        render: (name) => <a>{ name }</a>,
    },
    {
        title: 'Người đại diện',
        dataIndex: 'contactPerson',
        key: 'contactPerson',
    },
    {
        title: 'Hot-line',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Trạng thái',
        key: 'isActive',
        dataIndex: 'isActive',
        render: (isActive) => <span>{ isActive ? "Đang hợp tác " : "Đã ngừng hợp tác" }</span>,
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="small">
                <Button title='Ngưng hợp tác' icon={ <StopFilled /> } />
                <Button title="Xem các sản phẩm" icon={ <EyeOutlined /> } />
            </Space>
        ),
    },
];




const TableDistributor = () => {
    const data = useSelector((state) => state.distributor.distributor.data);

    return (
        <Table columns={ columns } dataSource={ data } />
    )
}
export default TableDistributor;