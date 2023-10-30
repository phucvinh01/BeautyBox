import React, { useEffect, useState } from 'react'
import BannerSlide from '../components/BannerSlide'
import BrandSlide from '../components/BrandSlide'
import SlideProduct from '../components/SlideProduct'
import Banner2 from '../components/BannerSlide-2';
import { useSelector } from 'react-redux';
import { Card, Col, Row } from 'antd';
import './Home.scss'
import { Link } from 'react-router-dom';
const Home = () => {

    const banner1 = [
        "https://image.hsv-tech.io/1920x640/bbx/common/3785937c-40ed-4127-b8b4-f41f8310d429.webp",
        "https://image.hsv-tech.io/1920x640/bbx/common/cfe921b9-6e4b-440e-81a7-6e2165f02107.webp",
        "https://image.hsv-tech.io/1920x640/bbx/common/2730cf2c-fe48-460f-b719-cc6ea97895b0.webp"
    ]

    const banner2 = [
        "https://image.hsv-tech.io/1920x914/bbx/common/b95bad0e-038d-4903-a440-db162b4f557a.webp",
        "https://image.hsv-tech.io/1920x914/bbx/common/ca0519fb-ecbc-4f94-8ae7-00ed1fb51caf.webp",
        "https://image.hsv-tech.io/1920x914/bbx/common/cf976481-2b36-437a-bb61-9220c12c7c7e.webp"
    ]

    const cate = useSelector((state) => state.category.category.data);
    const [categories, setCategories] = useState([])


    useEffect(() => {
        if (cate) {
            setCategories(cate?.slice(4))
        }
    }, [cate]);

    return (
        <>
            <main className='container-fluid px-5 mt-3'>
                {/* banener */ }
                <section>
                    <div className='row'>
                        <div className='col-8'>
                            <BannerSlide />
                        </div>
                        <div className='col-4'>
                            <div className='mb-2 rounded'>
                                <img className='rounded w-100' src='https://image.hsv-tech.io/1920x0/bbx/common/63f285de-8b04-4ff7-b7ee-820cbd34db9a.webp' ></img>
                            </div>
                            <div className='rounded'>
                                <img className='rounded w-100' src='https://image.hsv-tech.io/1920x0/bbx/common/7ab1f99c-cc2c-4550-ab59-8ba90fecdf6f.webp' ></img>
                            </div>
                        </div>
                    </div>
                </section>
                {/* brand */ }
                <section className='mb-4'>
                    <BrandSlide />
                </section>

                <section>
                    <h3 className='text-center mb-3'>TOP SẢN PHẨM MỚI</h3>
                    <SlideProduct />
                </section>
                <section>
                    <div className='silde-discount-banner'>
                        <Banner2 data={ banner1 } />
                    </div>
                </section>

                <section>
                    <h3 className='text-center'>DANH MỤC NỔI BẬT</h3>
                    <Row>
                        {
                            categories && categories.length > 0 && categories.map((item, index) => {
                                return (
                                    <Col span={ 3 }>
                                        <Link to={ `/category/${item.path}` }>
                                            <Card
                                                hoverable
                                                style={ {
                                                    width: 130,
                                                    padding: 10,
                                                    marginBottom: 10
                                                } }
                                                cover={ <img alt="example" src={ item.logo } /> }
                                            >
                                                <p className="d-block" style={ { fontSize: 12, height: 20 } }>{ item.name }</p>
                                            </Card>
                                        </Link>

                                    </Col>

                                )
                            })
                        }
                    </Row>
                </section>
                <section>
                    <div className='silde-trending-banner'>
                        <Banner2 data={ banner2 } />
                    </div>
                </section>
            </main>
        </>
    )
}

export default Home