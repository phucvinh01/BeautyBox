import React, { useEffect, useMemo, useState } from 'react';
import { Button, InputNumber, Modal, Select, Space, message } from 'antd';
import { PercentageOutlined } from '@ant-design/icons';
import formatCurrency from '../../util/formatCurrency';
import { putUpdateDiscount } from '../../axios/ProductRequest';
import { getProductList } from '../../redux/api';
import { useDispatch } from 'react-redux';
import './ModalDiscount.scss'
const ModalDiscount = (props) => {

    const { state } = props
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [discount, setDiscount] = useState(0)
    const [priceDiscout, setPriceDiscount] = useState(0)
    const [pirceSale, setPriceSale] = useState(0)

    useEffect(() => {
        if (isModalOpen) {
            setPriceDiscount(state.price)
            setDiscount(state.discount)
            setPriceSale(state.priceSale)
        }

    }, [isModalOpen])




    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        let body = {
            "price": priceDiscout,
            "discount": discount
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
        setPriceDiscount(pirceSale * (value / 100))
    }
    return (
        <>
            <Button style={ { backgroundColor: "black", color: "white" } } title='Cập nhập khuyết mãi' onClick={ showModal } icon={ <PercentageOutlined /> }>
            </Button>
            <Modal title="Discount" open={ isModalOpen } onOk={ handleOk } onCancel={ handleCancel }>
                <Space direction='vertical'>
                    <h4>Cập nhật giảm giá cho sản phẩm</h4>
                    <p>{ state.name }</p>
                    <Space >
                        <Space direction='vertical'>
                            <img width={ 100 } src={ state.img } alt={ state.img }></img>
                            <span className='text-danger'>SKU: { state._id.match(/[0-9]+/g).join("") }</span>
                        </Space>
                        <Space direction='vertical'>
                            <p>Giá nhập: { formatCurrency.format(state.priceIn) }</p>
                            <p>Giá bán: { formatCurrency.format(state.priceSale) }</p>
                            <p>Giá khuyến mãi: <input readOnly className='fs-5 border-0 input-readonly' value={ formatCurrency.format(priceDiscout) }></input></p>
                        </Space>
                        <div>
                            <label>Khuyến mãi</label>
                            <InputNumber
                                min={ 0 }
                                max={ 100 }
                                value={ discount }
                                formatter={ (value) => `${value}%` }
                                parser={ (value) => value.replace('%', '') }
                                onChange={ (value) => handleChange(value) }
                            />
                        </div>
                    </Space>
                </Space>
            </Modal>
        </>
    );
};
export default ModalDiscount;