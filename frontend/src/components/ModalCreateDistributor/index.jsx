import React, { useEffect, useId, useState } from 'react';
import { Button, Modal, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import Axios from '../../axios/Axios'
import { ListProvinces } from '../../axios/VnProvinces';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postCreateDistributor } from '../../axios/DistributorRequest';
import { getDataListDistributor } from '../../redux/api';
const ModalCreateDistributor = () => {

    const id = useId();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [contactPerson, setContactPerson] = useState("")
    const [email, setEmail] = useState("")
    const [isLoading, setLoading] = useState(false)


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
        let res = await Axios.get(
            `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
        );
        if (res) {
            setListDistricts(res.districts);
        }
    };

    const getWards = async (districtCode) => {
        let res = await Axios.get(
            `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
        );
        if (res) {
            setListWards(res.wards);
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

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {

        if (!name || !phone || !contactPerson || !email) {
            message.error('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        setLoading(true)
        let body = {
            name: name,
            phoneNumber: phone,
            contactPerson: contactPerson,
            email: email,
            address: `${detail}, ${nameWard}, ${nameDistrict}, ${nameCity}`
        }

        let r = await postCreateDistributor(body)
        if (r.status) {
            message.success("Thêm thành công")
            setLoading(false)
            getDataListDistributor(dispatch)
            setIsModalOpen(false);
        }
        else {
            message.error("Thêm thất bại")
            setLoading(false)
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            <Button icon={ <PlusCircleOutlined /> } onClick={ showModal }>Thêm một nhà phân phối</Button>
            <Modal title="Thêm một nhà phân phối" okButtonProps={ {
                loading: isLoading
            } } open={ isModalOpen } onOk={ handleOk } onCancel={ handleCancel }>
                <div className='row'>
                    <div className='col-6'>
                        <div className='mb-3'>
                            <label>Tên nhà phân phối</label>
                            <input className='form-control' type='text' value={ name } onChange={ (e) => setName(e.target.value) } />
                        </div>
                        <div className='mb-3'>
                            <label>Số điện thoại</label>
                            <input minLength={ 0 } maxLength={ 11 } className='form-control' type='tel' value={ phone } onChange={ (e) => setPhone(e.target.value) } />
                        </div>
                        <div className='mb-3'>
                            <label>Người đại diện</label>
                            <input className='form-control' type='text' value={ contactPerson } onChange={ (e) => setContactPerson(e.target.value) } />
                        </div>
                        <div className='mb-3'>
                            <label>Email</label>
                            <input className='form-control' type='email' required value={ email } onChange={ (e) => setEmail(e.target.value) } />
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='mb-3'>
                            <label>Tỉnh/Thành phố</label>
                            <select
                                required
                                onChange={ (e) => { setProvinceCode(e.target.value), setNameCity(getValue(e)) } }
                                value={ provinceCode }
                                className='form-control'
                                id={ id + '-provinces' }>

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
                            <label>Quận/huyện</label>
                            <select
                                required
                                onChange={ (e) => { setDistrictCode(e.target.value), setNameDistrict(getValue(e)) } }
                                value={ districtCode }
                                className='form-control'
                                id={ id + '-District' }>

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
                            <label>Phường/Xã</label>
                            <select
                                required
                                onChange={ (e) => setNameWard(getValue(e)) }
                                className='form-control'
                                id={ id + '-ward' }>

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
                        <div className='mb-3'>
                            <label>Số nhà, Tên đường</label>
                            <input onChange={ (e) => setDetail(e.target.value) } className='form-control' placeholder='Tên địa chỉ (vd: Văn phòng, Nhà,...)'></input>
                        </div>
                    </div>
                </div>

            </Modal>
        </>
    );
};
export default ModalCreateDistributor;