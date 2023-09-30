import React, { useState, useId, useEffect } from 'react';
import { Input, Modal, Row, Col, Select, Button, Spin } from 'antd';
import Upload from '../../../components/Uploads';
import './popup.css';
import cloudinary from '../../../util/Cloudnary';
import Axios from '../../../axios/Axios';
import { toast } from 'react-toastify'
import { getProductList } from '../../../redux/api'
import { useDispatch, useSelector } from 'react-redux'
const PopupCreate = () => {

    const categories = useSelector((state) => state.category.category.data);
    const brands = useSelector((state) => state.brand.brand.data);

    const { TextArea } = Input;
    const id = useId();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const popup = () => {
            document.querySelector('.ant-modal-content')?.classList.add('popup');
        };
        if (isModalOpen) {
            popup();
        }
    }, [isModalOpen]);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onChange = (value) => {
        setCategory(value)
    }

    const onChangeBrand = (value) => {
        setBrand(value)
    }

    const handleClick = async () => {
        setLoading(true)
        let res = await cloudinary(image)
        if (res.statusText === "OK") {
            let result = await Axios.post('/v1/product/', {
                name: name,
                price: price,
                description: description,
                img: res.data.secure_url,
                brand: brand,
                category: category,
            })
            if (result) {
                toast.success("Insert successful....")
                handleCancel();
                getProductList(dispatch);
            }
        }
        else {
            toast.error("Insert Failed......")
        }
        setLoading(false)
    }

    return (
        <>
            <button
                className='btn btn-info'
                onClick={showModal}>
                <i className='fa-solid fa-circle-plus'></i>
                <em className='mx-1'>Create</em>
            </button>
            <Modal
                title='Create'
                open={isModalOpen}
                footer={null}
                onOk={handleOk}
                onCancel={handleCancel}>
                <hr></hr>
                <div className='row g-2'>
                    <div className='col-lg-4 col-md-12 col-sm-12'>
                        <div className='mb-3'>
                            <label
                                htmlFor={id + '-name'}
                                className='form-label fw-bolder'>
                                Name
                            </label>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                type='text'
                                className='form-control'
                                id={id + '-name'}></input>
                        </div>
                        <div className='mb-3'>
                            <label
                                htmlFor={id + '-price'}
                                className='form-label fw-bolder'>
                                Price
                            </label>
                            <input
                                onChange={(e) => setPrice(e.target.value)}
                                type='number'
                                className='form-control'
                                id={id + '-price'}></input>
                        </div>
                        <div className='mb-3'>
                            <label
                                htmlFor={id + '-category'}
                                className='form-label fw-bolder'>
                                Category
                            </label>
                            <Select
                                onChange={onChange}
                                id='category'
                                style={{
                                    width: '100%',
                                }}
                                allowClear
                                options={
                                    categories.map((item) => {
                                        return (
                                            {
                                                value: item.name,
                                                key: item.name
                                            }
                                        )
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-12 col-sm-12'>
                        <div className='mb-3'>
                            <label
                                htmlFor={id + '-brand'}
                                className='form-label fw-bolder'>
                                Brand
                            </label>
                            <Select
                                onChange={onChangeBrand}
                                id='brand'
                                style={{
                                    width: '100%',
                                }}
                                allowClear
                                options={
                                    brands.map((item) => {
                                        return (
                                            {
                                                value: item.name,
                                                key: item.name
                                            }
                                        )
                                    })
                                }
                            />
                        </div>
                        <div className='mb-3'>
                            <label
                                htmlFor={id + '-description'}
                                className='form-label fw-bolder'>
                                Description
                            </label>
                            <TextArea
                                onChange={(e) => setDescription(e.target.value)}
                                style={{
                                    height: 140,
                                    resize: 'none',
                                }}
                                type='text'
                                className='form-control'
                                id={id + '-description'}></TextArea>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-12 col-sm-12'>
                        <div className='p-0'>
                            <Upload setImage={setImage} />
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-end'>
                    <button disabled={loading ? true : false} className='btn btn-dark' onClick={handleClick}>{loading ? <Spin></Spin> : <>Create</>} </button>
                </div>
            </Modal>
        </>
    );
};
export default PopupCreate;
