import { EyeOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, { useState } from 'react'
import './ModalDetailORder.scss'
import formatCurrency from '../../util/formatCurrency'

const ModalDetailOrder = (props) => {

    const { state, isModalOpen, handleOk, handleCancel } = props
    if (isModalOpen) {
        console.log(state);

    }

    return (
        <>
            <Modal className='modal-detail-order' title={ <h2>Thông tin đơn hàng</h2> } open={ isModalOpen } onOk={ handleOk } onCancel={ handleCancel }>
                <div className='row'>
                    <div className='col-4'>
                        <section>
                            <h4>Thông tin vận chuyển</h4>
                            <p>Địa chỉ: { state.shippingInfor }</p>
                        </section>
                        <section>
                            <h4>Hình thức vận chuyển</h4>
                            {
                                state.methodShip === "GHTC" ? "Giao hàng tiêu chuẩn" : state.methodShip === "GH24H" ? "Giao hàng trong 24H" : "Giao hàng trong 2H"
                                //state.methodShip === "GHTC" && <p>Giao hàng tiêu chuẩn</p>
                            }

                        </section>

                    </div>
                    <div className='col-4'>
                        <section>
                            <h4>Hình thức thanh toán</h4>
                            <p>COD: Giao tiền khi nhận được hàng</p>
                        </section>
                        <section>
                            <h4>Tổng tiền</h4>
                            <p>{ formatCurrency.format(state.totalPrice) }</p>
                        </section>
                    </div>
                    <div className='col-4'>
                        <section>
                            <h4>Sản phẩm</h4>
                            {
                                state.cart?.items.map((item, index) => {
                                    return (
                                        <>
                                            <div className='d-flex gap-3 align-items-center' key={ index }>
                                                <img width={ 60 } src={ item.img } alt={ item.img }></img>
                                                <div className='d-gird'>
                                                    <p><strong>{ item.name }</strong></p>
                                                    <p><small>Số lượng:{ item.quantity }</small></p>
                                                </div>
                                            </div>
                                            <hr></hr>
                                        </>
                                    )
                                })
                            }
                        </section>
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default ModalDetailOrder;