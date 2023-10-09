import { Breadcrumb, Button, Card, Table } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getOrderByUser } from '../axios/OrderRequest'
import { useSelector } from 'react-redux'
import moment from 'moment'
import formatCurrency from '../util/formatCurrency'
import ModalDetailOrder from '../components/ModalDetailOrder/ModalDetailOrder'
const Order = () => {

    const [orders, setOrders] = useState([])
    const [state, setState] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false)
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const user = useSelector((state) => state.auth.login.currentUser);


    const getOrder = async (userId) => {
        let r = await getOrderByUser(userId);
        console.log(r);
        if (r.status) {
            setOrders(r.data)
        }
    }

    useEffect(() => {
        if (user) {
            getOrder(user?._id)
        }
    }, [])

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: '_id',
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'createdAt',
            defaultSortOrder: 'descend',
            sorter: (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
            render: (_, { createdAt }) => (
                <>
                    { <span>{ moment(createdAt).format('MM/DD/YYYY') }</span> }
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
                <Button key={ record._id } onClick={ () => { setState(record), showModal() } } type='text' block icon={ <EyeOutlined /> } />

                //<ModalDetailOrder state={ record } />
            ),
        },
    ];
    return (
        <>
            <div className='container  my-3'>
                <div className='row'>
                    <div className='col-4'>

                        <img className='w-100 rounded-3' height={ 400 } src='https://i.pinimg.com/564x/4f/34/d2/4f34d2dad8546b06aeb42f8e067ef733.jpg'>

                        </img>
                    </div>
                    <div className='col-8'>
                        <Breadcrumb className='mb-3'
                            items={ [
                                {
                                    title: <Link to={ '/' }>Trang chủ</Link>,
                                },
                                {
                                    title: <span>Lịch sử đặt hàng</span>,
                                },
                            ] }
                        />
                        <h2>Đơn hàng</h2>
                        <Table pagination={ false } dataSource={ orders } columns={ columns }></Table>

                    </div>
                </div>
            </div>
            <ModalDetailOrder state={ state } isModalOpen={ isModalOpen } handleOk={ handleOk } handleCancel={ handleOk } />

        </>
    )
}

export default Order