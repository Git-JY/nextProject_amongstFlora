"use client"

import { Mycontext } from '@/app/Context';
import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function search() {
    const {setVisual, headerUp, items, imgsToDetail, setDetailObj, setSearchLoading} = useContext(Mycontext);
    const navigation = useRouter();

    useEffect(()=>{
        setVisual('active');
    },[])

    const titleFun = (oriTitle='') => {
        let end = oriTitle.indexOf('(');
      
        if(end <= -1){
          return oriTitle;
        }
        return oriTitle.slice(0, end);
    }//titleFun() 함수정의

    const sliceFun = (oriTitle='', num=0) => {
        let arr = oriTitle.split('|');

        switch(num){
            case 0:
                return arr[0]; break;
            case 1: 
                return arr; break; 
        }
    }//sliceFun() 함수정의

    const moveTo = async (num, urlGroup) => {
        const imgArr = sliceFun(urlGroup, 1);
        imgsToDetail.current = imgArr;
        console.log('imgsToDetail.current: ', imgsToDetail.current);

        setSearchLoading('active');
        let itemObj = await axios.get(`/api/detail/${num}`);
        setSearchLoading('');

        setDetailObj(itemObj.data);

        navigation.push(`/page/Detail/${num}`);

    }//moveTo() 함수정의

    if(window){ //window를 나중에 인식
        let pos = {y: 0, y2: 0, status: true};
        window.addEventListener('scroll', function(){
            pos.y = window.pageYOffset;

            pos.status = (pos.y > pos.y2) ? true : false; // 3항 연산자

            if(pos.status){headerUp.current.classList.add('up')} //id값은 querySelector로 안 잡아도 바로 인식가능
            else{headerUp.current.classList.remove('up');}

            pos.y2 = pos.y;
        });

        console.log('잘 가져오셨으???: ', items);
    }

  return (
    <div className='contentsWrapper'>
        <ul className='itemsWrapper'>
            {
                items.map((obj, k)=>(
                    <li className='item' key={k} onClick={() => {moveTo(obj.cntntsNo._cdata, obj.rtnFileUrl._cdata)}}>
                        <figure>
                            <i>
                                <img src={sliceFun(obj.rtnThumbFileUrl._cdata)} alt={obj.cntntsSj._cdata}/>
                                <span className='heart' />
                            </i>
                            <figcaption>{titleFun(obj.cntntsSj._cdata)}</figcaption>
                        </figure>
                    </li>
                ))
            }
            
        </ul>
        <button type='button' className='moreBtn'>더보기</button>
    </div>
  )
}
        