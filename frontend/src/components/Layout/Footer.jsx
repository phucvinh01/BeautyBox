import React from 'react'
import './footer.scss'

const Footer = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-3 col-md-6 col-sm-12 footer-col'>
            <img src='https://image.hsv-tech.io/300x0/bbx/common/50a26167-9341-4be8-8aba-9682d3b4a916.webp' width={200} className='mb-3'></img>
            <div className='footer-social mb-5 d-flex gap-3'>
              <i className="fa-brands fa-facebook fs-5"></i>
              <i className="fa-brands fa-tiktok fs-5"></i>
              <i className="fa-brands fa-instagram fs-5"></i>
            </div>
            <p className='p-0 mb-3'><strong>Việt Nam</strong></p>
            <img src='https://beautybox.com.vn/images/verified.png' width={120} className='p-0'></img>
          </div>
          <div className='col-lg-2 col-md-6 col-sm-12 footer-col'>
            <h5>VỀ BEAUTY BOX</h5>
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
            <h5>MY BEAUTY BOX</h5>
            <p>Quyền lợi thành viên</p>
            <p>Thông tin thành viên</p>
            <p>Theo dõi đơn hàng</p>
            <p>Hướng dẫn mua hàng online</p>
          </div>
          <div className='col-lg-3 col-md-6 col-sm-12 footer-col'>
            <h5>Đối TÁC - LIÊN KẾT</h5>
            <p>THE FACE SHOP VIETNAM</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer