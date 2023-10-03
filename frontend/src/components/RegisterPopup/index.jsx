import React, { useState, useId, useRef, useEffect } from 'react';
import { Button, Input, Modal, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import './register.scss'
import { register } from '../../axios/AuthRequest';
import { toast } from 'react-toastify';

const RegisterPopup = () => {
    const id = useId();
    const inputRef = useRef(null);
    const emailRef = useRef(null);
    const [loading, setLoading] = useState(false)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [comfrim, setComfrim] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [errorEmail, setErrorEmail] = useState('')


    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const handleSubmit = async () => {
        if (!firstName || !lastName || !phone || !password || !comfrim || !email) {

            setError("Thiếu thông tin đăng ký")

            return
        }
        if (password != comfrim) {
            setError("Password không đúng");
            inputRef.current.focus();
            return
        }
        else {
            setLoading(true)
            setError('')
            const user = {
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                password: password,
                email: email,
            }
            let res = await register(user)
            if (res.status) {
                setTimeout(() => {
                    setLoading(false)
                }, 2000)
                toast.success("Đăng ký thành công!. Hãy đăng nhập")
                handleCancel()
            }
            else {
                emailRef.current.focus();
                setError(res.message)
            }
        }
    };

    return (
        <>
            <button
                onClick={ showModal }
                className='login-btn__register' >
                Register
            </button>
            <Modal
                className='register-form'
                open={ isModalOpen }
                footer={ null }
                onOk={ handleOk }
                onCancel={ handleCancel }>
                <div className='login-content'>
                    <img src='https://image.hsv-tech.io/300x0/bbx/common/50a26167-9341-4be8-8aba-9682d3b4a916.webp'></img>

                </div>
                <div className=''>
                    <div className='d-flex gap-3 mb-3   '>
                        <Input
                            onChange={ (e) => setfirstName(e.target.value) }
                            suffix={ <span className='text-danger'>*</span> } className='form-control' placeholder='Họ'></Input>
                        <Input
                            onChange={ (e) => setlastName(e.target.value) }

                            suffix={ <span className='text-danger'>*</span> } className='form-control' placeholder='Tện'></Input>
                    </div>
                    <div className='mb-3'>
                        <Input

                            suffix={ <span className='text-danger'>*</span> }
                            className='form-control'
                            ref={ emailRef }
                            required
                            type='email'
                            id={ id + '-email' }
                            placeholder='Email'
                            onChange={ (e) => setEmail(e.target.value) }></Input>
                        {
                            errorEmail && <p className='text-danger'>{ errorEmail }</p>
                        }
                    </div>
                    <div className='mb-3'>
                        <Input
                            suffix={ <span className='text-danger'>*</span> }
                            className='form-control'
                            ref={ emailRef }
                            required
                            type='tel'
                            id={ id + '-tel' }
                            placeholder='Số điện thoại'
                            onChange={ (e) => setPhone(e.target.value) }></Input>
                        {
                            errorEmail && <p className='text-danger'>{ errorEmail }</p>
                        }
                    </div>
                    <div className='mb-3'>
                        <Input
                            suffix={ <span className='text-danger'>*</span> }
                            className='form-control'
                            required
                            type='password'
                            id={ id + '-password' }
                            placeholder='Password'
                            onChange={ (e) => setPassword(e.target.value) }
                        ></Input>
                    </div>
                    <div className='mb-3'>
                        <Input
                            suffix={ <span className='text-danger'>*</span> }
                            className='form-control'
                            ref={ inputRef }
                            required
                            type='password'
                            id={ id + '-password' }
                            placeholder='Confrim password'
                            onChange={ (e) => setComfrim(e.target.value) }
                        ></Input>
                        {
                            error && <p className='text-danger'>{ error }</p>
                        }
                    </div>

                </div>
                <div className='mb-4'>
                    <button className='btn-primary-main w-100 p-2' onClick={ handleSubmit }>
                        { loading ? <Spin></Spin> : <span>Đăng ký</span> }
                    </button>
                </div>
            </Modal>
        </>
    );
};
export default RegisterPopup;
