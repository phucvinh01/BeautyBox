import React, { useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card, Rate, Button, Modal, Space } from 'antd';
const { Meta } = Card;
import './product.scss';
import formatCurrency from '../../util/formatCurrency';
import _ from 'lodash';
import { deleteProduct } from '../../axios/ProductRequest';
import { toast } from 'react-toastify';
import { getProductList } from '../../redux/api';
import { useDispatch, useSelector } from 'react-redux';
import ModalEdit from '../ModelEdit';
import ModalDetail from '../ModalDetail';
import Item from 'antd/es/list/Item';
const Product = (props) => {
    const sumRating = _.sumBy(props.reviews && props.reviews, 'rating');
    const avg = _.round(sumRating / (props.reviews && props.reviews.length));
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [stateEdit, setStateEdit] = useState({});
    const [stateProduct, setStateProduct] = useState({})

    const handleEdit = (props) => {
        setOpenEdit(true);
        setStateEdit(props);
    };

    const handleShowDetail = (props) => {
        setOpenDetail(true)
        setStateProduct(props)
    }


    const showModal = (type) => {
        switch (type) {
            case 'EDIT':
                setOpenEdit(true);
                break;
            case 'DEL':
                setOpen(true);
                break;
            case 'DETAIL':
                setOpenDetail(true);
                break;
            default:
                break;
        }
    };
    const handleOk = () => {
        setOpen(false);
    };

    const handleCancel = (type) => {
        switch (type) {
            case 'EDIT':
                setOpenEdit(false);
                break;
            case 'DEL':
                setOpen(false);
                break;
            case 'DETAIL':
                setOpenDetail(false);
                break;
            default:
                break;
        }
    };

    const handleDelete = async (id) => {
        let res = await deleteProduct(id);
        if (res.success) {
            toast.success('Deleted.......');
            getProductList(dispatch);
        } else {
            toast.error('Delete failed.......');
        }
    };

    return (
        <>
            <Modal
                open={ open }
                onOk={ handleOk }
                onCancel={ () => handleCancel('DEL') }
                footer={ false }>
                <strong className='text-danger'>Delete?</strong>
                <p>
                    Bạn có chắc muốn xóa <strong>{ props.name }</strong>?
                </p>
                <div className='d-flex p-3 gap-3 justify-content-end'>
                    <button
                        className='btn btn-info'
                        onClick={ handleCancel }>
                        Hủy
                    </button>
                    <button
                        className='btn btn-danger'
                        onClick={ () => handleDelete(props._id) }>
                        Xóa
                    </button>
                </div>
            </Modal>

            <ModalDetail
                open={ openDetail }
                onOk={ handleOk }
                onCancel={ () => handleCancel('DETAIL') }
                footer={ false }
                state={ stateProduct }
                user={ props.user && props.user }
            />

            <ModalEdit
                handleCancel={ handleCancel }
                openEdit={ openEdit }
                state={ stateEdit }
            />

            <div
                className='col-lg-3 col-md-6 col-sm-12 mb-3'
                key={ props._id }>
                <Card
                    bordered={ false }
                    className='position-relative card-product'
                    hoverable
                    style={ {
                        width: 220,
                    } }
                    cover={
                        <img
                            loading='lazy'
                            alt='example'
                            src={ props?.img }
                            style={ { height: '200px' } }
                        />
                    }>
                    <div className='card-content p-0 text-center'>
                        <div className='card-content-inner'>
                            <p className=''>{ props?.brand }</p>
                            <p className='card-content__decsrciption'>{ props?.name }</p>
                            <p className='card-content__price'>
                                { formatCurrency.format(props?.price) }
                            </p>
                            <p>Số lượng còn lại: <strong>{ props?.stock }</strong> </p>
                        </div>
                    </div>
                    <button hidden={ props?.user?.role === 1 ? true : false }
                        className='btn-quick'
                        onClick={ () => handleShowDetail(props) }>
                        <span>XEM NHANH</span>
                    </button>
                    { props?.user?.role === 1 && (
                        <div className='d-flex p-3 gap-2'>
                            <Button
                                block
                                danger
                                onClick={ () => showModal('DEL') }>
                                <DeleteOutlined />
                            </Button>
                            <Button
                                block
                                onClick={ () => handleEdit(props) }>
                                <EditOutlined />
                            </Button>
                        </div>
                    ) }
                </Card>
            </div>
        </>
    );
};

export default Product;
