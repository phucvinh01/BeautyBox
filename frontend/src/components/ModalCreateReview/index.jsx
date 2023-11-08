import React, { useState } from 'react';
import { Button, Divider, Modal, Rate, Space, Switch, message } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import './review.scss'
import { useDispatch, useSelector } from 'react-redux';
import { postCreateReview } from '../../axios/ReviewRequest';
import { getReview } from '../../redux/api';
const ModalCreateReview = (props) => {

    const { products } = props
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch()
    const handleCreateReview = async () => {
        const body = {
            productId: products._id,
            username: user.email,
            rating: rating,
            reviewText: textReview
        }

        const r = await postCreateReview(body)
        if (r.success) {
            message.success("Cảm ơn bạn đã nhận xét")
            getReview(dispatch, products._id)
            handleCancel();
        }
        else {
            message.error("Thêm đánh giá thất bại")
            return
        }
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(0)
    const [textReview, setTextReview] = useState("")
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
            <Button type="text" onClick={ showModal }>
                <p style={ { textDecorationLine: "underline" } }>VIẾT ĐÁNH GIÁ</p>
            </Button>
            <Modal footer={ null } className='reivews' centered title="Viết đánh giá" open={ isModalOpen } onOk={ handleOk } onCancel={ handleCancel }>
                <div className='d-flex align-items-center border rounded-3'>
                    <img src={ products.img } alt={ products.img } width={ 80 } />
                    <div>
                        <p><strong>{ products.brand }</strong></p>
                        <p>{ products.name }</p>
                    </div>
                </div>
                <Divider />
                <Space direction='vertical'>
                    <Space direction='vertical'>
                        <p>Bạn sẽ giới thiệu sản phẩm này chứ</p>
                        <Switch
                            checkedChildren={ <CheckOutlined /> }
                            unCheckedChildren={ <CloseOutlined /> }
                            defaultChecked
                        />
                    </Space>
                    <Space direction='vertical'>
                        <p>Đánh giá chung (<span className='text-danger'>*</span>)</p>
                        <Rate onChange={ setRating } className='rate' value={ rating } />
                    </Space>
                </Space>
                <Divider />

                <div>
                    <p>Lời đánh giá</p>
                    <textarea value={ textReview } className='form-control' onChange={ (e) => setTextReview(e.target.value) } />
                </div>
                <div className='mt-4 d-flex justify-content-center'>
                    {
                        user ? <Button onClick={ handleCreateReview } className='btn-primary-main'>Gữi cho chúng tôi</Button> : <Button disabled className='btn-primary-main'>Yêu cầu đăng nhập</Button>
                    }
                </div>
            </Modal>
        </>
    );
};
export default ModalCreateReview;