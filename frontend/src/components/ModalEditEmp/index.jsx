import React, { useEffect, useState } from 'react';
import { Button, Modal, message } from 'antd';
import { EditFilled, InsertRowLeftOutlined, PlusCircleFilled, SaveOutlined } from '@ant-design/icons';
import { postCreateEmp, postEditEmp } from '../../axios/EmpRequest';
import { getDataEmp } from '../../redux/api';
import { useDispatch } from 'react-redux';
import moment from 'moment'
const ModalEditEmp = (props) => {

    const { data } = props

    const dispatch = useDispatch()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [hireDay, setHireDay] = useState("")
    const [address, setAddress] = useState("")
    const [role, setRole] = useState(1)
    const [phone, setPhone] = useState("")
    const [cICard, setCICard] = useState("")
    const [isFull, setIsFull] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setId(data._id)
        setName(data.name)
        setEmail(data.email)
        setDateOfBirth(moment(data.dateOfBirth).format("YYYY-MM-DD"))
        setHireDay(moment(data.hireDay).format("YYYY-MM-DD"))
        setAddress(data.address)
        setRole(data.account.role)
        setPhone(data.phone)
        setCICard(data.CICard)
        setpassword(data.password)
    }, [isModalOpen])

    useEffect(() => {
        if (name && email, dateOfBirth, hireDay, address, role, phone) {
            setIsFull(true)
        }
    }, [name, email, dateOfBirth, hireDay, address, role, phone])

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
            dateOfBirth: dateOfBirth,
            hireDay: hireDay,
            address: address,
            account: {
                isActive: true,
                role: Number(role)
            },
            CICard: cICard,
            phone: phone
        }
        console.log(body);
        let r = await postEditEmp(id, body)
        if (r.status === 400) {
            message.error(`Chỉnh sửa nhân viên ${name} thất bại`)
            setIsLoading(false)
            return
        }
        else {
            message.success(`Chỉnh sửa viên ${name} thành công`)
            setIsLoading(false)
            getDataEmp(dispatch)
            handleCancel()
        }
    }
    return (
        <>
            <Button icon={ <EditFilled /> } onClick={ showModal }>
            </Button>
            <Modal footer={ null } centered title="Chỉnh sửa thông tin nhân viên" open={ isModalOpen } onOk={ handleOk } onCancel={ handleCancel }>
                <div className='row'>
                    <p >Mã nhân viên: <span className='text-danger'>{ id }</span></p>
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
                            <input disabled className='form-control' type='password' value={ password } onChange={ (e) => setpassword(e.target.value) } />
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
                    <div className='col-12 mb-3'>
                        <label>Căn cước công dân</label>
                        <input className='form-control' type='text' value={ cICard } onChange={ (e) => setCICard(e.target.value) } />
                    </div>
                </div>
                <div className='d-flex justify-content-end'>
                    <Button disabled={ !isFull ? true : false } loading={ isLoading ? true : false } onClick={ handleSave } icon={ <SaveOutlined /> } style={ { color: "white", backgroundColor: "black" } }>Lưu</Button>
                </div>
            </Modal>
        </>
    );
};
export default ModalEditEmp;