import React, { useState } from 'react';
import { Button, Modal, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios/Axios'
import moment from 'moment';
import { toast } from 'react-toastify';
import { getProductList } from '../../redux/api';
const ModalRecepit = (props) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const { state } = props
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [day, setDay] = useState(moment().format("YYYY-MM-DD"))
    const [quanity, setQuantity] = useState(0)
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        setIsLoading(true)
        try {
            const body = {
                "productId": state._id,
                "employeeId": user._id,
                "date": day,
                "quantity": quanity
            }
            const r = await axios.post('/v1/receipt/receipt-create', body)
            if (r.success) {
                getProductList(dispatch)
                message.info("Nhập hàng thành công")
                handleCancel();
                setIsLoading(false)
            }
            else {
                toast.error(r.message)
                setIsLoading(false)
            }
            setIsLoading(false)
        } catch (error) {
            toast.error(error)
            setIsLoading(false)
            return
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button title='Nhập Hàng' onClick={ showModal } icon={ <PlusOutlined /> }></Button>
            <Modal centered width={ 800 } footer={ null } title="Phiếu nhập hàng" open={ isModalOpen } onOk={ handleOk } onCancel={ handleCancel }>
                <div className='row'>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <div className='d-flex gap-2 flex-column '>
                            <div className='border'>
                                <img src={ state.img } alt='img' className='w-100' />

                            </div>
                            <p>SKU: <span className='text-danger'> { state._id }</span></p>
                            <p htmlFor='product'>{ state.name }</p>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <div className='d-flex gap-2 flex-column'>
                            <p>Thông tin nhập hàng</p>
                            <div className='d-flex justify-content-between'>
                                <p>Người nhập:</p><p>{ user && user.name } </p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p>Ngày nhập:</p><input className='form-control w-50' type='date' disabled value={ day } onChange={ (e) => setDay(e.target.value) } />
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p>Số lượng nhập:</p><input onChange={ (e) => setQuantity(e.target.value) } value={ quanity } className='form-control w-50' type='number' min={ 0 } />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-end'>
                    <div className='d-flex gap-3'>
                        <Button onClick={ handleCancel }>Hủy</Button>
                        <Button loading={ isLoading } onClick={ handleOk } type='primary'>Nhập</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default ModalRecepit;