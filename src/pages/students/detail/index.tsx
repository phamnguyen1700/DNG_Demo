import React from 'react'
import {  useParams } from 'react-router-dom';
import PaidIcon from '@mui/icons-material/Paid';
import SchoolIcon from '@mui/icons-material/School';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './slide.css';
import Tabs from '../Component/TabData';
const Detail: React.FC = () => {
    // Example data for the carousel
    const contacts = [
      { relation: 'Cha', name: 'nguyen', phone: '0123454345', email: '--' },
      { relation: 'Mẹ', name: 'tran', phone: '0987654321', email: 'example@gmail.com' }
    ];
  
    // Slick carousel settings
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };


  const params = useParams();
  console.log(params)
  return (
      <div>
        Chi tiết học viên detail = {params?.id}
        <div className='container flex justify-between space-x-4'>
          <div className='detail-container w-1/3 border border-gray-200 rounded shadow-md'>
            <div className='flex space-x-8 py-4 px-4'>
              <div className='avt w-24 flex justify-center'>
                <img className='rounded-full' src='https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'></img>
              </div>
              <div className='background-detail text-sm w-3/4 p-4'>
                <div>Họ và tên: name</div>
                <div className='flex justify-between'>
                  <div>Ngày sinh: date</div>
                  <div>Giới tính: gender</div>
                </div>
                <div>Số điện thoại: phone</div>
              </div>
            </div>
            <div className='study-detail flex px-4  space-x-4'>
              <div className='flex text-left space-x-4'>
                <div className='logo pt-2'>
                  <SchoolIcon/>
                </div>
                <div className='dt'>
                  <div className='text-center'>1</div>
                  <div>Khóa học tham gia</div>
                </div>
              </div>
              <div className='flex text-left space-x-4'>
                <div className='logo pt-2'>
                  <PaidIcon/>
                </div>
                <div className='dt'>
                  <div className='text-center'>30,000,000</div>
                  <div>Số tiền đã đóng</div>
                </div>
                </div>
              </div>
            <div className='study-detail p-4'>
              <div className='study-detail-head flex justify-between w-full border-b border-gray-300'>
                <div>Chi tiết học viên</div>
                <button className='edit-button'>
                  <ModeEditOutlineIcon/>
                </button>
              </div>
              <div className='study-detail-body pt-2'>
                <div>
                  Mã học viên: --
                </div>
                <div>
                  Mã hồ sơ: --
                </div>
                <div>
                  Email: --
                </div>
                <div>
                  CCCD/CMND: --
                </div>
                <div>
                  Ngày cấp: --
                </div>
                <div>
                  Địa chỉ liên hệ: --
                </div>
              </div>
            </div>
            <div className='relative p-4'>
              <div className='relative-head flex justify-between border-b border-gray-300'>
                <div>Người liên hệ</div>
                <div>
                  <button className='edit-button px-1'>
                    <ModeEditOutlineIcon/>
                  </button>
                  <button className='add-button px-1'>
                    <AddCircleIcon/>
                  </button>
                </div>
              </div>
            <Slider {...settings}>
              {contacts.map((contact, index) => (
                <div key={index} className='relative-body pt-2'>
                  <div className='flex justify-between'>
                  <div className='relative-body-detail'>
                    <div>Quan hệ: {contact.relation}</div>
                    <div>Họ và tên: {contact.name}</div>
                    <div>Số điện thoại: {contact.phone}</div>
                    <div>Email: {contact.email}</div>
                  </div>
                  <div className='relative-body-delete'>
                    <button className='delete-button'>
                      <DeleteForeverIcon />
                    </button>
                  </div>
                  </div>
                </div>
              ))}
            </Slider>
            </div>
          </div>
          <div className='w-2/3 border border-gray-200 rounded'>
            <Tabs/>
          </div>
        </div>
      </div>
  )
}

export default Detail;

