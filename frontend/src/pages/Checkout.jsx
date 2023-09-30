import React, { useEffect, useId, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, message, Select, Steps, theme } from 'antd';
import { ListProvinces } from '../axios/VnProvinces';
import Axios from 'axios';
import { isEmpty } from 'lodash';
import formatCurrency from '../util/formatCurrency';
import { useNavigate } from 'react-router-dom';
const Checkout = (props) => {
    const cart = useSelector((state) => state.cart.cart.data);
    const id = useId();
    const navigate = useNavigate();

    const [current, setCurrent] = useState(0);
    const [listprovinces, setListProvinces] = useState([]);
    const [listDistricts, setListDistricts] = useState([]);
    const [listWards, setListWards] = useState([]);
    const [provinceCode, setProvinceCode] = useState(0);
    const [ward, setWards] = useState('');
    const [districtCode, setDistrictCode] = useState(0);

    const [nameCity, setNameCity] = useState("");
    const [nameDistrict, setNameDistrict] = useState("");
    const [nameWard, setNameWard] = useState("");
    const [detail, setDetail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [note, setNote] = useState("");
    const [enable, setEnable] = useState(false)

    function getValue(e) {
        return e.target.children[e.target.selectedIndex].getAttribute('data-name');
    }

    // useEffect(() => {
    //     if (isEmpty(nameCity) || isEmpty(nameDistrict) || isEmpty(nameWard) || isEmpty(name) || isEmpty(phone)) {
    //         setEnable(true)
    //     }
    // }, [nameCity, nameDistrict, nameWard, name, phone])

    const getProvinces = async () => {
        let res = await ListProvinces();
        if (res) {
            setListProvinces(res);
        }
    };

    const getDistricts = async (provinceCode) => {
        let res = await Axios.get(
            `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
        );
        if (res) {
            setListDistricts(res.data.districts);
        }
    };

    const getWards = async (districtCode) => {
        let res = await Axios.get(
            `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
        );
        if (res) {
            setWards(res.data.wards);
        }
    };

    useEffect(() => {
        if (provinceCode) {
            getDistricts(provinceCode);
        }
        if (districtCode) {
            getWards(districtCode);
        }
    }, [provinceCode, districtCode]);

    useEffect(() => {
        getProvinces();
    }, []);

    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const contentStyle = {
        marginTop: 16,
    };
    const steps = [
        {
            title: 'Thông tin vận chuyển',
            content: (
                <>
                    <div className='container'>
                        <div className='form-control'>
                            <div className='row'>
                                <div className='col-6'>
                                    <form className='p-1'>
                                        <div className='mb-3'>
                                            <label
                                                htmlFor={ id + '-provinces' }
                                                className='form-label fw-bolder text-start'>
                                                Tỉnh/Thành Phố
                                            </label>
                                            <select
                                                required
                                                onChange={ (e) => { setProvinceCode(e.target.value), setNameCity(getValue(e)) } }
                                                value={ provinceCode }
                                                className='form-control'
                                                id={ id + '-provinces' }>
                                                <option
                                                    key={ 0 }
                                                    value={ 0 }>
                                                    Chọn thành phố
                                                </option>
                                                { listprovinces &&
                                                    listprovinces.map((item) => {
                                                        return (
                                                            <option
                                                                data-name={ item.name }
                                                                key={ item.code }
                                                                value={ item.code }>
                                                                { item.name }
                                                            </option>
                                                        );
                                                    }) }
                                            </select>
                                        </div>
                                        <div className='mb-3'>
                                            <label
                                                htmlFor={ id + '-listDistricts' }
                                                className='form-label fw-bolder text-start'>
                                                Huyện/Quận
                                            </label>
                                            <select
                                                required
                                                onChange={ (e) => { setDistrictCode(e.target.value), setNameDistrict(getValue(e)) } }
                                                type='text'
                                                value={ districtCode }
                                                className='form-control'
                                                id={ id + '-listDistricts' }>
                                                <option

                                                    key={ 0 }
                                                    value={ 0 }>
                                                    Chọn huyện/quận
                                                </option>
                                                { listDistricts &&
                                                    listDistricts.map((item) => {
                                                        return (
                                                            <option
                                                                data-name={ item.name }
                                                                key={ item.code }
                                                                value={ item.code }>
                                                                { item.name }
                                                            </option>
                                                        );
                                                    }) }
                                            </select>
                                        </div>
                                        <div className='mb-3'>
                                            <label
                                                htmlFor={ id + '-ward' }
                                                className='form-label fw-bolder text-start'>
                                                Xã/Phường
                                            </label>
                                            <select
                                                required
                                                onChange={ (e) => setNameWard(getValue(e)) }
                                                className='form-control'
                                                id={ id + '-ward' }>
                                                <option
                                                    key={ 0 }
                                                    value={ 0 }>
                                                    Chọn Xã/Phường
                                                </option>
                                                { ward &&
                                                    ward.map((item) => {
                                                        return (
                                                            <option
                                                                data-name={ item.name }
                                                                title={ item.name }
                                                                key={ item.code }
                                                                value={ item.code }>
                                                                { item.name }
                                                            </option>
                                                        );
                                                    }) }
                                            </select>
                                            <div className='mb-3'>
                                                <label
                                                    htmlFor={ id + '-detail-address' }
                                                    className='form-label fw-bolder text-start'>
                                                    Số nhà, Ấp/Tên đường
                                                </label>
                                                <input className='form-control' type='text' id={ id + '-detail-address' } onChange={ (e) => setDetail(e.target.value) } />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className='col-6'>
                                    <div className='mb-3'>
                                        <label
                                            htmlFor={ id + '-name' }
                                            className='form-label fw-bolder text-start'>
                                            Họ Tên
                                        </label>
                                        <input required onChange={ (e) => setName(e.target.value) } id={ id + '-name' } type='text' className='form-control' />
                                    </div>
                                    <div className='mb-3'>
                                        <label
                                            htmlFor={ id + '-phone' }
                                            className='form-label fw-bolder text-start'>
                                            Số điện thoại
                                        </label>
                                        <input required onChange={ (e) => setPhone(e.target.value) } id={ id + '-phone' } type='tel' className='form-control' />
                                    </div>
                                    <div className='mb-3'>
                                        <label
                                            htmlFor={ id + '-note' }
                                            className='form-label fw-bolder text-start'>
                                            Ghi chú
                                        </label>
                                        <textarea required onChange={ (e) => setNote(e.target.value) } id={ id + '-note' } className='form-control' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ),
        },
        {
            title: 'Kiểm tra thông tin',
            content: <>
                <div className='row'>
                    <div className='col-6 rounded-1 border' >
                        <h2 className='text-center'>Thông tin vận chuyển</h2>
                        <p>Họ và tên: { name }</p>
                        <p>Số điện thoại: { phone }</p>
                        <p>Địa chỉ: { detail } ,{ nameWard }, { nameDistrict }, { nameCity }</p>
                    </div>
                    <div className='col-6 rounded-1 border'>
                        <h2 className='text-center'>Đơn hàng</h2>
                        { cart && cart?.items?.length > 0 && cart.items.map((item, index) => {
                            return (
                                <>
                                    <div className='d-flex p-0 mb-3 gap-3   ' key={ index } >
                                        <img src={ item.img } className='rounded-1' width={ "60px" } height={ "80px" } alt={ item.img }></img>
                                        <div className='d-gird justify-content-between'>
                                            <p className='m-0 p-0'>{ item.name }</p>
                                            <div className='text-start'>
                                                <p className='m-0 p-0'>Số lượng: { item.quantity }</p>
                                                <p className='m-0 p-0 text-danger'>{ formatCurrency.format(item.price) }</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }) }
                        <div className='text-end mb-3'>
                            <p className='m-0'>Đơn hàng: { formatCurrency.format(cart.subTotal) }</p>
                            <p className='m-0'>Ship: { formatCurrency.format(cart.subTotal / 100 * 10) }</p>
                            <p className='m-0 text-danger fw-bolder'>Tổng: { formatCurrency.format(cart.subTotal + (cart.subTotal / 100 * 10)) }</p>
                        </div>
                    </div>
                </div>
            </>,
        },
    ];

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));
    return (
        <>
            <div className='container px-5 mt-5'>
                <Steps
                    current={ current }
                    items={ items }
                />
                <div style={ contentStyle }>{ steps[current].content }</div>
                <div className='d-flex justify-content-end mb-5'
                    style={ {
                        marginTop: 24,
                    } }>
                    { current < steps.length - 1 && (
                        <div>
                            <Button

                                disabled={ enable ? true : false }
                                type='primary'
                                onClick={ () => next() }>
                                Next
                            </Button>
                        </div>

                    ) }
                    { current > 0 && (
                        <div>
                            <Button
                                style={ {
                                    margin: '0 8px',
                                } }
                                onClick={ () => prev() }>
                                Previous
                            </Button>
                        </div>
                    ) }
                    { current === steps.length - 1 && (
                        <div>
                            <Button
                                type='primary'
                                onClick={ () => { message.success('Đặt hàng thành công!'), navigate('/me/order') } }>
                                Done
                            </Button>
                        </div>
                    ) }

                </div>
            </div>
        </>
    );
};

export default Checkout;
