import React, { useEffect, useState } from 'react';
import { Button, Modal, Space, message } from 'antd';
import { SaveOutlined, SendOutlined } from '@ant-design/icons'
import { getCheckCode, updateCodeReset, updatePassword } from '../../axios/AuthRequest';
import OtpInput from 'react-otp-input';
const ModalSentCodePass = (props) => {
    const [otp, setOtp] = useState('');
    const { handleClose } = props
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [isSent, setIsSent] = useState(false)
    const [isCheck, setIsCheck] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [password, setPassword] = useState("")
    const [passComfrim, setPassComfrim] = useState("")


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
            setError(null)
        }
        else {
            setError(r.data)
        }
        //setIsSent(true)

    }

    const handleCheckCode = async () => {
        setIsSent(true)
        setIsLoading(true)


        let r = await getCheckCode(email, otp)
        if (r.status) {
            setIsCheck(true)
            setError(null)
        }
        else {
            setError(r.data)
            setIsCheck(false)
            setIsLoading(false)
        }
    }
    const handleChangePassword = async () => {
        setIsLoading(true)
        if (passComfrim.match(password)) {

            let body = {
                email, otp, password
            }
            let r = await updatePassword(body)
            if (r.status) {
                message.info("Cập nhật mật khẩu thành công")
                setError(null)
                handleClose()
            }
            else {
                message.error("Thay đổi mật khẩu thất bại")
                setError("Thay đổi mật khẩu thất bại")
                setIsLoading(false)
            }
        }
        else {
            message.error("Mật khẩu không đúng")
            setError("Mật khẩu không đúng")
            setIsLoading(false)
        }
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
                            inputStyle={ '' }
                            onChange={ setOtp }
                            numInputs={ 6 }
                            renderSeparator={ <span>{ "  " }</span> }
                            renderInput={ (props) => <input className='form-control text-dark' { ...props } /> }
                        />
                        <Button loading={ isLoading } onClick={ handleCheckCode } className='btn-primary-main' icon={ <SendOutlined /> }></Button>
                    </div>
                    {
                        error && <span className='text-danger'>{ error }</span>
                    }
                </div>
                <div className='' hidden={ !isCheck }>
                    <div className='mb-3'>
                        <label>Mật khẩu mới</label>
                        <input value={ password } onChange={ (e) => setPassword(e.target.value) } className='form-control' type='password' />
                    </div>
                    <div className='mb-3'>
                        <label>Nhập lại mật khẩu</label>
                        <input value={ passComfrim } onChange={ (e) => setPassComfrim(e.target.value) } className='form-control' type='password' />
                    </div>
                    {
                        error && <span className='text-danger'>{ error }</span>
                    }
                    <Button loading={ isLoading } onClick={ handleChangePassword } block className='btn-primary-main' icon={ <SaveOutlined /> }></Button>
                </div>

            </Modal>
        </>
    );
};
export default ModalSentCodePass;