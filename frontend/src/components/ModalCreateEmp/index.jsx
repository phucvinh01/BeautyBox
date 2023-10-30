import React, { useEffect, useState } from 'react';
import { Button, Modal, message } from 'antd';
import { InsertRowLeftOutlined, PlusCircleFilled, SaveOutlined } from '@ant-design/icons';
import { postCreateEmp } from '../../axios/EmpRequest';
import { getDataEmp } from '../../redux/api';
import { useDispatch } from 'react-redux';
const ModalCreateEmp = () => {

    const dispatch = useDispatch()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [hireDay, setHireDay] = useState("")
    const [address, setAddress] = useState("")
    const [role, setRole] = useState(1)
    const [phone, setPhone] = useState("")
    const [isFull, setIsFull] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (name && email, password, dateOfBirth, hireDay, address, role, phone) {
            setIsFull(true)
        }
    }, [name, email, password, dateOfBirth, hireDay, address, role, phone])

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleSave = async () => {
        setIsLoading(true)
        let body = {
            name: name,
            email: email,
            password: password,
            dateOfBirth: dateOfBirth,
            hireDay: hireDay,
            address: address,
            account: {
                isActive: true,
                role: Number(role)
            },
            phone: phone
        }
        console.log(body);

        let r = await postCreateEmp(body)
        console.log(r);
        if (r.status === 400) {
            message.error(`Thêm nhân viên ${name} thất bại`)
            setIsLoading(false)
            return

        }
        else {
            message.success(`Thêm nhân viên ${name} thành công`)
            setIsLoading(false)
            getDataEmp(dispatch)
            handleCancel()
        }
    }
    return (
        <>
            <Button icon={ <PlusCircleFilled /> } onClick={ showModal }>
                Thêm một nhân viên
            </Button>
            <Modal footer={ null } centered title="Thêm một nhân viên" open={ isModalOpen } onOk={ handleOk } onCancel={ handleCancel }>
                <div className='row'>
                    <div className='col-lg-6 col-sm-12'>
                        <div className='mb-3'>
                            <label>Tên nhân viên</label>
                            <input className='form-control' value={ name } onChange={ (e) => setName(e.target.value) } />
                        </div>
                        <div className='mb-3'>
                            <label>Ngày sinh</label>
                            <input className='form-control' type='date' value={ dateOfBirth } onChange={ (e) => setDateOfBirth(e.target.value) } />
                        </div>
                        <div className='mb-3'>
                            <label>Địa chỉ</label>
                            <input className='form-control' value={ address } onChange={ (e) => setAddress(e.target.value) } />
                        </div>
                        <div className='mb-3'>
                            <label>Ngày vào làm</label>
                            <input className='form-control' type='date' value={ hireDay } onChange={ (e) => setHireDay(e.target.value) } />
                        </div>
                    </div>
                    <div className='col-lg-6 col-sm-12'>
                        <div className='mb-3'>
                            <label>Email</label>
                            <input className='form-control' value={ email } type='email' onChange={ (e) => setEmail(e.target.value) } />
                        </div>
                        <div className='mb-3'>
                            <label>Số điện thoại</label>
                            <input className='form-control' type='tel' maxLength={ 11 } value={ phone } onChange={ (e) => setPhone(e.target.value) } />
                        </div>
                        <div className='mb-3'>
                            <label>Mật khẩu</label>
                            <input className='form-control' type='password' value={ password } onChange={ (e) => setpassword(e.target.value) } />
                        </div>
                        <div className='mb-3'>
                            <label>Chức vụ</label>
                            <select className='form-control' value={ role } onChange={ (e) => setRole(e.target.value) } >
                                <option value={ 1 }>
                                    Nhân viên
                                </option>
                                <option value={ 2 }>
                                    Admin
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-end'>
                    <Button disabled={ !isFull ? true : false } loading={ isLoading ? true : false } onClick={ handleSave } icon={ <SaveOutlined /> } style={ { color: "white", backgroundColor: "black" } }>Thêm</Button>
                </div>
            </Modal>
        </>
    );
};
export default ModalCreateEmp;