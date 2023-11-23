"use client";

import { Mycontext } from '@/app/Context';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react'

export default function MyList() {
    const {setVisual, setDetailObj, imgsToDetail, setSearchLoading} = useContext(Mycontext);
    let myMemberInfo = useRef();
    let [myHeartList, setMyHeartList] = useState([]);
    const navigation = useRouter();

    useEffect(()=>{
        setVisual('noHeader');

        myMemberInfo.current = JSON.parse(localStorage.getItem('member_info'));
        axios.get(`/api/mylist?memberId=${myMemberInfo.current.id}`)
        .then((res)=>{
            console.log(res);
            console.log(res.data.length);
            setMyHeartList(res.data);
        })

        
    }, []);

    const sliceFun = (oriTitle='') => {
        let arr = oriTitle.split('|');

        return arr;  
    }//sliceFun() 함수정의

    const moveTo = async (num, urlGroup) => {
        const imgArr = sliceFun(urlGroup);
        imgsToDetail.current = imgArr;

        setSearchLoading('active');
        const itemObj = await axios.get(`/api/detail/${num}`);
        setDetailObj(itemObj.data);
        
        navigation.push(`/page/Detail/${num}`);
        setSearchLoading('');

    }//moveTo() 함수정의

    const deleteBtn = async (cntntsNo) => {
        let imsiArr = myHeartList.filter((obj, k)=>{
            if(obj.cntntsNo != cntntsNo) return obj;
        })
        setMyHeartList(imsiArr);

        await axios.delete(`/api/mylist?memberId=${myMemberInfo.current.id}&cntntsNo=${cntntsNo}`);

    }//deleteBtn() 함수정의

  return (

    <>
        {/* {console.log('aaaaaaa')} */}
        {
            myHeartList.length == 0 ? (
                <div className='noListWrapper'>
                    <figure className='contentsWrpper'>
                        <i/>
                        <figcaption>아직 등록된 리스트가<br/>없습니다.</figcaption>
                    </figure>
                </div>
            ):(
                <ul className='itemWrapper'>
                    {
                        myHeartList.map((obj, k)=>(
                            <li key={k}>
                                <span className='num'>{k+1}</span>
                                <button type='button' className='xBtn' onClick={() => {deleteBtn(obj.cntntsNo)}}>
                                    <i className='ri-close-line'/>
                                </button>
                                <figure className='contentsWrapper'>
                                    <i className='thumImg'>
                                        <img src={obj.thumImg} alt={obj.cntntsSj} />
                                    </i>
                                    <div className='rightWrapper'>
                                        <figcaption>{obj.cntntsSj}</figcaption>
                                        <button type='button' className='goToDetail' onClick={() => {moveTo(obj.cntntsNo, obj.detailImg)}}>
                                            <span className='txtWrapper'>
                                                more view <i className='ri-arrow-right-s-line'/>
                                            </span>
                                        </button>
                                    </div>
                                </figure>
                            </li>
                        ))
                    }
                </ul>
            )
        }
    </>
  )
}
