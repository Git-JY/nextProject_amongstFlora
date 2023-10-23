"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useRouter } from 'next/navigation';
import axios from 'axios';
// import { Mycontext } from '@/app/Context';

export default function CalenderRead({id, plantNick, journalDate}) {
    //console.log('가져오심???: ', id, plantNick, journalDate);
    let [selectedDate, setSelectedDate] = useState(journalDate);
    const [journalObj, setJournalObj] = useState([]);
    const plantJournalArr = useRef([]);
    const elSelectDate = useRef();

    const navigation = useRouter();

    const takeObjFun = async () => { 
        const data = await axios.get(`/api/journal/journalRead?currentId=${id}&plantNick=${plantNick}`);
        console.log('DB에서 가져온 거: ', data.data);
        
        plantJournalArr.current = data.data;
        const currentObj = plantJournalArr.current.filter((obj)=>{
            if(obj.journalDate == selectedDate) return obj;
        })
        
        setJournalObj(currentObj[0]);
    }//ListShowFun() 함수정의 //async을 useEffect의 콜백함수에 쓸 수 없어서 이렇게 씀

    useEffect(() => {takeObjFun()}, [selectedDate]);

    const dayOffsetFun = (day) => {
        const firstDay = new Date(day);
        const today = new Date();
        const num = Math.ceil((today - firstDay) / (24*60*60*1000));

        return num;
    }//dayOffsetFun() 함수정의

    const selectObjChangeFun = (e) => {
        const currentObj = plantJournalArr.current.filter((obj)=>{
            if(obj.journalDate == e.target.value) return obj;
        })
        setSelectedDate(currentObj[0]);
    }//selectObjChangeFun() 함수정의

    const deleteFun = async () => {
        const date = elSelectDate.current.value;

        if(plantJournalArr.current.length-1 <= 0){
            navigation.push(`/page/calender`);
        }else{
            console.log('dddddd', plantJournalArr);
            let deletedArr = plantJournalArr.current.filter((obj)=>{
                if(obj.journalDate != date) return obj;
            })
            setJournalObj(deletedArr[0]);
        }
        const data = await axios.get(`/api/journal/journalRead/delete?currentId=${id}&plantNick=${plantNick}&selectDate=${date}`);
        console.log(data.data);
    }//deleteFun() 함수정의


  return (
    <>
        <div className='ReadImgSwiperWrapper'> 
            <Swiper 
            className="ReadImgSwiper"
            navigation={true} 
            modules={[Navigation]}
            loop={true} 
            >
                <SwiperSlide>
                    <img src={journalObj.img} alt='식물 사진1'/>
                </SwiperSlide>
            
            </Swiper>
        </div>

        <div className='contentsWrapper'>
            <form className='contentsHeadWrapper'>
                <select name='plantDate' className='plantDate' onChange={selectObjChangeFun} ref={elSelectDate}>
                    {
                        plantJournalArr.current.map((obj, k)=>(
                            <option key={k} value={obj.journalDate}>{obj.journalDate}</option>
                        ))
                    }
                </select>

                <div className='nameWrapper'>
                    <strong className='plantNick'>{journalObj.plantNick}</strong>
                    <b className='plantName'>{journalObj.plantName}</b>
                </div>

                <div className="dateInfoWrapper">
                    <dl className="firstGroup">
                        <dt>내용을 쓴 날짜</dt>
                        <dd>{journalObj.journalDate}</dd>
                    </dl>
                    <span className="dayOffset">D+{dayOffsetFun(journalObj.journalDate)}</span>
                </div>
            </form>

            <div className='textWrapper'>
                {journalObj.journalMemo}
            </div>
        </div>

        <div className='btnWrapper'>
            <button type='button' className='modifyRecord'>
                <i className="ri-pencil-line" />
            </button>
            <button type='button' className='deleteRecord' onClick={deleteFun}>
                <i className="ri-delete-bin-line" />
            </button>
        </div>
    </>
  )
}
