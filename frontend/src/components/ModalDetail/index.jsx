import { Button, Modal, Radio, Rate, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import './modaldetai.scss'
import _ from 'lodash';
import formatCurrency from '../../util/formatCurrency'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getCart, getReview } from '../../redux/api';
import { EyeFilled, FastBackwardFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getReviewByProductId } from '../../axios/ReviewRequest';

const ModalDetail = (props) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);

    const [quantity, setQuantity] = useState(1);
    const user = useSelector((state) => state.auth.login.currentUser);
    const reivews = useSelector((state) => state.review.review.data);

    const { state, isAdmin } = props

    useEffect(() => {
        if (open) {
            getReview(dispatch, state._id)
            console.log(state.discount?.number);
        }
    }, [open, dispatch, state._id])

    const handleOk = () => {
        setOpen(false)
    }

    const onCancel = () => {
        setOpen(false)
    }

    const handleShow = () => {
        setOpen(true)
    }

    const handleAddToCart = () => {
        addToCart(state?._id, user?._id, quantity, dispatch)
        getCart(user?._id, dispatch)
        onCancel();
    }

    const sumRating = _.sumBy(reivews && reivews, 'rating');
    const avg = _.round(sumRating / (reivews && reivews?.length));

    return (
        <>
            <Button title='Xem chi tiết sản phẩm' icon={ isAdmin && <EyeFilled /> } onClick={ handleShow } className='btn-quick'>{ isAdmin ? "" : "Xem nhanh" }</Button>
            <Modal width={ 1000 } centered open={ open } onOk={ handleOk } onCancel={ onCancel } className='modal-detail' footer={ false }>
                <div className='row p-2'>
                    <div className='col-lg-4 col-md-12 col-sm-12'>
                        <img className='w-100' src={ state.img } alt='>state'></img>
                    </div>
                    <div className='col-lg-8 col-md-12 col-sm-12'>
                        <Space direction='vertical'>
                            <p className='text-danger fs-16'>{ state.brand }</p>
                            <p className='fs-20'>{ state.name }</p>
                            <Space size={ "large" }>
                                <div className='d-flex justify-content-center align-items-center gap-2'>
                                    <Rate
                                        disabled
                                        value={ avg ? avg : 0 }
                                    />
                                    <p>({ reivews && reivews?.length })</p>
                                </div>                               <p><strong>Xuất xứ:</strong> { state.origin }</p>
                                <p><strong>SKU: </strong>{ state?._id?.match(/[0-9]+/g).join("") }</p>
                            </Space>
                            {
                                state.discount?.number > 0 ?
                                    (
                                        <Space size={ "large" } align='center' >
                                            <p className='fs-20 fw-bolder'>{ formatCurrency.format(state.price) }</p>
                                            <p className='fs-18 text-muted' style={ { textDecorationLine: "line-through" } }>{ formatCurrency.format(state.priceSale) }</p>
                                            <div className='tag'>{ state.discount?.number }%</div>
                                        </Space>
                                    )
                                    :
                                    (
                                        <p className='fs-20 fw-bolder'>{ formatCurrency.format(state.priceSale) }</p>
                                    )

                            }
                            <div className='detal-order__method mb-3 fs-14'>
                                <h6>Hình thức mua hàng</h6>
                                <Radio checked>Giao hàng</Radio>
                            </div>
                            <div className='d-flex mb-3 gap-3'>
                                <div className='input-quantity'>
                                    <button className='btn' onClick={ () => setQuantity(quantity + 1) }><i className="fa-solid fa-plus"></i></button>
                                    <input type='number' value={ quantity } disabled={ true } min={ 1 } max={ state.in_stock }></input>
                                    <button className='btn' disabled={ quantity > 1 ? false : true } onClick={ () => setQuantity(quantity - 1) }><i className="fa-solid fa-minus"></i></button>
                                </div>
                                <div>
                                    {
                                        user ? <button hidden={ isAdmin && isAdmin } button className='btn btn-dark p-2 mt-1' onClick={ handleAddToCart }>
                                            <i className="fa-solid fa-cart-plus mx-1"></i>
                                            <span>Thêm vào giỏ hàng</span>
                                        </button> : <p className='p-2 mt-1'>Hãy đăng nhập để thêm vào giỏ hàng</p>
                                    }
                                </div>
                            </div>
                            <Link to={ `/product/${state.slug}` } className='text-dark mx-auto'   >Xem chi tiết sản phẩm</Link>
                        </Space>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ModalDetail