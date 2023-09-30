import React, { useState, useId, useRef } from 'react';
import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import '../LoginPopup/login.scss'
import { register } from '../../axios/AuthRequest';
import { toast } from 'react-toastify';

const RegisterPopup = () => {
    const id = useId();
    const inputRef = useRef(null);
    const emailRef = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState('');
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
        if (password != comfrim) {
            setError("Password not match...!");
            inputRef.current.focus();
        }
        else {
            setError('')
            const user = {
                username: username,
                password: password,
                email: email,
            }
            let res = await register(user)
            console.log(res);
            if (res.success) {
                toast.success("Register successful....")
                handleCancel()
            }
            else {
                emailRef.current.focus();
                toast.error("Register failed....")
                setErrorEmail(res.data.message)
            }
        }
    };

    return (
        <>
            <button
                onClick={showModal}
                className='login-btn__register' >
                Register
            </button>
            <Modal
                open={isModalOpen}
                footer={null}
                onOk={handleOk}
                onCancel={handleCancel}>
                <div className='login-content'>
                    <img src='https://i.pinimg.com/564x/85/85/f2/8585f2abc062ac1383bfc210a10bbda1.jpg'></img>
                    <h3>JOIN WITH US!</h3>
                </div>
                <div className='login-from'>
                    <div className='mb-3'>
                        <input
                            required
                            type='text'
                            id={id + '-Username'}
                            placeholder='Username'
                            onChange={(e) => setUsername(e.target.value)}></input>
                    </div>
                    <div className='mb-3'>
                        <input
                            ref={emailRef}
                            required
                            type='email'
                            id={id + '-email'}
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}></input>
                        {
                            errorEmail && <p className='text-danger'>{errorEmail}</p>
                        }
                    </div>
                    <div className='mb-3'>
                        <input
                            required
                            type='password'
                            id={id + '-password'}
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </div>
                    <div className='mb-3'>
                        <input
                            ref={inputRef}
                            required
                            type='password'
                            id={id + '-password'}
                            placeholder='Confrim password'
                            onChange={(e) => setComfrim(e.target.value)}
                        ></input>
                        {
                            error && <p className='text-danger'>{error}</p>
                        }
                    </div>

                </div>
                <div className='mb-4'>
                    <button className='login-btn__register' onClick={handleSubmit}>
                        Register
                    </button>
                </div>
                <hr></hr>
            </Modal>
        </>
    );
};
export default RegisterPopup;
