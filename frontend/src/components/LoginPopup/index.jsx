import React, { useState, useId } from 'react';
import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import './login.scss'
import { login } from '../../redux/api';
import RegisterPopup from '../RegisterPopup';
const LoginPopup = () => {
    const id = useId();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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

    const handleSubmit = () => {
        const auth = { username: username, password: password }
        login(auth, dispatch, navigate)
        handleCancel()
    };

    return (
        <>

            <button
                className='btn btn-outline-dark'
                onClick={showModal}>
                <i className='fa-solid fa-circle-user'></i>
                <span className='mx-1 '>Login</span>
            </button>
            <div className='popup-login'>
                <Modal
                    open={isModalOpen}
                    footer={null}
                    onOk={handleOk}
                    onCancel={handleCancel}>
                    <div className='login-content'>
                        <img src='https://i.pinimg.com/564x/85/85/f2/8585f2abc062ac1383bfc210a10bbda1.jpg'></img>
                        <h3>HELLO THERE!</h3>
                    </div>
                    <div className='login-from'>
                        <div className='mb-4'>
                            <input
                                required
                                type='text'
                                id={id + '-email'}
                                placeholder='Username'
                                onChange={(e) => setUsername(e.target.value)}></input>
                        </div>
                        <div className='mb-4'>
                            <input
                                required
                                type='password'
                                id={id + '-password'}
                                placeholder='**********'
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                            <p className='text-end'>
                                <a style={{ color: "blue" }}>Forgot your password?</a>
                            </p>

                        </div>
                        <div className='mb-3'>
                            <button className='login-btn__submit'
                                onClick={handleSubmit}
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
