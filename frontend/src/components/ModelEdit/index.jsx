import { Input, Modal, Select, Spin } from 'antd';
import React, { useEffect, useId, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Upload from '../Uploads';
import cloudinary from '../../util/Cloudnary';
import Axios from '../../axios/Axios';
import { toast } from 'react-toastify';
import { getProductList } from '../../redux/api';
import './modalEdit.scss'


const ModalEdit = (props) => {
    const { handleCancel, openEdit, state } = props;

    const categories = useSelector((state) => state.category.category.data);
    const brands = useSelector((state) => state.brand.brand.data);

    const { TextArea } = Input;
    const idd = useId();
    const [_id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState();
    const [brand, setBrand] = useState(0);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const onChange = (value) => {
        setCategory(value);
    };

    const onChangeBrand = (value) => {
        setBrand(value);
    };

    useEffect(() => {
        if (openEdit) {
            setId(state._id);
            setBrand(state.stock);
            setName(state.name);
            setPrice(state.price);
            setCategory(state.category);
            setDescription(state.description);
            setImage(state.img);
        }
    }, [state]);

    const handleSubmit = async () => {
        setLoading(true);
        let res = await cloudinary(image);
        if (res.statusText === 'OK') {
            let result = await Axios.put('/v1/product/' + _id, {
                name: name,
                price: price,
                description: description,
                img: res.data.secure_url,
                brand: brand,
                category: category,
            });
            if (result) {
                toast.success('Update successful....');
                handleCancel('EDIT');
                getProductList(dispatch);
            }
        } else {
            toast.error('Insert Failed......');
        }
        setLoading(false);
    };

    return (
        <>
            <Modal
                title='Edit'
                width={ 1000 }
                open={ openEdit }
                onCancel={ () => handleCancel('EDIT') }
                footer={ false }
                className='modal-edit'
            >
                <hr></hr>
                <div className='row g-2 ' >
                    <div className='col-lg-4 col-md-12 col-sm-12'>
                        <div className='mb-3'>
                            <label
                                htmlFor={ idd + '-name' }
                                className='form-label fw-bolder'>
                                Name
                            </label>
                            <input
                                value={ name }
                                onChange={ (e) => setName(e.target.value) }
                                type='text'
                                className='form-control'
                                id={ idd + '-name' }></input>
                        </div>
                        <div className='mb-3'>
                            <label
                                htmlFor={ idd + '-price' }
                                className='form-label fw-bolder'>
                                Price
                            </label>
                            <input
                                value={ price }
                                onChange={ (e) => setPrice(e.target.value) }
                                type='number'
                                className='form-control'
                                id={ idd + '-price' }></input>
                        </div>
                        <div className='mb-3'>
                            <label
                                htmlFor={ idd + '-category' }
                                className='form-label fw-bolder'>
                                Category
                            </label>
                            <Select
                                value={ category }
                                onChange={ onChange }
                                id='category'
                                style={ {
                                    width: '100%',
                                } }
                                allowClear
                                options={ categories.map((item) => {
                                    return {
                                        value: item.name,
                                        key: item.name,
                                    };
                                }) }
                            />
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-12 col-sm-12'>
                        <div className='mb-3'>
                            <label
                                htmlFor={ idd + '-stock' }
                                className='form-label fw-bolder'>
                                Stock
                            </label>
                            <input
                                value={ brand }
                                onChange={ (e) => setBrand(e.target.value) }
                                type='number'
                                className='form-control'
                                id={ idd + '-stock' }></input>
                        </div>
                        <div className='mb-3'>
                            <label
                                htmlFor={ idd + '-description' }
                                className='form-label fw-bolder'>
                                Description
                            </label>
                            <TextArea
                                value={ description }
                                onChange={ (e) => setDescription(e.target.value) }
                                style={ {
                                    height: 140,
                                    resize: 'none',
                                } }
                                type='text'
                                className='form-control'
                                id={ idd + '-description' }></TextArea>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-12 col-sm-12'>
                        <div className='p-0'>
                            <Upload
                                setImage={ setImage }
                                value={ image }
                            />
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-end'>
                    <button
                        disabled={ loading ? true : false }
                        className='btn btn-dark'
                        onClick={ handleSubmit }>
                        { loading ? <Spin></Spin> : <>Submit</> }{ ' ' }
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default ModalEdit;
