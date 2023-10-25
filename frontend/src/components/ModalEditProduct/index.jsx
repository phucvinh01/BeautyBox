import React, { useEffect, useId, useState } from 'react';
import { Button, Input, Modal, Select, Spin, message } from 'antd';
import Upload from '../Uploads';
import Axios from '../../axios/Axios'
import { useDispatch, useSelector } from 'react-redux';
import cloudinary from '../../util/Cloudnary';
import { EditOutlined, SaveFilled } from '@ant-design/icons';
import { getProductList } from '../../redux/api';
const ModalEditProduct = (props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        if (isModalOpen) {
            console.log(props.state);
            setId(props.state._id);
            setBrand(props.state.brand);
            setName(props.state.name);
            setPriceSale(props.state.priceSale);
            setPriceIn(props.state.priceIn);
            setCategory(props.state.category);
            setDescription(props.state.description);
            setOrigin(props.state.origin);
            setCollection(props.state.collection)
            setImage(props.state.img);
            setStock(props.state.in_stock)
        }
    }, [isModalOpen]);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        setLoading(true);
        let res = await cloudinary(image);
        if (res.statusText === 'OK') {
            let result = await Axios.put('/v1/product/' + _id, {
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
            });
            if (result.status) {
                message.success("Chỉnh sửa thành công")
                setIsModalOpen(false);
                getProductList(dispatch);
                setLoading(false);
            }
        } else {
            message.error("Chỉnh sửa thất bại")
            setLoading(false);
            return
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const categories = useSelector((state) => state.category.category.data);
    const brands = useSelector((state) => state.brand.brand.data);
    const collections = useSelector((state) => state.collection.collection.data);
    const distributors = useSelector((state) => state.distributor.distributor.data);

    const { TextArea } = Input;
    const id = useId();
    const [_id, setId] = useState('');
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
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();




    const handleSubmit = async () => {

    };

    return (
        <>
            <Button icon={ <EditOutlined /> } onClick={ showModal } title='Chỉnh sửa'></Button>
            <Modal okButtonProps={ {
                disabled: loading
            } } onCancel={ handleCancel } centered width={ 1000 } footer={ null } title="Basic Modal" open={ isModalOpen }>
                <div className='row g-2'>
                    <div className='col-lg-4 col-md-12 col-sm-12'>
                        <div className='mb-3'>
                            <label
                                htmlFor={ id + '-name' }
                                className='form-label fw-bolder'>
                                Tên sản phẩm
                            </label>
                            <input
                                value={ name }
                                defaultValue={ name }
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
                                defaultValue={ priceIn }
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
                            <select defaultValue={ category } value={ category } className='form-control' onChange={ (e) => setCategory(e.target.value) }>
                                {
                                    categories && categories?.map((item) => {
                                        return (
                                            <>
                                                <option value={ item.name }>{ item.name }</option>
                                            </>


                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-12 col-sm-12'>
                        <div className='mb-3'>
                            <label
                                htmlFor={ id + '-Distributor' }
                                className='form-label fw-bolder'>
                                Nhà phân phối
                            </label>
                            <select value={ distributor } className='form-control' onChange={ (e) => setDistrobutor(e.target.value) }>
                                {
                                    distributors && distributors?.map((item) => {
                                        return (
                                            <>
                                                <option value={ item.name }>{ item.name }</option>
                                            </>


                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='mb-3'>
                            <label
                                htmlFor={ id + '-stock' }
                                className='form-label fw-bolder'>
                                Số lượng
                            </label>
                            <input
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
                                defaultValue={ origin }
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
                            <select defaultValue={ brand } value={ brand } className='form-control' onChange={ (e) => setBrand(e.target.value) }>
                                {
                                    brands?.map((item) => {
                                        return (
                                            <>
                                                <option value={ item.name }>{ item.name }</option>
                                            </>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='mb-3'>
                            <label
                                htmlFor={ id + '-brand' }
                                className='form-label fw-bolder d-block'>
                                Giá bán
                            </label>
                            <input
                                defaultValue={ priceSale }
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
                        defaultValue={ description }
                        value={ description }
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
                        <Upload setImage={ setImage } value={ image } />
                    </div>
                </div>
                <div className='d-flex justify-content-end'>
                    <Button onClick={ handleOk } icon={ <SaveFilled /> } title='Lưu'>{ loading ? <Spin></Spin> : "Lưu" }</Button>
                </div>
            </Modal >
        </>
    );
};
export default ModalEditProduct;