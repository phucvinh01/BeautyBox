import React from 'react'
import './footer.scss'
import { useLocation } from 'react-router-dom'

const Footer = () => {

  const location = useLocation();
  return (
    <>

      <div className='container'>
        <section>
          <div className='box-gmail row'>
            <div className='col-lg-6 col-md-12 col-sm-12'>
              <h4>NHẬN BẢN TIN LÀM ĐẸP</h4>
              <p>Đừng bỏ lỡ hàng ngàn sản phẩm và chương trình siêu hấp dẫn</p>
            </div>
            <div className='col-lg-6 col-md-12 col-sm-12'>
              <div className='box-gmail-input mx-auto'>
                <input placeholder='Điền email của bạn' type='email' autoComplete='null'></input>
                <button>THEO DÕI</button>
              </div>
            </div>
          </div>
        </section>
        <div className='row'>
          <div className='col-lg-3 col-md-6 col-sm-12 footer-col'>
            <img src='https://image.hsv-tech.io/300x0/bbx/common/50a26167-9341-4be8-8aba-9682d3b4a916.webp' width={ 200 } className='mb-3'></img>
            <div className='footer-social mb-5 d-flex gap-3'>
              <i className="fa-brands fa-facebook fs-5"></i>
              <i className="fa-brands fa-tiktok fs-5"></i>
              <i className="fa-brands fa-instagram fs-5"></i>
            </div>
            <p className='p-0 mb-3'><strong>Việt Nam</strong></p>
            <img src='https://beautybox.com.vn/images/verified.png' width={ 120 } className='p-0'></img>
          </div>
          <div className='col-lg-2 col-md-6 col-sm-12 footer-col'>
            <h5>VỀ</h5>
            <p>Câu chuyện thương hiệu</p>
            <p>Về chúng tôi</p>
            <p>Liên hê</p>
          </div>
          <div className='col-lg-2 col-md-6 col-sm-12 footer-col'>
            <h5>CHÍNH SÁCH</h5>
            <p>Chính sách chung và qui định chung</p>
            <p>Chính sách và giao nhận thanh toán</p>
            <p>Chính sách đổi trả sản phẩm</p>
            <p>Chính sách bảo mật thông tin cá nhân</p>
            <p>Điều khoản sử dụng</p>
          </div>
          <div className='col-lg-2 col-md-6 col-sm-12 footer-col'>
            <h5>CHÍNH SÁCH</h5>
            <p>Chính sách chung và qui định chung</p>
            <p>Chính sách và giao nhận thanh toán</p>
            <p>Chính sách đổi trả sản phẩm</p>
            <p>Chính sách bảo mật thông tin cá nhân</p>
            <p>Điều khoản sử dụng</p>
          </div>
          <div className='col-lg-2 col-md-6 col-sm-12 footer-col'>
            <h5>CHÍNH SÁCH</h5>
            <p>Chính sách chung và qui định chung</p>
            <p>Chính sách và giao nhận thanh toán</p>
            <p>Chính sách đổi trả sản phẩm</p>
            <p>Chính sách bảo mật thông tin cá nhân</p>
            <p>Điều khoản sử dụng</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer