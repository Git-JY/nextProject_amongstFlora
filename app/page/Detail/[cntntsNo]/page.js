"use client"; // page에 하면 next(이럴거면 차라리 react를 쓰지)를 쓰는 의미가 없어질 뿐 page에 사용해도 되긴 함
import Detail from '@/app/comp/deail/Detail'
import React, { useContext } from 'react'
import { useParams } from 'next/navigation'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Mycontext } from '@/app/Context';

export default function page() {
  const {imgsToDetail} = useContext(Mycontext);
  const param = useParams(); //cntntsNo 받아오기 // param.cntntsNo

  return (
    <div className='detail'>
      <Swiper 
      className="plantImgSwiper"
      modules={[Pagination]} 
      loop={true} 
      pagination={{
          clickable: true
      }}
      >
        {
          imgsToDetail.current.map((url, k)=>(
            <SwiperSlide key={k}>
              <img src={url} alt={`식물 사진${k}`}/>
            </SwiperSlide>
          ))
        }
        
      </Swiper>
      <Detail cntntsNo={param.cntntsNo}/>
    </div>
  )
}
