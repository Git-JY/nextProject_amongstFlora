"use client"
import { useContext, useEffect, useRef, useState } from 'react'
import axios from "axios";
import { useRouter } from 'next/navigation';
import { Mycontext } from "@/app/Context";

import DatePicker from "react-datepicker";
import { getYear, getMonth, getDate } from 'date-fns'; //  getYear, getMonth, getDate, getDay 
import "react-datepicker/dist/react-datepicker.css";

export default function CalenderWrite() {
    const {setVisual} = useContext(Mycontext);
    const [optionItems, setOptionItems] = useState([]);
    let currentMember = useRef(); 

    const takedDataFun = async () => {
        currentMember.current = JSON.parse(localStorage.getItem('member_info'));
        let data = await axios.get(`/api/record/recordWrite?currentId=${currentMember.current.id}`);
        setOptionItems(data.data);
    }//takedDataFun() 함수정의
    
    useEffect(()=>{
        setVisual('noHeader');
        takedDataFun();
    }, []);

    const [startDate, setStartDate] = useState(new Date());
    const [plantImg, setPlantImg] = useState([]);
    const navigation = useRouter();
    const elToggleContents = useRef();


    //submit 함수
    const plantRecordDataFun = async (e) => {
        e.preventDefault();

        const elForm = e.target;
        console.log(elForm);

        let myPlantKind = '',
            myPlantNick = '',
            myRecordDate = `${getYear(startDate)}-${getMonth(startDate)+1}-${getDate(startDate)}`;


        let errMsg = '',
            errArr = [];
        errArr[0] = false; // 식물별칭을 안 씀
        errArr[1] = false; // 식물종류를 안 씀
        errArr[2] = false; // 처음 쓴다고 했으나 같은 식물 이름이 있음
        errArr[3] = false; // 같은 식물 별칭에서 같은 날짜에 쓴 게 있음

        if(!elForm.fOrR.checked){ // 해당 식물별칭을 처음 쓸 때)
            myPlantNick = elForm.plantNick.value.trim();
            myPlantKind = elForm.plantKind.value.trim();

            errArr[0] = myPlantNick.length == 0;
            errArr[1] = myPlantKind.length == 0;

            console.log('optionItems', optionItems);
            console.log('myPlantNick', myPlantNick);
            optionItems.map((item, k)=>{
                if(item.plantNick == myPlantNick) errArr[2] = true; 
                
            }) 
            console.log('errArr[2]', errArr[2]);

        }else{
            const sameK = elForm.nickSelect.value;
            console.log('elForm.nickSelect.value', sameK);
            myPlantNick = optionItems[sameK].plantNick;
            myPlantKind = optionItems[sameK].plantKind;

            console.log('optionItems[sameK]', optionItems[sameK]);
            const dateArr = optionItems[sameK].dateWrapper.split('.....');
            console.log('dateArr', dateArr);
            console.log('myRecordDate', myRecordDate);

            dateArr.map((dateItem)=>{
                if(dateItem == myRecordDate) errArr[3] = true;
            })
            console.log('errArr[3]', errArr[3]);
        }//else
        

        if(errArr[0] || errArr[1] || errArr[2] || errArr[3]){ // 식물의 별칭과 종류를 안 넣은 경우)
            if(errArr[0] && errArr[1]){
                errMsg = '식물의 별칭과 종류를 적어주세요.';
            }else if(errArr[0]){
                errMsg = '식물의 별칭을 적어주세요.';
            }else if(errArr[1]){
                errMsg = '식물의 종류를 적어주세요.';
            }else if(errArr[2]){
                errMsg = '같은 식물의 이름이 있습니다. 다른 식물 이름을 선택해주세요.';
            }else{
                errMsg = '해당식물의 해당날짜는 이미 기록된 상태입니다.\n이어쓰기를 원하신다면 해당 기록을 수정해주세요.';

            }

            alert(errMsg);

        }else{
            let fd = {
                plantNick: myPlantNick, // 식물별칭
                plantKind: myPlantKind, // 식물종류
                recordMemo: elForm.recordMemo.value, //메인메모
                recordDate: myRecordDate
            }
            
            console.log('plantImg', plantImg);
            fd.img = plantImg;

            console.log('폼 데이터 객체: ', fd);

            await axios.post('/api/record/recordWrite', {formData: fd, currentId: currentMember.current.id});
            navigation.push('/page/record');

        }//else
    }//plantRecordDataFun() 함수정의



    const imgLoadFun = (e) => {
        if(e.target.value != ''){ //사진 등록 취소가 아닌 경우

            //console.log('파일 개수: ', e.target.files); // 여러개 선택했을 때 늘어남
            // console.log('파일 개수: ', plantImg.length+1);

            let reader = new FileReader(); // 사진 1개당 1개 //사진 문자열 만드려고 만듦 /////
            //console.log('reader: ', reader);
            reader.readAsDataURL(e.target.files[0]);                                 /////

            reader.onload = (loadE) => {
                if(plantImg.length <= 2){ // 이미지 추가하기 전, 이미지 개수
                    //console.log('e.target.result', loadE.target.result);
                    setPlantImg([...plantImg, loadE.target.result]);                           
                    
                }else{
                    // e.target.value = '';
                    setPlantImg([loadE.target.result]);
                }
            }//reader.onload
        }//if(e.target.value != '')
    }//imgLoadFun() 함수정의

    const toggleFun = (e) => {
        if(e.target.checked){
            elToggleContents.current.classList.add('recorded');

        }else{
            elToggleContents.current.classList.remove('recorded');
        }
    }//toggleFun(e) 함수정의

  return (
    <form className='contents' onSubmit={plantRecordDataFun}>
        
        <div className='dateWrapper'>
            <span className='explanationTxt'>기록할 날짜를 정해주세요.
                <div className='infoIconWrapper'>
                    <i className="ri-information-line"/>
                    <div className='exBox'>
                        같은 식물(같은 별칭의 식물)에는 같은 날짜에 2번 이상 기록할 수 없습니다.
                        <br/><br/>
                        같은 날짜에 내용을 추가하고 싶다면, 해당 날짜의 기록을 수정해 주세요.                       
                    </div>
                </div>
            </span>
            <div className='inputWrapper'>
                <i className='icon ri-calendar-2-fill'/>
                <DatePicker dateFormat='yyyy년 MM월 dd일' selected={startDate} onChange={(date) => setStartDate(date)}/>
            </div>
        </div>
        
        <div className='fOrRToggleWrapper'>{/* 토글 감싸는 부분 */}
            <div className='fOrRToggle'>{/* 토글 회색부분 */}
                <input type="checkbox" name="fOrR" id='fOrR' onChange={toggleFun}/>
                <label htmlFor="fOrR" />
            </div>
        </div>
        <div className='toggleContentsWrapper' ref={elToggleContents}>
            <div className='nickWrapper inputAllWrapper'>
                <span className='explanationTxt'>
                    식물의 별칭을 넣어주세요
                    <div className='infoIconWrapper'>
                        <i className="ri-information-line"/>
                        <div className='exBox'>
                            별칭은 식물을 구별하는 키가 됩니다. 
                            이미 한 번 썼던 식물 별칭은 
                            다시 쓸 수 없습니다.<br/><br/>
                            식물의 별칭은 다시 바꿀 수 없으니, 
                            신중하게 정해주세요.
                        </div>
                    </div>
                </span>
                <div className='inputWrapper'>
                    <label className='icon ri-leaf-line' htmlFor='plantNick' />
                    <input type="text" name="plantNick" id="plantNick" maxLength='20' placeholder="(필수) * 0~20까지 가능합니다."/>
                </div>
            </div>
            
            <div className='kindWrapper inputAllWrapper'>
                <span className='explanationTxt'>식물의 종류를 적어주세요</span>
                <div className='inputWrapper'>
                    <label className='icon ri-seedling-line' htmlFor='plantKind' />
                    <input type="text" name="plantKind" id="plantKind" maxLength='20' placeholder="(필수) * 0~20까지 가능합니다."/>
                </div>
            </div>

            {/* ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- */}

            <div className='nickSelectWrapper inputAllWrapper'>
                <span className='explanationTxt'>
                    기록할 식물을 선택해주세요.
                </span>
                <div className='inputWrapper'>
                    <label className='icon ri-leaf-line' htmlFor='nickSelect' />
                    <select name='nickSelect' id='nickSelect'>
                        {
                            optionItems.length == 0 ? (
                                <option value='false'>
                                    아직 기록한 내용이 없습니다.
                                </option>
                            ):(          
                            optionItems.map((item, k)=>(
                                <option key={k} value={k}>
                                    {item.plantNick}({item.plantKind})
                                </option>
                            )

                            ))
                        }
                    </select>
                </div>
            </div>
        </div>
        
        
        <div className='mainTxtWrapper'>
            <span className='explanationTxt'>본문을 넣어주세요.</span>
            <textarea name="recordMemo" maxLength='600' placeholder="(필수) 최소 0~600자 까지 작성 가능합니다."/>
        </div>


        <div className='ImgWrapper'>
            <div className='inputWrapper'>
                <div className='imgWrapper'>
                    <label className='icon ri-camera-line' htmlFor='plantImg' />
                    <input type="file" name="plantImg" id="plantImg" accept="image/jpeg, image/png"
                    onChange={(e) => {imgLoadFun(e)}}
                    />
                    <button type='button' className='imgResetBtn' onClick={()=>{setPlantImg([])}}>
                        <i className='ri-close-circle-line'/>
                    </button>
                </div>
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
