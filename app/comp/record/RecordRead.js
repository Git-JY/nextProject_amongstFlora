"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Mycontext } from '@/app/Context';
// import { Mycontext } from '@/app/Context';

export default function CalenderRead({id, plantNick, recordDate}) {
    console.log('가져오심???: ', id, plantNick, recordDate);
    const {setVisual} = useContext(Mycontext);

    const selectedDate = useRef(recordDate),
          elSelectDate = useRef(),
          [dateWrapper, setDateWrapper] = useState([]),
          [recordObj, setRecordObj] = useState([]);

    const navigation = useRouter();


    // async을 useEffect의 콜백함수에 쓸 수 없어서 이렇게 씀
    const takeObjFun = async () => { 
        const data = await axios.get(`/api/record/recordRead?currentId=${id}&plantNick=${plantNick}&recordDate=${selectedDate.current}`);
        console.log('DB에서 가져온 거: ', data.data);
        
        setRecordObj(data.data);
    }//ListShowFun() 함수정의 

    const takeDateFun = async () => {
        const dateArr = await axios.post('/api/record/recordRead', {currentId: id, plantNick: plantNick});
        setDateWrapper(dateArr.data);
    }//takeDateFun() 함수정의

    const sliceFun = (srcStr='') => {
        let arr = srcStr.split('.....');
        
        return arr;
  
    }//sliceFun() 함수정의

    const dayOffsetFun = (day) => {
        const firstDay = new Date(day);
        const today = new Date();
        let num = Math.ceil((today - firstDay) / (24*60*60*1000));

        if(num >= 0) num = '+' + num;

        return num;
    }//dayOffsetFun() 함수정의

    const selectObjChangeFun = (e) => {
        selectedDate.current = e.target.value;

        takeObjFun();
    }//selectObjChangeFun() 함수정의

    const deleteFun = async () => {
        const currentDate = elSelectDate.current.value;

        if(plantRecord.current.length-1 <= 0){
            navigation.push(`/page/record`);
        }else{
            console.log('dddddd', plantRecord);
            let deletedArr = plantRecord.current.filter((obj)=>{
                if(obj.recordDate != date) return obj;
            })
            setRecordObj(deletedArr[0]);
        }
        const data = await axios.get(`/api/record/recordRead/delete?currentId=${id}&plantNick=${plantNick}&selectDate=${currentDate}`);
        console.log(data.data);
    }//deleteFun() 함수정의

    const modifyFun = async () => {
        navigation.push('/page/record/recordModify');
        
    }//modifyFun() 함수정의

    useEffect(() => {
        setVisual('noHeader');

        takeDateFun();
        takeObjFun();
    }, []);

  return (
    <>
        <div className='readImgSwiperWrapper'> 
        {
            // 이미지가 있나, 없나)
            recordObj.img != '' ? (
            <Swiper 
            className="readImgSwiper"
            navigation={true} 
            modules={[Navigation]}
            loop={true} 
            >      
            {
                sliceFun(recordObj.img).map((src, k) => (
                    <SwiperSlide key={k}>
                        <img src={src} alt={`${recordObj.plantNick} ${k+1}번째 사진`}/>
                    </SwiperSlide>
                )) 
            }   
            </Swiper>
            ) : (
            <figure className='noImg'>
                <i>
                    <img src='/img/noImg.svg' alt='등록된 이미지가 없습니다. 카메라 엑스 사진' />
                </i>
                <figcaption>
                    등록된 이미지가 없습니다.
                </figcaption>
            </figure>               
            )
        }
        </div>

        <div className='contentsWrapper'>
            <div className='contentsHeadWrapper'>
                <select name='plantDate' className='plantDate' onChange={selectObjChangeFun} ref={elSelectDate}>
                    {
                        dateWrapper.map((dateItem, k)=>(
                            <option key={k} value={dateItem}>{dateItem}</option>
                        ))
                    }
                </select>

                <div className='nameWrapper'>
                    <strong className='plantNick'>{recordObj.plantNick}</strong>
                    <b className='plantName'>{recordObj.plantKind}</b>
                </div>

                <div className="dateInfoWrapper">
                    <dl className="firstGroup">
                        <dt>내용을 쓴 날짜</dt>
                        <dd>{recordObj.recordDate}</dd>
                    </dl>
                    <span className="dayOffset">D{dayOffsetFun(recordObj.recordDate)}</span>
                </div>
            </div>

            <div className='textWrapper'>
                {recordObj.mainTxt}
            </div>
        </div>

        <div className='btnWrapper'>
            <button type='button' className='modifyRecord' onClick={modifyFun}>
                <i className="ri-pencil-line" />
            </button>
            <button type='button' className='deleteRecord' onClick={deleteFun}>
                <i className="ri-delete-bin-line" />
            </button>
        </div>
    </>
  )
}
