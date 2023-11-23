"use client"
import { useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import { Mycontext } from '@/app/Context';

export default function RecordModify() {
    const {setVisual} = useContext(Mycontext);
    let currentMember = useRef(); 
    const [plantImg, setPlantImg] = useState([]);
    const navigation = useRouter();

    useEffect(()=>{
        setVisual('noHeader');
    }, []);

    const imgLoadFun = (e) => {
        if(e.target.value != ''){ //사진 등록 취소가 아닌 경우
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

  return (
    <>
        <div className='recordExWrapper'>
            <dl className='recordDateWrapper'>
                <dt><i className='ri-calendar-2-fill'/>작성 날짜</dt>
                <dd>2023년 10월 13일</dd>
            </dl>
            <dl className='recordNickWrapper'>
                <dt><i className='ri-leaf-line'/>식물 별칭</dt>
                <dd>귀염새싹</dd>
            </dl>
            <dl className='recordKindWrapper'>
                <dt><i className='ri-seedling-line'/>식물 종류</dt>
                <dd>가울테리아</dd>
            </dl>
        </div>

        <form className='contentsWrapper'>
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
                수정하기
            </button>
        </form>
    </>
  )
}
