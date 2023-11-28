import React, { useEffect, useId, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, message, Select, Space, Steps, theme } from 'antd';
import { ListProvinces } from '../axios/VnProvinces';
import Axios from '../axios/Axios';
import axios from 'axios';

import { isEmpty } from 'lodash';
import formatCurrency from '../util/formatCurrency';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Breadcrumb, Radio } from 'antd';
import { postNewOrder } from '../axios/OrderRequest'
import { Empty } from '../axios/CartRequest';
import { emptyCartSuccess } from '../redux/cartSlice';
import { Helmet } from 'react-helmet';
const Checkout = (props) => {
    const cart = useSelector((state) => state.cart.cart.data);
    const user = useSelector((state) => state.auth.login.currentUser);

    const id = useId();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    message.config({
        top: 300,
        duration: 2,
        maxCount: 3,
        rtl: true,
        prefixCls: 'my-message',
    });

    const [listprovinces, setListProvinces] = useState([]);
    const [listDistricts, setListDistricts] = useState([]);
    const [listWards, setListWards] = useState([]);
    const [provinceCode, setProvinceCode] = useState(0);
    const [districtCode, setDistrictCode] = useState(0);

    const [nameCity, setNameCity] = useState("");
    const [nameDistrict, setNameDistrict] = useState("");
    const [nameWard, setNameWard] = useState("");
    const [detail, setDetail] = useState("");
    const [infoFisrtName, setInfoFisrtName] = useState('')
    const [infoLasttName, setInfoLastName] = useState('')
    const [infoPhone, setInfoPhone] = useState('')
    const [infoEmail, setInfoEmail] = useState('')
    const [methodShip, setMethodShip] = useState('')
    const [note, setNote] = useState("");

    const [methodPayment, setMethodPayment] = useState("COD")


    const handleSubmit = async () => {
        if (!nameCity && !nameDistrict && !nameWard && !detail) {
            message.error("Thiếu thông tin giao hàng")
        }
        if (methodPayment === 'VNPAY') {
            try {
                const response = await Axios.post('/v1/order/vnpay/create-payment', {
                    amount: cart?.subTotal, // Số tiền thanh toán (đơn vị VNĐ)
                    description: 'Payment description',
                });
                console.log(response);
                window.location.href = response.paymentUrl;
            } catch (error) {
                console.log(error);
            }
        }
        else {
            const shippingInfor = `${detail}, ${nameWard}, ${nameDistrict}, ${nameCity}`
            let r = await postNewOrder(cart, user._id, shippingInfor, note, cart.subTotal, methodShip)
            if (r.status) {
                let l = await Empty(user._id)
                if (l.code === 200) {
                    dispatch(emptyCartSuccess(l.data))
                    message.success("Đặt hàng thành công")
                    navigate('/order')
                }
            }
            else {
                message.error("Đặt hàng thất bại")
                return
            }

        }
    }

    function getValue(e) {
        return e.target.children[e.target.selectedIndex].getAttribute('data-name');
    }

    const getProvinces = async () => {
        let res = await ListProvinces();
        if (res) {
            setListProvinces(res);
        }
    };

    const getDistricts = async (provinceCode) => {
        let res = await axios.get(
            `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
        );
        if (res) {
            setListDistricts(res.data?.districts);
        }
    };

    const getWards = async (districtCode) => {
        let res = await axios.get(
            `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
        );
        if (res) {
            setListWards(res.data?.wards);
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
    return (
        <div className='container mt-3'>
            <Helmet>
                <title> Thanh toán</title>
            </Helmet>
            <Breadcrumb className='mb-3'
                items={ [
                    {
                        title: <Link to={ '/' }>Trang chủ</Link>,
                    },
                    {
                        title: <span>Thanh toán</span>,
                    },
                ] }
            />
            <section>
                <h3>Thông tin thanh toán</h3>

            </section>
            <div className='row mb-3'>
                <div className='col-lg-7 col-md-7 col-sm-12'>
                    <section>
                        <h4>Thông tin người mua hàng</h4>
                        <div className='row'>
                            <div className='col-12 mb-3'>
                                <div className='d-flex gap-3'>
                                    <input disabled onChange={ (e) => setInfoFisrtName(e.target.value) } value={ user.lastName } placeholder='Tên' className='form-control w-100 p-2'></input>
                                    <input disabled onChange={ (e) => setInfoLastName(e.target.value) } value={ user.firstName } placeholder='Họ' className='form-control w-100 p-2'></input>
                                </div>
                            </div>
                            <div className='col-12 mb-3'>
                                <div className='d-flex gap-3'>
                                    <input disabled onChange={ (e) => setInfoEmail(e.target.value) } value={ user.email } placeholder='Email' className='form-control w-100 p-2'></input>
                                    <input disabled onChange={ (e) => setInfoPhone(e.target.value) } value={ user.phone } placeholder='Số điện thoại' className='form-control w-100 p-2'></input>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <h4>Thông tin nhận hàng</h4>
                        <div className='row'>
                            <div className='col-12 mb-3'>
                                <div className='d-flex gap-3'>
                                    <select
                                        required
                                        onChange={ (e) => { setProvinceCode(e.target.value), setNameCity(getValue(e)) } }
                                        value={ provinceCode }
                                        className='form-control'
                                        id={ id + '-provinces' }>
                                        <option
                                            key={ 0 }
                                            value={ 0 }>
                                            Tỉnh/Thành phố
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
                            </div>
                            <div className='col-12 mb-3'>
                                <div className='d-flex gap-3'>
                                    <select
                                        required
                                        onChange={ (e) => { setDistrictCode(e.target.value), setNameDistrict(getValue(e)) } }
                                        value={ districtCode }
                                        className='form-control'
                                        id={ id + '-District' }>
                                        <option
                                            key={ 0 }
                                            value={ 0 }>
                                            Quận/Huyện
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
                                        { listWards &&
                                            listWards.map((item) => {
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
                                </div>
                            </div>
                            <div className='col-12 mb-3'>
                                <input onChange={ (e) => setDetail(e.target.value) } className='form-control' placeholder='Tên địa chỉ (vd: Văn phòng, Nhà,...)'></input>
                            </div>
                        </div>
                    </section>
                    <section>
                        <h4>Phương thức thanh toán</h4>
                        <div className='col-12 mb-3'>
                            <div className='p-2 border rounded-3'>
                                <Radio.Group defaultValue={ 'COD' } onChange={ (e) => setMethodPayment(e.target.value) }>
                                    <Space direction='vertical'>
                                        <Radio value={ "COD" } checked={ true }>Trả tiền mặt khi nhận hàng</Radio>
                                        <Radio value={ "VNPAY" } disabled >Thanh toán online VNPAY (Tính năng đang được phát triển)</Radio>
                                    </Space>
                                </Radio.Group>
                            </div>
                        </div>
                    </section>
                    <section>
                        <h4>Phương thức vẫn chuyển</h4>
                        <Radio.Group defaultValue={ 'GH24H' } onChange={ (e) => setMethodShip(e.target.value) }>
                            <div className='col-12 mb-3'>
                                <div className='p-2 border rounded-3'>
                                    <Radio checked={ true } className='w-100' value={ "GH24H" } >Giao hàng trong 24h (Giao giờ hành chính)</Radio>
                                </div>
                            </div>
                            <div className='col-12 mb-3'>
                                <div className='p-2 border rounded-3'>
                                    <Radio className='w-100' value={ "GHTC" } >Giao hàng tiêu chuẩn (3 - 6 ngày) (Giao giờ hành chính)</Radio>
                                </div>
                            </div>
                            <div className='col-12 mb-3'>
                                <div className='p-2 border rounded-3'>
                                    <Radio className='w-100' value={ "NOW" } >[NOW] Giao hàng nhanh trong vòng 2h</Radio>
                                </div>
                            </div>
                        </Radio.Group>
                    </section>
                    <section>
                        <h4>Ghi chú</h4>
                        <div>
                            <textarea onChange={ (e) => setNote(e.target.value) } className='form-contro mb-3 w-100'>

                            </textarea>
                        </div>
                    </section>
                </div>
                <div className='col-lg-5 col-md-5 col-sm-12' >
                    <div className='shadow border rounded-3 p-3' style={ { position: "sticky", top: "100px" } }>
                        <h4>Đơn hàng</h4>
                        { cart && cart?.items?.length > 0 && cart.items.map((item, index) => {
                            return (
                                <>
                                    <div className='d-flex p-0 m-3 gap-3   ' key={ index } >
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
                        <hr></hr>
                        <div className='d-flex justify-content-between mb-3'>
                            <p>Tổng giá trị đơn hàng</p>
                            <p>{ formatCurrency.format(cart?.subTotal) }</p>
                        </div>
                        <div className='d-flex justify-content-between mb-3'>
                            <p>Phí vận chyển</p>
                            <p>{ formatCurrency.format(0) }</p>
                        </div>
                        <hr></hr>
                        <div className='d-flex justify-content-between mb-3'>
                            <p>Tổng (đã bao gồm VAT)</p>
                            <p>{ formatCurrency.format(cart?.subTotal) }</p>
                        </div>
                        <div>
                            <button onClick={ handleSubmit } className='w-100 btn-primary-main p-2'>ĐẶT HÀNG</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Checkout;
