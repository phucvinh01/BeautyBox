import React, { useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card, Rate, Button, Modal, Space, Statistic } from 'antd';
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
import moment from 'moment';
const { Countdown } = Statistic;
const Product = (props) => {
    const sumRating = _.sumBy(props.reviews && props.reviews, 'rating');
    const avg = _.round(sumRating / (props.reviews && props.reviews.length));
    const dispatch = useDispatch();


    return (
        <>
            <div
                className='col-lg-3 col-md-6 col-sm-12 mb-3' hidden={ props.status ? false : true }
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
                    {
                        props?.discount?.number > 0 && <div className='card-info-discount'>
                            { props?.discount?.number }%
                        </div>
                    }

                    <div className='card-content p-0 text-center'>
                        <div className='card-content-inner'>
                            <p className=''>{ props?.brand }</p>
                            <p className='card-content__decsrciption'>{ props?.name }</p>
                            <Space>
                                { props?.discount?.number > 0 ? <><p className='card-content__price'>
                                    { formatCurrency.format(props?.price) }
                                </p>
                                    <p className='text-muted' style={ { "textDecorationLine": 'line-through' } }>
                                        { formatCurrency.format(props?.priceSale) }
                                    </p></> : <p className='card-content__price'>
                                    { formatCurrency.format(props?.priceSale) }
                                </p>
                                }

                            </Space>
                        </div>
                    </div>
                    <div
                        className='btn-quick mb-3'>
                        <ModalDetail state={ props } isAdmin={ false } />
                    </div>
                    {/* <div>
                        <p>Thời gian còn lại</p>
                        <Countdown title="Countdown" value={ props?.discount?.timeEnd } />
                    </div> */}
                </Card>
            </div>
        </>
    );
};

export default Product;
