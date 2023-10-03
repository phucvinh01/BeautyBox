import React, { useState, useId, useRef } from 'react';
import { Button, Modal, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import './login.scss'
import { login } from '../../redux/api';
import RegisterPopup from '../RegisterPopup';
import { loginFailed, loginSuccess } from '../../redux/authSlice';
import Axios from '../../axios/Axios';
const LoginPopup = () => {
    const id = useId();
    const passwordtRef = useRef(null);
    const emailRef = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hadError, setHadError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();


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
        if (!email && !password) {
            setHadError("Thiếu thông tin đăng nhập")
            emailRef.current.focus();
            return
        }
        else if (!password) {
            setHadError("Vui lòng điền Password của bạn")
            passwordtRef.current.focus();

            return

        }
        else if (!email) {
            setHadError("Vui lòng điền Email của bạn")
            emailRef.current.focus();

            return

        }
        else {
            const auth = { email: email, password: password }
            try {
                const res = await Axios.post('/v1/auth/login', auth)
                console.log(res);
                if (res.status === 1) {
                    dispatch(loginSuccess(res))
                    if (res.role === 1) {
                        navigate('/admin')
                        return
                    }
                    navigate('/')
                }
                else {
                    if (res.status === 2) {
                        setHadError(res.message)
                        dispatch(loginFailed())
                    }
                }
            }
            catch (err) {
                dispatch(loginFailed())
            }
        }

    };

    return (
        <>

            <button
                className='btn'
                onClick={ showModal }>
                <div className='d-flex gap-2 align-items-center'>
                    <i className='fa-solid fa-circle-user'></i>
                    <span className='mx-1 '>Đăng nhập</span>
                </div>
            </button>
            <div className='popup-login'>
                <Modal
                    open={ isModalOpen }
                    footer={ null }
                    onOk={ handleOk }
                    onCancel={ handleCancel }>
                    <div className='login-content'>
                        <img src='https://image.hsv-tech.io/300x0/bbx/common/50a26167-9341-4be8-8aba-9682d3b4a916.webp'></img>
                    </div>
                    <div className=''>
                        <div className='mb-4'>
                            <input
                                className='form-control'
                                ref={ emailRef }
                                required
                                type='email'
                                id={ id + '-email' }
                                placeholder='Email'
                                onChange={ (e) => setEmail(e.target.value) }></input>
                            <span className='text-danger'>{ hadError && hadError.includes('Email') && <span>{ hadError }</span> }</span>
                        </div>
                        <div className='mb-4'>
                            <input
                                className='form-control'

                                ref={ passwordtRef }
                                required
                                type='password'
                                id={ id + '-password' }
                                placeholder='**********'
                                onChange={ (e) => setPassword(e.target.value) }
                            ></input>
                            <span className='text-danger'>{ hadError && hadError.includes('Password') && <span>{ hadError }</span> }</span>
                            <p className='text-end'>
                                <a style={ { color: "blue" } }>Forgot your password?</a>
                            </p>
                            <span className='text-danger'>{ hadError && hadError.includes('thông') && <span>{ hadError }</span> }</span>

                        </div>
                        <div className='mb-3'>
                            <button className='login-btn__submit'
                                onClick={ handleSubmit }
                            >
                                Login
                            </button>
                        </div>
                    </div>
                    <hr></hr>
                    <div className='mb-3'>
                        <RegisterPopup />
                    </div>
                </Modal>
            </div>
        </>
    );
};
export default LoginPopup;
