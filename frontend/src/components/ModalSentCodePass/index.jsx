import React, { useEffect, useState } from 'react';
import { Button, Modal, Space, message } from 'antd';
import { SaveOutlined, SendOutlined } from '@ant-design/icons'
import { updateCodeReset } from '../../axios/AuthRequest';
import OtpInput from 'react-otp-input';
const ModalSentCodePass = (props) => {
    const [otp, setOtp] = useState('');
    const { handleClose } = props
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [isSent, setIsSent] = useState(false)
    const [isCheck, setIsCheck] = useState(false)
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        handleClose()
    }, [isModalOpen])

    const handleSentCode = async () => {

        let body = {
            email
        }
        let r = await updateCodeReset(body)
        if (r.status) {
            message.info("Vui lòng check mail của bạn")
            setIsSent(true)
        }
        else {
            setError(r.data)
        }
        //setIsSent(true)

    }

    const handleCheckCode = async () => {
        setIsSent(true)
        setIsCheck(true)
        let body = {
            email,
            otp
        }
        let r = await updateCodeReset(body)
        if (r.status) {
            message.info("Vui lòng check mail của bạn")
            setIsSent(true)
        }
        else {
            setError(r.data)
        }
    }
    const handleChangePassword = async () => {

    }

    return (
        <>
            <Button style={ { color: "blue" } } type="text" onClick={ showModal }>
                Quên mật khẩu?
            </Button>
            <Modal footer={ null } title="Quên mật khẩu" open={ isModalOpen } onOk={ handleOk } onCancel={ handleCancel }>
                <div className='d-flex justify-content-center'>
                    <img src='https://image.hsv-tech.io/300x0/bbx/common/50a26167-9341-4be8-8aba-9682d3b4a916.webp'></img>
                </div>
                <div hidden={ isSent }>
                    <p className='text-center mb-3'>Vui lòng nhập Email của bạn code khôi phục sẽ được gữi về email</p>
                    <div className='d-flex gap-2'>
                        <input value={ email } onChange={ (e) => setEmail(e.target.value) } className='form-control mb-3' placeholder='customer@gmail.com' type='email'></input>
                        <Button onClick={ handleSentCode } className='btn-primary-main' icon={ <SendOutlined /> }></Button>
                    </div>
                    {
                        error && <span className='text-danger'>{ error }</span>
                    }
                </div>
                <div hidden={ isSent ? isCheck : !isSent } >
                    <p className='text-center mb-3'>Vui lòng nhập mã gồm có 6 chữ số</p>
                    <div className='d-flex justify-content-between'>
                        <OtpInput
                            containerStyle={ 'd-flex justify-content-center gap-3' }
                            value={ otp }
                            inputStyle={ 'px-3 py-1 rounded' }
                            onChange={ setOtp }
                            numInputs={ 6 }
                            renderSeparator={ <span>{ "  " }</span> }
                            renderInput={ (props) => <input { ...props } /> }
                        />
                        <Button onClick={ handleCheckCode } className='btn-primary-main' icon={ <SendOutlined /> }></Button>
                    </div>
                </div>
                <div className='' hidden={ !isCheck }>
                    <div className='mb-3'>
                        <label>Mật khẩu mới</label>
                        <input className='form-control' type='password' />
                    </div>
                    <div className='mb-3'>
                        <label>Nhập lại mật khẩu</label>
                        <input className='form-control' type='password' />
                    </div>
                    <Button onClick={ handleChangePassword } block className='btn-primary-main' icon={ <SaveOutlined /> }></Button>
                </div>

            </Modal>
        </>
    );
};
export default ModalSentCodePass;