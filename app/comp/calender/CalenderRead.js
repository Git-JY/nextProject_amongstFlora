"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
// import { Pagination } from 'swiper/modules';
// import { Mycontext } from '@/app/Context';

export default function CalenderRead() {
  return (
    <>
        <div className='ReadImgSwiperWrapper'> 
            <Swiper 
            className="ReadImgSwiper"
            navigation={true} 
            modules={[Navigation]}
            loop={true} 
            >
                <SwiperSlide /* key={k} */>
                    <img src='/img/background.jpg' alt='식물 사진1'/>
                    {/* <img src={url} alt={`식물 사진${k}`}/> */}
                </SwiperSlide>
                <SwiperSlide >
                    <img src='/img/backImg.jpg' alt='식물 사진2'/>
                </SwiperSlide>
                <SwiperSlide >
                    <img src='/img/testImg.jpg' alt='식물 사진3'/>
                </SwiperSlide>
            
            </Swiper>
        </div>

        <div className='contentsWrapper'>
            <form className='contentsHeadWrapper'>
                <select name='plantDate' className='plantDate'>
                    <option value="2023/04/01">2023/04/01</option>
                    <option value="2023/04/02">2023/04/02</option>
                    <option value="2023/04/03">2023/04/03</option>
                </select>

                <div className='nameWrapper'>
                    <strong className='plantNick'>귀염새싹</strong>
                    <b className='plantName'>가울테리아</b>
                </div>

                <div className="dateInfoWrapper">
                    <dl className="firstGroup">
                        <dt>처음 쓴 날짜</dt>
                        <dd>2023/10/13</dd>
                    </dl>
                    <span className="dayOffset">D+1</span>
                </div>
            </form>

            <div className='textWrapper'>
            </div>
        </div>

        <div className='btnWrapper'>
            <button type='button' className='modifyRecord'>
                <i className="ri-pencil-line" />
            </button>
            <button type='button' className='deleteRecord'>
                <i className="ri-delete-bin-line" />
            </button>
        </div>
    </>
  )
}
