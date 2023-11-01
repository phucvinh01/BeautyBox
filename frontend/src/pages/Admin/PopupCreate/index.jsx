import React, { useState, useId, useEffect } from 'react';
import { Input, Modal, Row, Col, Select, Button, Spin, Space, message } from 'antd';
import Upload from '../../../components/Uploads';
import './popup.css';
import cloudinary from '../../../util/Cloudnary';
import Axios from '../../../axios/Axios';
import { toast } from 'react-toastify'
import { getProductList } from '../../../redux/api'
import { useDispatch, useSelector } from 'react-redux'
import { PlusCircleOutlined } from '@ant-design/icons';
const PopupCreate = () => {

    const categories = useSelector((state) => state.category.category.data);
    const brands = useSelector((state) => state.brand.brand.data);
    const distributors = useSelector((state) => state.distributor.distributor.data);
    const collections = useSelector((state) => state.collection.collection.data);

    const { TextArea } = Input;
    const id = useId();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [priceIn, setPriceIn] = useState('');
    const [priceSale, setPriceSale] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [distributor, setDistrobutor] = useState('')
    const [stock, setStock] = useState(0)
    const [origin, setOrigin] = useState("")
    const [collection, setCollection] = useState([])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isModalOpen) {
            setName("")
            setPriceIn(0)
            setPriceSale(0)
            setCategory("")
            setBrand("")
            setDescription("")
            setImage("")
            setDistrobutor("")
            setStock(0)
            setCollection("")
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

    const handleClick = async () => {
        setLoading(true)
        let res = await cloudinary(image)
        if (res.statusText === "OK") {
            let result = await Axios.post('/v1/product/', {
                name: name,
                priceIn: priceIn,
                priceSale: priceSale,
                description: description,
                img: res.data.secure_url,
                brand: brand,
                category: category,
                distributor: distributor,
                collection: collection,
                in_stock: stock,
                origin: origin
            })
            if (result.status) {
                message.success("Thêm thành công")
                setLoading(false)
                handleCancel();
                getProductList(dispatch);
            }
        }
        else {
            message.success("Thêm thất bại")
            setLoading(false)
        }
    }

    return (
        <>
            <Button icon={ <PlusCircleOutlined /> }
                onClick={ showModal }>
                <em className='mx-1'>Thêm một sản phẩm</em>
            </Button>
            <Modal
                width={ 1000 }
                centered
                title='Create'
                open={ isModalOpen }
                footer={ null }
                onOk={ handleOk }
                onCancel={ handleCancel }>
                <hr></hr>
                <div className='row g-2'>
                    <div className='col-lg-4 col-md-12 col-sm-12'>
                        <div className='mb-3'>
                            <label
                                htmlFor={ id + '-name' }
                                className='form-label fw-bolder'>
                                Tên sản phẩm
                            </label>
                            <input
                                onChange={ (e) => setName(e.target.value) }
                                type='text'
                                className='form-control'
                                id={ id + '-name' }></input>
                        </div>
                        <div className='mb-3'>
                            <label
                                htmlFor={ id + '-price' }
                                className='form-label fw-bolder'>
                                Giá nhập
                            </label>
                            <input
                                value={ priceIn }
                                onChange={ (e) => setPriceIn(e.target.value) }
                                type='number'
                                className='form-control'
                                id={ id + '-price' }></input>
                        </div>
                        <div className='mb-3'>
                            <label
                                htmlFor={ id + '-category' }
                                className='form-label fw-bolder'>
                                Thể loại
                            </label>
                            <Select
                                value={ category }
                                onChange={ (value) => setCategory(value) }
                                placeholder="Please select"
                                style={ {
                                    width: '100%',
                                } }
                                options={
                                    categories && categories.length > 0 && categories.map((item) => {
                                        return (
                                            {
                                                value: item.name,
                                                label: item.name,
                                                key: item.id
                                            }
                                        )
                                    })
                                } />
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-12 col-sm-12'>
                        <div className='mb-3'>
                            <label
                                htmlFor={ id + '-Distributor' }
                                className='form-label fw-bolder'>
                                Nhà phân phối
                            </label>
                            <Select
                                value={ distributor }
                                onChange={ (value) => setDistrobutor(value) }
                                placeholder="Please select"
                                style={ {
                                    width: '100%',
                                } }
                                options={
                                    distributors && distributors.length > 0 && distributors.map((item) => {
                                        return (
                                            {
                                                value: item.name,
                                                label: item.name,
                                                key: item.id
                                            }
                                        )
                                    })
                                } />
                        </div>
                        <div className='mb-3'>
                            <label
                                htmlFor={ id + '-stock' }
                                className='form-label fw-bolder'>
                                Số lượng
                            </label>
                            <input
                                min={ 1 }
                                max={ 5000 }
                                defaultValue={ 1 }
                                value={ stock }
                                onChange={ (e) => setStock(e.target.value) }
                                type='number'
                                className='form-control'
                                id={ id + '-stock' }></input>
                        </div>
                        <div className='mb-3'>
                            <label
                                htmlFor={ id + '-Origin' }
                                className='form-label fw-bolder'>
                                Xuất xứ
                            </label>
                            <input
                                value={ origin }
                                onChange={ (e) => setOrigin(e.target.value) }
                                type='text'
                                className='form-control'
                                id={ id + '-Origin' }></input>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-12 col-sm-12'>
                        <div className='mb-3'>
                            <label
                                className='form-label fw-bolder d-block'>
                                Collection
                            </label>
                            <Select
                                value={ collection }
                                onChange={ (value) => setCollection(value) }
                                mode="multiple"
                                placeholder="Please select"
                                style={ {
                                    width: '100%',
                                } }
                                options={
                                    collections && collections.length > 0 && collections.map((item) => {
                                        return (
                                            {
                                                value: item.name,
                                                label: item.name,
                                                key: item.id
                                            }
                                        )
                                    })
                                }
                            />
                        </div>
                        <div className='mb-3'>
                            <label
                                htmlFor={ id + '-brand' }
                                className='form-label fw-bolder d-block'>
                                Thương hiệu
                            </label>
                            <Select
                                value={ brand }
                                onChange={ (value) => setBrand(value) }
                                placeholder="Please select"
                                style={ {
                                    width: '100%',
                                } }
                                options={
                                    brands && brands.length > 0 && brands.map((item) => {
                                        return (
                                            {
                                                value: item.name,
                                                label: item.name,
                                                key: item.id
                                            }
                                        )
                                    })
                                } />
                        </div>
                        <div className='mb-3'>
                            <label
                                htmlFor={ id + '-brand' }
                                className='form-label fw-bolder d-block'>
                                Giá bán
                            </label>
                            <input
                                value={ priceSale }
                                onChange={ (e) => setPriceSale(e.target.value) }
                                type='number'
                                className='form-control'
                                id={ id + '-price' }></input>
                        </div>
                    </div>
                </div>

                <div className='mb-3'>
                    <label
                        htmlFor={ id + '-description' }
                        className='form-label fw-bolder'>
                        Description
                    </label>
                    <TextArea
                        onChange={ (e) => setDescription(e.target.value) }
                        style={ {
                            height: 140,
                            resize: 'none',
                        } }
                        type='text'
                        className='form-control'
                        id={ id + '-description' }></TextArea>
                </div>

                <div className='col-6 p-3'>
                    <div className='p-0'>
                        <Upload setImage={ setImage } />
                    </div>
                </div>
                <div className='d-flex justify-content-end'>
                    <button disabled={ loading ? true : false } className='btn btn-dark' onClick={ handleClick }>{ loading ? <Spin></Spin> : <>Create</> } </button>
                </div>
            </Modal>
        </>
    );
};
export default PopupCreate;
