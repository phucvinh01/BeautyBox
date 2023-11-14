import React, { useId } from 'react'
import { Breadcrumb, Button, Card, Form, Input, message, Space } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
const Profile = () => {

    const user = useSelector((state) => state.auth.login.currentUser);
    const id = useId()
    return (
        <>
            <Helmet>
                <title>Profile | { user.lastName }</title>
            </Helmet>
            <div className='container my-3'>
                <div className='row'>
                    <div className='col-4'>

                        <img className='w-100 rounded-3' height={ 400 } src='https://i.pinimg.com/564x/4f/34/d2/4f34d2dad8546b06aeb42f8e067ef733.jpg'>

                        </img>
                    </div>
                    <div className='col-8'>
                        <Breadcrumb className='mb-3'
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
                                        <label htmlFor={ id + 'name' }>Tên <span className='text-danger'>*</span> </label>
                                        <input value={ user.lastName } id={ id + 'name' } type='text' className='form-control w-100'></input>
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor={ id + 'email' }>Email  <span className='text-danger'>*</span></label>
                                        <input value={ user.email } id={ id + 'email' } type='text' className='form-control w-100'></input>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className='mb-3'>
                                        <label htmlFor={ id + 'last-name' }>Họ <span className='text-danger'>*</span> </label>
                                        <input value={ user.firstName } id={ id + 'last-name' } type='text' className='form-control w-100'></input>
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor={ id + 'phone' }>Số điện thoại  <span className='text-danger'>*</span></label>
                                        <input value={ user.phone } id={ id + 'phone' } type='tel' className='form-control w-100'></input>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section>
                            <div className='d-flex justify-content-end'>
                                <button className='btn-primary-main w-25 p-2'>Lưu</button>
                            </div>
                        </section>
                    </div>
                </div >



            </div >
        </>
    )
}

export default Profile