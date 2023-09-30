import { Modal, Radio, Rate, Spin } from 'antd'
import React, { useState } from 'react'
import './modaldetai.scss'
import _ from 'lodash';
import formatCurrency from '../../util/formatCurrency'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getCart } from '../../redux/api';
import { toast } from 'react-toastify';

const ModalDetail = (props) => {
    const dispatch = useDispatch()

    const [quantity, setQuantity] = useState(1);
    const user = useSelector((state) => state.auth.login.currentUser);
    const loading = useSelector((state) => state.cart.cart.isLoading);
    const error = useSelector((state) => state.cart.cart.error);
    const { open, handleOk, onCancel, state } = props

    if (open)
        console.log(user);

    const handleAddToCart = () => {
        addToCart(state?._id, user?._id, quantity, dispatch)
        if (!error) {
            toast.success("Thêm vào giỏ hàng thành công")
        }
        onCancel();
    }

    const sumRating = _.sumBy(props.reviews && props.reviews, 'rating');
    const avg = _.round(sumRating / (props.reviews && props.reviews.length));

    return (
        <>
            <Modal open={ open } onOk={ handleOk } onCancel={ onCancel } className='modal-detail' footer={ false }>
                <div className='row p-2'>
                    <div className='col-4'>
                        <img className='w-100' src={ state.img } alt='>state'></img>
                    </div>
                    <div className='col-8'>
                        <p className='text-danger fs-16'>{ state.brand }</p>
                        <p className='fs-20'>{ state.name }</p>
                        <Rate value={ avg } disabled className='fs-14' />
                        <p className='fs-18 mb-3'>{ formatCurrency.format(state.price) }</p>
                        <div className='detal-order__method mb-3 fs-14'>
                            <h6>Hình thức mua hàng</h6>
                            <Radio checked>Giao hàng</Radio>
                        </div>
                        <div className='d-flex mb-3 gap-3'>
                            <div className='input-quantity'>
                                <button className='btn' onClick={ () => setQuantity(quantity + 1) }><i className="fa-solid fa-plus"></i></button>
                                <input type='number' value={ quantity } disabled={ true } min={ 1 }></input>
                                <button className='btn' disabled={ quantity > 1 ? false : true } onClick={ () => setQuantity(quantity - 1) }><i className="fa-solid fa-minus"></i></button>
                            </div>
                            <div>
                                {
                                    user ? <button className='btn btn-dark p-2 mt-1' onClick={ handleAddToCart }>
                                        {
                                            !loading ? <><i className="fa-solid fa-cart-plus mx-1"></i>
                                                <span>Thêm vào giỏ hàng</span></> : <Spin />
                                        }

                                    </button> : <p className='p-2 mt-1'>Hãy đăng nhập để thêm vào giỏ hàng</p>
                                }

                            </div>
                        </div>
                        <a className='text-dark mx-auto'  >Xem chi tiết sản phẩm</a>
                    </div>
                </div>
            </Modal>

        </>
    )
}

export default ModalDetail