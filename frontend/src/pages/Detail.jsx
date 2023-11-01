import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getSearchBySlug } from '../axios/ProductRequest';
import BannerVoucher from '../components/BannerVoucher';
import { Breadcrumb, Button, Divider, Empty, Progress, Radio, Rate, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getCart } from '../redux/api';
import _, { countBy } from 'lodash';
import formatCurrency from '../util/formatCurrency';
import './Detail.scss'

const Detail = () => {
    const path = useParams();
    const [products, setProducts] = useState({});
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch()

    const user = useSelector((state) => state.auth.login.currentUser);
    const getProducts = async (path) => {
        let res = await getSearchBySlug(path.slug)
        if (res.success) {
            setProducts(res.data)
        }
    }
    useEffect(() => {
        getProducts(path);
    }, [path])

    const sumRating = _.sumBy(products.reviews && products.reviews, 'rating');
    const avg = _.round(sumRating / (products.reviews && products.reviews.length));

    const handleAddToCart = () => {
        addToCart(products?._id, user?._id, quantity, dispatch)
        getCart(user?._id, dispatch)
    }
    return (
        <main className='container'>
            <div className='row p-2 detail'>
                <div className='col-5'>
                    <img className='w-100' src={ products.img } alt='>products'></img>
                </div>
                <div className='col-7'>
                    <div className='container mt-4'>
                        <Space direction='vertical'>
                            <Breadcrumb
                                items={ [
                                    {
                                        title: <Link to={ '/' }>Trang chủ</Link>,
                                    },
                                    {
                                        title: <span>Sản phẩm</span>,
                                    },
                                ] }
                            />
                            <p className='text-danger fs-16'>{ products.brand }</p>
                            <p className='fs-20'>{ products.name }</p>
                            <Space size={ "large" }>
                                <span>
                                    <Rate value={ avg } disabled className='fs-14' />
                                    { <span>{ `(${sumRating})` }</span> }
                                </span>
                                <p><strong>Xuất xứ:</strong></p>
                                <p><strong>SKU: </strong>{ products?._id?.match(/[0-9]+/g).join("") }</p>
                            </Space>
                            <Space size={ "large" } align='center' >
                                <p className='fs-20 fw-bolder'>{ formatCurrency.format(products.price) }</p>
                                <p className='fs-18 text-muted' style={ { textDecorationLine: "line-through" } }>{ formatCurrency.format(products.priceSale) }</p>
                                <div className='tag'>{ products.discount }%</div>
                            </Space>
                            <div className='detal-order__method mb-3 fs-14'>
                                <h6>Hình thức mua hàng</h6>
                                <Radio checked>Giao hàng</Radio>
                            </div>
                            <div className='d-flex mb-3 gap-3'>
                                <div className='input-quantity'>
                                    <button className='btn' onClick={ () => setQuantity(quantity + 1) }><i className="fa-solid fa-plus"></i></button>
                                    <input type='number' value={ quantity } disabled={ true } min={ 1 } max={ products.in_stock }></input>
                                    <button className='btn' disabled={ quantity > 1 ? false : true } onClick={ () => setQuantity(quantity - 1) }><i className="fa-solid fa-minus"></i></button>
                                </div>
                                <div>
                                    {
                                        user ? <button button className='btn btn-dark p-2 mt-1' onClick={ handleAddToCart }>
                                            <i className="fa-solid fa-cart-plus mx-1"></i>
                                            <span>Thêm vào giỏ hàng</span>
                                        </button> : <p className='p-2 mt-1'>Hãy đăng nhập để thêm vào giỏ hàng</p>
                                    }
                                </div>
                            </div>
                        </Space>
                    </div>
                </div>
                <section className='container'>
                    <Divider />
                </section>
                <div className='container'>
                    <div className='row p-3'>
                        <div className='col-5'>
                            <h2>Giới thiệu</h2>
                        </div>
                        <div className='col-7'>
                            <Space size={ 'middle' } direction='vertical'>
                                <p className='fs-16' style={ { textAlign: "justify" } }>
                                    { products.description }
                                </p>
                                <p className='fs-16' style={ { textAlign: "justify" } }>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, velit, incidunt inventore quidem iste quos doloribus ea tempore qui suscipit consequuntur cupiditate quae reiciendis est vitae officiis adipisci, rem sit!
                                </p>
                                <p className='fs-16' style={ { textAlign: "justify" } }>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, velit, incidunt inventore quidem iste quos doloribus ea tempore qui suscipit consequuntur cupiditate quae reiciendis est vitae officiis adipisci, rem sit!
                                </p>
                            </Space>

                        </div>
                    </div>
                </div>
                <section className='container'>
                    <Divider />
                </section>
                <div className='container'>
                    <div className='row p-3'>
                        <div className='col-5 p-4'>
                            <div className='d-flex justify-content-between mb-3'>
                                <h4>{ sumRating } ĐÁNH GIÁ</h4>
                                <h4>VIẾT ĐÁNH GIÁ</h4>
                            </div>
                            <div className='mb-3'>
                                <Rate className='rate' style={ { fontSize: 30 } } value={ avg } disabled></Rate>
                            </div>
                            <div className='mb-3' direction='vertical'>
                                <div className='d-flex gap-2 align-items-center mb-2'>
                                    <span className='fs-18'>5</span>
                                    <Progress percent={ (products?.reviews?.length / countBy(products?.reviews?.rating, 5)) * 100 } />
                                    {/* <span className='fs-18'>{ countBy(products?.reviews?.rating, 5) }</span> */ }
                                </div>
                                <div className='d-flex gap-2 align-items-center mb-2'>
                                    <span className='fs-18'>4</span>
                                    <Progress percent={ (products?.reviews?.length / countBy(products?.reviews?.rating, 5)) * 100 } />
                                    {/* <span className='fs-18'>{ countBy(products?.reviews?.rating, 4) }</span> */ }
                                </div>
                                <div className='d-flex gap-2 align-items-center mb-2'>
                                    <span className='fs-18'>3</span>
                                    <Progress percent={ (products?.reviews?.length / countBy(products?.reviews?.rating, 5)) * 100 } />
                                    {/* <span className='fs-18'>{ countBy(products?.reviews?.rating, 3) }</span> */ }
                                </div>
                                <div className='d-flex gap-2 align-items-center mb-2'>
                                    <span className='fs-18'>2</span>
                                    <Progress percent={ (products?.reviews?.length / countBy(products?.reviews?.rating, 5)) * 100 } />
                                    {/* <span className='fs-18'>{ countBy(products?.reviews?.rating, 2) }</span> */ }
                                </div>
                                <div className='d-flex gap-2 align-items-center mb-2'>
                                    <span className='fs-18'>1</span>
                                    <Progress percent={ (products?.reviews?.length / countBy(products?.reviews?.rating, 5)) * 100 } />
                                    {/* <span className='fs-18'>{ countBy(products?.reviews?.rating, 1) }</span> */ }
                                </div>
                            </div>
                        </div>
                        <div className='col-7'>
                            <Empty />
                        </div>
                    </div>
                </div>
            </div>
            <section>
                <BannerVoucher />
            </section>
        </main>

    )
}

export default Detail