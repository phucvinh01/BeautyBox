import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, InputNumber, Modal, Select, Space, message } from 'antd';
import { PercentageOutlined } from '@ant-design/icons';
import formatCurrency from '../../util/formatCurrency';
import { putUpdateDiscount } from '../../axios/ProductRequest';
import { getProductList } from '../../redux/api';
import { useDispatch } from 'react-redux';
import './ModalDiscount.scss'
import moment from 'moment'
const ModalDiscount = (props) => {

    const { state } = props
    const dispatch = useDispatch()
    const timeBeginRef = useRef()
    const timeEndRef = useRef()
    const inputNumberRef = useRef()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [discount, setDiscount] = useState(0)
    const [timeBegin, setTimeBegin] = useState("")
    const [timeEnd, setTimeEnd] = useState("")
    const [priceDiscout, setPriceDiscount] = useState(0)
    const [pirceSale, setPriceSale] = useState(0)
    const [priceIn, setPriceIn] = useState(0)
    const [disabled, setDisable] = useState(false)

    useEffect(() => {
        if (isModalOpen) {
            setPriceDiscount(state.price)
            setDiscount(state.discount.number)
            setPriceSale(state.priceSale)
            setPriceIn(state.priceIn)
            setTimeBegin(moment(state.discount?.timeBegin).format('YYYY-MM-DDTHH:mm'))
            setTimeEnd(moment(state.discount?.timeEnd).format('YYYY-MM-DDTHH:mm'))
        }



    }, [isModalOpen])




    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {

        if (moment(timeBegin) < moment()) {
            timeBeginRef.current.focus();
            timeBeginRef.current.style.borderColor = 'red';
            return
        }

        if (moment(timeBegin) > moment(timeEnd)) {
            timeEndRef.current.focus();
            timeEndRef.current.style.borderColor = 'red';
            return
        }

        let body = {
            "price": priceDiscout,
            "discount": {
                "number": discount,
                "timeBegin": timeBegin,
                "timeEnd": timeEnd
            }
        }

        let r = await putUpdateDiscount(state._id, body)
        if (r.status) {
            message.success('Cập nhật giảm giá thành công');
            getProductList(dispatch)
        }
        else {
            message.error('Cập nhật giảm giá thất bại');
        }

        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChange = (value) => {
        setDiscount(value)
        setPriceDiscount(pirceSale - (pirceSale * (value / 100)))
        if (priceDiscout < priceIn) {
            message.error("Giá khuyến mãi phải lớn hơn giá nhập")
            setPriceDiscount(priceIn)
            inputNumberRef.current.max = discount
            return
        }
    }
    return (
        <>
            <Button style={ { backgroundColor: "black", color: "white" } } title='Cập nhập khuyết mãi' onClick={ showModal } icon={ <PercentageOutlined /> }>
            </Button>
            <Modal title="Discount" open={ isModalOpen } onOk={ handleOk } onCancel={ handleCancel }>
                <div className='row' >
                    <h4>Cập nhật giảm giá cho sản phẩm</h4>
                    <p>{ state.name }</p>
                    <div className='col-6' >
                        <Space direction='vertical'>
                            <img width={ 100 } src={ state.img } alt={ state.img }></img>
                            <span className='text-danger'>SKU: { state._id.match(/[0-9]+/g).join("") }</span>
                        </Space>
                        <Space direction='vertical'>
                            <p>Giá nhập: { formatCurrency.format(priceIn) }</p>
                            <p>Giá bán: { formatCurrency.format(pirceSale) }</p>
                            <p>Giá khuyến mãi: <input readOnly className='fs-5 border-0 input-readonly' value={ formatCurrency.format(priceDiscout) }></input></p>
                        </Space>
                    </div>
                    <div className='col-6'>
                        <div className='mb-3'>
                            <label>Khuyến mãi</label>
                            <InputNumber
                                ref={ inputNumberRef }
                                size='small'
                                className='form-control'
                                min={ 0 }
                                max={ 100 }
                                value={ discount }
                                formatter={ (value) => `${value}%` }
                                parser={ (value) => value.replace('%', '') }
                                onChange={ (value) => handleChange(value) }
                            />
                        </div>
                        <div className='mb-3'>
                            <label>Giờ bắt đầu</label>
                            <input ref={ timeBeginRef } value={ timeBegin } onChange={ (e) => { setTimeBegin(e.target.value), console.log(e.target.value) } } type='datetime-local' className='form-control' />
                        </div>
                        <div className='mb-3'>
                            <label>Giờ kết thúc</label>
                            <input ref={ timeEndRef } value={ timeEnd } onChange={ (e) => setTimeEnd(e.target.value) } type='datetime-local' className='form-control' />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default ModalDiscount;