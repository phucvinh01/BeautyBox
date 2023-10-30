import React, { useRef, useState } from 'react';
import { Button, Card, Input, Space, Watermark } from 'antd';
import { KeyOutlined, LoginOutlined, PauseCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import Axios from '../../../axios/Axios'
import { loginFailed, loginSuccess } from '../../../redux/authSlice';
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const passwordtRef = useRef(null);
    const emailRef = useRef(null);
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [hadError, setHadError] = useState('');

    const dispatch = useDispatch()
    const navigate = useNavigate()

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
            try {
                const auth = { email: email, password: password }
                const res = await Axios.post('/v1/emp/login', auth)
                console.log(res);
                if (res.status === 201) {
                    setHadError(res.message)
                    dispatch(loginFailed())
                    return
                } else if (res.data) {
                    dispatch(loginSuccess(res.data))
                    navigate('/admin/product')
                    return
                }
                else {
                    if (!res.status) {
                        setHadError(res.message)
                        dispatch(loginFailed())
                    }
                }
            }
            catch (err) {
                dispatch(loginFailed())
                setHadError(err.message)
            }
        }

    };

    return (
        <Watermark content="Login with role manager">
            <main className='container vh-100'>
                <div className='d-flex justify-content-center align-items-center vh-100'>
                    <Space direction='vertical' align='center'>
                        <img src="https://image.hsv-tech.io/300x0/bbx/common/50a26167-9341-4be8-8aba-9682d3b4a916.webp" />
                        <Card>
                            <Space direction='vertical'>
                                <div direction='vertical'>
                                    <label>Email</label>
                                    <Input ref={ emailRef } value={ email } onChange={ (e) => setEmail(e.target.value) } size="large" prefix={ <UserOutlined /> } />
                                </div>
                                <div direction='vertical'>
                                    <label>Mật khẩu</label>
                                    <Input.Password ref={ passwordtRef } value={ password } onChange={ (e) => setpassword(e.target.value) } size="large" prefix={ <KeyOutlined /> } />
                                </div>
                                {
                                    hadError && <span>{ hadError }</span>
                                }
                                <Button onClick={ handleSubmit } className='btn-primary-main' style={ { marginTop: 10 } } size="large" block icon={ <LoginOutlined /> }>
                                    Đăng nhập
                                </Button>
                            </Space>
                        </Card>
                    </Space>
                </div>
            </main>
        </Watermark>
    )
};
export default Login;