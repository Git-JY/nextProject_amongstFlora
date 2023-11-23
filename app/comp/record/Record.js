"use client"
import React, { useContext, useEffect, useRef, useState } from "react";
import Link from 'next/link'
import axios from "axios";
import { useRouter } from 'next/navigation';
import { Mycontext } from "@/app/Context";

import DatePicker from "react-datepicker";
import { getYear, getMonth, getDate, getDay } from 'date-fns'; // datepicker에서 주는 날짜객체의 날짜 받는 법 // npm 이나 git에 이런 거 가이드 안 나옴 // 검색해서 찾아보삼
import "react-datepicker/dist/react-datepicker.css";



export default function Calender() {
    const {setVisual} = useContext(Mycontext);

    const [startDate, setStartDate] = useState(new Date()),
          [item, setItem] = useState([]),
          [typeMode, setTypeMode] = useState(false);
    
    const navigation = useRouter();
    let myMemberInfo = useRef();

    const ListShowFun = async () => {
        const dateStr = `${getYear(startDate)}-${getMonth(startDate)+1}-${getDate(startDate)}`;
    
        const data = await axios.get(`/api/record?currentId=${myMemberInfo.current.id}&selectDate=${dateStr}`);
        console.log('DB에서 가져온 거: ', data.data);
        setTypeMode(false);
        setItem(data.data);
    }//ListShowFun() 함수정의 //async을 useEffect의 콜백함수에 쓸 수 없어서 이렇게 씀

    const dayOffsetFun = (day) => {
        const firstDay = new Date(day);
        const today = new Date();
        let num = Math.ceil((today - firstDay) / (24*60*60*1000));

        if(num >= 0) num = '+' + num;

        return num;
    }//dayOffsetFun() 함수정의

    const toRecord = (obj) => {
        // navigation.push({pathname: url, query: {}})로 보내는 방법은 
        // next12에서는 되는데 next13부터 안된다고 함

        navigation.push(`/page/record/recordRead?id=${myMemberInfo.current.id}&plantNick=${obj.plantNick}&recordDate=${obj.recordDate}`); 
    }//toRecord() 함수정의

    const sliceFun = (srcStr='') => {
        const arr = srcStr.split('.....');
        console.log('사진들 잘 배열로 나눠졌나 확인!: ', arr);

        return arr[0];      
    }//sliceFun() 함수정의

    const changePlantTypeFun = async () => {
        const data = await axios.post('/api/record', {currentId: myMemberInfo.current.id});
        console.log(data.data);

        setItem(data.data);
        setTypeMode(true);
    }//changePlantTypeFun() 함수정의


    
    useEffect(()=>{
        setVisual('noHeader');
        myMemberInfo.current = JSON.parse(localStorage.getItem('member_info'));
    }, []);

    useEffect(() => {
        ListShowFun();
    }, [startDate]);
  
  return (
    <>    
        <div className='calenderWrapper'>
            <div className="contentsWrapper">
                <i className="calenderIcon ri-calendar-2-fill"/>
                <DatePicker dateFormat='yyyy년 MM월 dd일' selected={startDate} onChange={(date) => setStartDate(date)} />
                <button type="button" className="toPlantType" onClick={changePlantTypeFun}>
                    <i className="ri-plant-line"/>식물별 기록
                </button>
            </div>
        </div>

        <ul className="recordItemsWrapper">
            {
                item.map((obj, k)=>(
                    <li key={k} className="recordItem" onClick={()=>{toRecord(obj)}}>
                        
                        <div className="leftWrapper">
                            <i className="imgWrapper">
                                {
                                    typeMode ? (
                                    obj.thumImg ? <img src={obj.thumImg} alt="첫번째 사진 이미지"/> : '') 
                                    : (
                                    obj.img ? <img src={sliceFun(obj.img)} alt="첫번째 사진 이미지"/> : '')
                                } 
                            </i>
                            <strong className="plantNick">{obj.plantNick}</strong>
                            <b className="plantKind">{obj.plantKind}</b>
                        </div>

                        <div className="rightWrapper">
                            <dl className="firstGroup">
                                <dt>{typeMode ? '최근 기록 날짜' : '기록 날짜'}</dt>
                                <dd>{typeMode ? obj.latestDate : obj.recordDate}</dd>
                            </dl>
                            <span className="dayOffset">
                                D{ dayOffsetFun(typeMode ? obj.latestDate : obj.recordDate)}
                                {/* D{ typeMode ? dayOffsetFun(obj.latestDate) :  dayOffsetFun(obj.recordDate)} */}
                            </span>
                        </div>
                    </li>
                ))
            }
        </ul>

        <Link href="./record/recordWrite" className='addRecord'>
            <i className="ri-add-line" />
        </Link>
    </>
  )
}
