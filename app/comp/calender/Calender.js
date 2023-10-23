"use client"
import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { getYear, getMonth, getDate, getDay } from 'date-fns'; // datepicker에서 주는 날짜객체의 날짜 받는 법 // npm 이나 git에 이런 거 가이드 안나옴 // 검색해서 찾아보삼
import "react-datepicker/dist/react-datepicker.css";
import Link from 'next/link'
import axios from "axios";
import { useRouter } from 'next/navigation';
import { Mycontext } from "@/app/Context";


export default function Calender() {
    const {setVisual} = useContext(Mycontext);

    const [startDate, setStartDate] = useState(new Date());
    const [item, setItem] = useState([]);
    const navigation = useRouter();

    const ListShowFun = async () => {
        let currentMember = JSON.parse(localStorage.getItem('member_info'));
        let dateStr = `${getYear(startDate)}-${getMonth(startDate)+1}-${getDate(startDate)}`;
    
        const data = await axios.get(`/api/journal?currentId=${currentMember.id}&selectDate=${dateStr}`);
        console.log('DB에서 가져온 거: ', data.data);
        setItem([...data.data]);
    }//ListShowFun() 함수정의 //async을 useEffect의 콜백함수에 쓸 수 없어서 이렇게 씀

    const dayOffsetFun = (day) => {
        const firstDay = new Date(day);
        const today = new Date();
        const num = Math.ceil((today - firstDay) / (24*60*60*1000));

        return num;
    }//dayOffsetFun() 함수정의

    const toJournal = (obj) => {
        let currentMember = JSON.parse(localStorage.getItem('member_info'));

        // navigation.push({pathname: url, query: {}})로 보내는 방법은 
        // next12에서는 되는데 next13부터 안된다고 함
        navigation.push(`/page/calender/calenderRead?id=${currentMember.id}&plantNick=${obj.plantNick}&journalDate=${obj.journalDate}`); 
    }//toJournal() 함수정의

    useEffect(()=>{
        setVisual('noHeader');
    }, []);
    useEffect(() => {ListShowFun()}, [startDate]);
  
  return (
    <>    
        <div className='calenderWrapper'>
            <div className="contentsWrapper">
                <i className="calenderIcon ri-calendar-2-fill"/>
                <DatePicker dateFormat='yyyy년 MM월 dd일' selected={startDate} onChange={(date) => setStartDate(date)} />
                <button type="button" className="toPlantType">
                    <i className="ri-plant-line"/>식물별 기록
                </button>
            </div>
        </div>
        <ul className="recordItemsWrapper">
            {
                item.map((obj, k)=>(
                    <li key={k} className="recordItem" onClick={()=>{toJournal(obj)}}>
                        <div className="leftWrapper">
                            <i className="imgWrapper">
                                <img src={obj.img} alt="첫번째 사진 이미지"/>
                            </i>
                            <strong className="plantNick">{obj.plantNick}</strong>
                            <b className="plantName">{obj.plantName}</b>
                        </div>

                        <div className="rightWrapper">
                            <dl className="firstGroup">
                                <dt>처음 쓴 날짜</dt>
                                <dd>{obj.journalDate}</dd>
                            </dl>
                            <span className="dayOffset">D+{dayOffsetFun(obj.journalDate)}</span>
                        </div>
                    </li>
                ))
            }
        </ul>

        <Link href="./calender/calenderWrite" className='addJournal'>
            <i className="ri-add-line" />
        </Link>
    </>
  )
}
