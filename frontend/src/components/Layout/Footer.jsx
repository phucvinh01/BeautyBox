import React from 'react'
import './footer.scss'

const Footer = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-3 col-md-6 col-sm-12 footer-col'>
            <img src='https://th.bing.com/th/id/R.4ef21f9876d4988ee1e382d780a92ffb?rik=eHvz6%2bhQOCiadA&pid=ImgRaw&r=0' width={ 200 } className='mb-3'></img>
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