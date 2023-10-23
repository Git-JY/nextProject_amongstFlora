"use client"
import DatePicker from "react-datepicker";
import { getYear, getMonth, getDate, getDay } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from 'next/navigation';

import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { Mycontext } from "@/app/Context";

export default function CalenderWrite() {
    const {setVisual} = useContext(Mycontext);
    useEffect(()=>{
        setVisual('noHeader');
    }, []);

    const [startDate, setStartDate] = useState(new Date());
    const [plantImg, setPlantImg] = useState([]);
    const navigation = useRouter();

    const plantJournalDataFun = (e) => {
        e.preventDefault();
        const elForm = e.target;
        
        let fd = {
            plantNick: elForm.plantNick.value, // 식물별칭
            plantName: elForm.plantName.value, // 식물이름
            journalMemo: elForm.journalMemo.value, //메인메모
            journalDate: `${getYear(startDate)}-${getMonth(startDate)+1}-${getDate(startDate)}`,
        }
        
        const reader = new FileReader();
        console.log('타입: ',elForm.plantImg.files);
        reader.readAsDataURL(elForm.plantImg.files[0]);// 읽는데 시간이 걸림
        
        reader.addEventListener('load', () => {//이미지를 읽는 시간
            console.log('reader.result', reader.result);
            fd.plantImg = reader.result;

            console.log('폼 데이터 객체: ');
            console.log(fd);

            let currentMember = JSON.parse(localStorage.getItem('member_info'));
    
            axios.post('/api/journal/journalWrite', {formData: fd, currentId: currentMember.id});
            navigation.push('/page/calender');

    
        })//reader.addEventListener('load', fun)



    }//plantJournalDataFun() 함수정의

  return (
    <form className='contents' onSubmit={plantJournalDataFun}>
        
        <div className='dateWrapper'>
            <span className='explanationTxt'>기록할 날짜를 정해주세요.</span>
            <div className='inputWrapper'>
                <i className='icon ri-calendar-2-fill'/>
                <DatePicker dateFormat='yyyy년 MM월 dd일' selected={startDate} onChange={(date) => setStartDate(date)}/>
            </div>
        </div>
        
        
        <div className='nickWrapper inputAllWrapper'>
            <span className='explanationTxt'>
                식물의 별칭을 넣어주세요
                <i className="infoIcon ri-information-line" title="별칭은 식물을 구별하는 키가 됩니다. 이미 한 번 썼던 식물 이름은 다시 쓸 수 없습니다."/>
            </span>
            <div className='inputWrapper'>
                <label className='icon ri-leaf-line' htmlFor='plantNick' />
                <input type="text" name="plantNick" id="plantNick" maxLength='20' placeholder="(필수) * 0~20까지 가능합니다."/>
            </div>
        </div>
        
        
        <div className='nameWrapper inputAllWrapper'>
            <span className='explanationTxt'>식물의 이름을 넣어주세요</span>
            <div className='inputWrapper'>
                <label className='icon ri-seedling-line' htmlFor='plantName' />
                <input type="text" name="plantName" id="plantName" maxLength='20' placeholder="(필수) * 0~20까지 가능합니다."/>
            </div>
        </div>
        
        
        <div className='mainTxtWrapper'>
            <span className='explanationTxt'>본문을 넣어주세요.</span>
            <textarea name="journalMemo" id="journalMemo" maxLength='600' placeholder="(필수) 최소 0~600자 까지 작성 가능합니다."/>
        </div>


        <div className='ImgWrapper'>
            <div className='inputWrapper'>
                <label className='icon ri-camera-line' htmlFor='plantImg' />
                <input type="file" name="plantImg" id="plantImg" multiple accept="image/jpeg, image/png"
                onChange={(e) => {
                    console.log('e.target.value: ');
                    console.log(e.target.value);
                    let reader = [];

                    console.log('파일 개수: ', e.target.files); // 여러개 선택했을 때 늘어남
                    // console.log('파일 개수: ', plantImg.length+1);

                    if(plantImg.length+1 <= 3){
                    
                        for(let i = 0; i < e.target.files.length; i++){
                            reader[i] = new FileReader();// 사진 1개당 1개 //사진 문자열 만드려고 만듦
                            reader[i].readAsDataURL(e.target.files[i]);

                            reader[i].onload = (loadE) => {
                                console.log('reader.onload(loadE)', loadE);
                                console.log('e.target.result', loadE.target.result);
                                setPlantImg([...plantImg, loadE.target.result]);
                                
                            }//reader.onload
                        }//for
                    }else{
                        console.log('넘어섬??');
                        // let firstFile = e.target.files[4];
                        e.target.value = '';
                        setPlantImg([]);
                    }

                }}
                />
                <span className="imgLimit"><code>{plantImg.length}</code>/3</span>
            </div>
            <ul>
                {
                    plantImg.map((imgSrc, k)=>(
                        <li key={k}>
                            <img src={imgSrc}/>
                        </li>
                    ))
                }
            </ul>
        </div>

        <button className="submitBtn">
            <i className="icon ri-edit-2-line" />
            등록하기
        </button>
    </form>
  )
}
