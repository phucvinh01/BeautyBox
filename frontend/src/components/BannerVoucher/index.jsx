import React from 'react'
import Slider from "react-slick";
const BannerVoucher = () => {

    const data = [
        "https://image.hsv-tech.io/1920x914/bbx/common/b95bad0e-038d-4903-a440-db162b4f557a.webp",
        "https://image.hsv-tech.io/1920x914/bbx/common/ca0519fb-ecbc-4f94-8ae7-00ed1fb51caf.webp",
        "https://image.hsv-tech.io/1920x914/bbx/common/cf976481-2b36-437a-bb61-9220c12c7c7e.webp"
    ]

    const settings = {
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 1000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <>
            <div className='position-relative'>
                <Slider { ...settings }>
                    {
                        data && data.map((item, index) => {
                            return (
                                <div key={ index }>
                                    <img className='w-100 rounded px-1' src={ item }></img>
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
        </>
    )
}

export default BannerVoucher