import React, { useEffect, useId, useState } from 'react';
import { Breadcrumb, Button, Card, Form, Input, message, Space } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { updateInfoCustomer } from '../axios/AuthRequest';
const Profile = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const id = useId();
    const [isUpdate, setIsUpdate] = useState(false);
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')


    useEffect(() => {
        setEmail(user?.email)
        setPhone(user?.phone)
        setLastName(user?.lastName)
        setFirstName(user?.firstName)
    }, [user])

    const handleUpdate = async () => {
        const body = {
            firstName, lastName, email, phone
        }
        let r = await updateInfoCustomer(user._id, body)
        if (r.status) {
            message.info("Cập nhật thông tin thành công")
            setIsUpdate(!isUpdate)
        }
        else {
            message.info("Cập nhật thông tin thất bại")
        }
    }
    return (
        <>
            <Helmet>
                <title>Profile | { user.lastName }</title>
            </Helmet>
            <div className='container my-3'>
                <div className='row'>
                    <div className='col-4'>
                        <img
                            className='w-100 rounded-3'
                            height={ 400 }
                            src='https://i.pinimg.com/564x/4f/34/d2/4f34d2dad8546b06aeb42f8e067ef733.jpg'></img>
                    </div>
                    <div className='col-8'>
                        <Breadcrumb
                            className='mb-3'
                            items={ [
                                {
                                    title: <Link to={ '/' }>Trang chủ</Link>,
                                },
                                {
                                    title: <span>Tài khoản</span>,
                                },
                            ] }
                        />
                        <section>
                            <h2>Tài khoản</h2>
                        </section>
                        <section>
                            <div className='row'>
                                <div className='col-6'>
                                    <div className='mb-3'>
                                        <label htmlFor={ id + 'name' }>
                                            Tên <span className='text-danger'>*</span>{ ' ' }
                                        </label>
                                        <input
                                            disabled={ !isUpdate }
                                            value={ lastName }
                                            id={ id + 'name' }
                                            onChange={ (e) => setLastName(e.target.value) }
                                            type='text'
                                            className='form-control w-100'></input>
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor={ id + 'email' }>
                                            Email <span className='text-danger'>*</span>
                                        </label>
                                        <input
                                            disabled={ !isUpdate }
                                            onChange={ (e) => setEmail(e.target.value) }
                                            value={ email }
                                            id={ id + 'email' }
                                            type='text'
                                            className='form-control w-100'></input>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className='mb-3'>
                                        <label htmlFor={ id + 'last-name' }>
                                            Họ <span className='text-danger'>*</span>{ ' ' }
                                        </label>
                                        <input
                                            disabled={ !isUpdate }
                                            onChange={ (e) => setFirstName(e.target.value) }
                                            value={ firstName }
                                            id={ id + 'last-name' }
                                            type='text'
                                            className='form-control w-100'></input>
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor={ id + 'phone' }>
                                            Số điện thoại <span className='text-danger'>*</span>
                                        </label>
                                        <input
                                            disabled={ !isUpdate }
                                            onChange={ (e) => setPhone(e.target.value) }
                                            value={ phone }
                                            id={ id + 'phone' }
                                            type='tel'
                                            className='form-control w-100'></input>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section>
                            <div className='d-flex justify-content-end'>
                                { isUpdate ? (
                                    <button onClick={ handleUpdate } className='btn-primary-main w-25 p-2'>Lưu</button>
                                ) : (
                                    <button onClick={ () => setIsUpdate(!isUpdate) } className='btn-primary-main w-25 p-2'>
                                        Chỉnh sửa
                                    </button>
                                ) }
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
