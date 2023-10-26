import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import moment from 'moment'
import formatCurrency from '../../util/formatCurrency';
import Axios from '../../axios/Axios'
import ModalDetailOrder from '../ModalDetailOrder/ModalDetailOrder';
import { CheckCircleFilled, CloseOutlined } from '@ant-design/icons';


const TableOrder = (prop) => {

    const [userList, setUserList] = useState([])

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        let r = await Axios.get('/v1/user/')
        if (r.status) {
            setUserList(r.data)
        }
    }

    const filterNameUserById = (id) => {
        let user = userList.find(element => element._id === id);
        return user ? user.email : null;
    }


    const { data } = prop

    console.log(moment().format('YYYY-MM-DD'));

    const rowClassName = (record) => {
        return record.createdAt === moment().format('YYYY-MM-DD') ? 'highlight-row' : '';
    };

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: '_id',
            render: (_id) => (
                <>
                    <span>{ _id.match(/[0-9]+/g).join("") }</span>
                </>
            )
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'createdAt',
            defaultSortOrder: 'descend',
            sorter: (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
            render: (_, { createdAt }) => (
                <>
                    { <span>{ moment(createdAt).format('YYYY-MM-DD') }</span> }
                </>
            )
        },
        {
            title: 'Người đặt',
            dataIndex: 'userId',
            render: (userId) => (
                <>
                    <span>{ filterNameUserById(userId) }</span>
                </>
            )
        },
        {
            title: 'Trị giá',
            dataIndex: 'totalPrice',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.totalPrice - b.totalPrice,
            render: (_, { totalPrice }) => (
                <>
                    { <p className='text-danger text-end'>{ formatCurrency.format(totalPrice) }</p> }
                </>
            )
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (_, { status }) => (
                <>
                    { status === 1 ? <span>Chờ xác nhận</span> : <span>Đang giao hàng</span> }
                </>
            )
        },
        {
            title: 'Xem chi tiết',
            key: 'action',
            render: (_, record) => (
                <ModalDetailOrder state={ record } />
            ),
        },
        {
            title: 'action',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button title='Check đã xác nhận đơn hàng' icon={ <CheckCircleFilled /> } />
                    <Button title='Hủy đơn hàng' icon={ <CloseOutlined /> } />
                </Space>
            ),
        },
    ];
    return (
        <Table rowClassName={ rowClassName } columns={ columns } dataSource={ data } />
    )
}
export default TableOrder;