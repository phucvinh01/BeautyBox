import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './DrawerCart.scss'
import { Button, Drawer } from 'antd';
import { CloseOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import formatCurrency from '../../util/formatCurrency'
import { RemoveCartItem, addToCart, decreaseQuantity, getCart } from '../../redux/api';
import { toast } from 'react-toastify';
const DrawerCart = (props) => {
    const dispatch = useDispatch()
    const naviagte = useNavigate()
    const user = useSelector((state) => state.auth.login.currentUser);
    const cart = useSelector((state) => state.cart.cart.data);
    const [loading, setLoading] = useState(false)
    const error = useSelector((state) => state.cart.cart.error);
    const { onClose, open } = props

    const handleAddToCart = (ProductId) => {
        setLoading(true)
        addToCart(ProductId, user?._id, 1, dispatch)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    const handleDecrease = (ProductId) => {
        setLoading(true)
        decreaseQuantity(ProductId, user?._id, dispatch)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    const handleRemove = (ProductId) => {
        setLoading(true)
        RemoveCartItem(ProductId, user?._id, dispatch)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    const handleToCheckOut = () => {
        naviagte('checkout/' + user?._id)
    }


    const Footer = () => {
        return (
            <>
                <div className='dawer-cart__footer'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <p>Tổng</p>
                        {
                            cart?.items?.length > 0 ? <strong className='text-danger'>{ formatCurrency.format(cart.subTotal) }</strong> : <p>0</p>
                        }
                    </div>
                    <button className='btn w-100' onClick={ () => { onClose, naviagte('checkout/' + user?._id) } }>
                        Tiếp tục với hình hình thức mua hàng
                    </button>
                </div>
            </>
        )
    }

    return (
        <>
            <Drawer size='large' footer={ <Footer /> } placement="right" onClose={ onClose } open={ open } className='drawer-cart' zIndex={ 1040 } closeIcon={ false }>
                <div className='d-flex justify-content-between align-items-center'>
                    <p className='m-0'>Giỏ hàng của tôi</p>
                    <button className='btn ' onClick={ onClose }><span><CloseOutlined /></span></button>
                </div>
                <hr></hr>
                <div>
                    { cart && cart?.items?.length > 0 && cart.items.map((item, index) => {
                        return (
                            <>
                                <div className='row' key={ index }>
                                    <div className='col-2'>
                                        <img src={ item.img } className='rounded-1 w-100' alt={ item.img }></img>
                                    </div>
                                    <div className='col-9'>
                                        <small className='m-0 mt-3' style={ { height: 30 } }>{ item.name }</small>
                                        <div className='d-flex justify-content-between'>
                                            <div className='quantity-input'>
                                                <button disabled={ loading ? true : false } onClick={ () => { handleDecrease(item.productId) } }>-</button>
                                                <input disabled type='number' value={ item.quantity }></input>
                                                <button disabled={ loading ? true : false } onClick={ () => { handleAddToCart(item.productId) } }>+</button>
                                            </div>
                                            <strong className='text-end text-danger'>{ formatCurrency.format(item.price) }</strong>
                                        </div>
                                    </div>
                                    <div className='col-1'>
                                        <button className='btn-remove' onClick={ () => { handleRemove(item.productId) } }>-</button>
                                    </div>
                                </div>
                                <hr></hr>
                            </>
                        )
                    }) }
                </div>
            </Drawer>
        </>
    )
}

export default DrawerCart