"use client"

import { Mycontext } from '@/app/Context';
import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function search() {
    const {setVisual, elHeader, items, setItems, imgsToDetail, setDetailObj, setSearchLoading, pageObj} = useContext(Mycontext);
    const navigation = useRouter();
    let myMemberInfo = useRef();
    let myHeartList = useRef([]);

    let moreBool = (pageObj.current.totalCount - pageObj.current.pageNo * 9) > 0 ? true : false;


    // useEffect와 거의 실행방식이 같음(의존성 배열바뀔 때마다 실행되는 거나 그런 거)
    // (다만, 얘는 dom이 출력되기 전에 실행, 그래서 쓰면 dom출력이 느려질 수 있음 => useLayoutEffect가 전부 실행된 후에 dom이 출력되기 때문)
    useLayoutEffect(()=>{
        myMemberInfo.current = JSON.parse(localStorage.getItem('member_info'));

        axios.get(`/api/mylist?memberId=${myMemberInfo.current.id}`)
        .then((res)=>{
            myHeartList.current = res.data;
        });
    }, [])

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

        setSearchLoading('active');
        let itemObj = await axios.get(`/api/detail/${num}`);
        setDetailObj(itemObj.data);
        
        navigation.push(`/page/Detail/${num}`);
        setSearchLoading('');

    }//moveTo() 함수정의

    const moreBtnFun = async () => {
        setSearchLoading('active');
        pageObj.current.pageNo = Number(pageObj.current.pageNo) + 1;
        const itemObj = await axios.post('/api/search', {data: pageObj.current});

        if(itemObj.data.length == 1){ //검색 결과가 1개인 경우 // 배열이 아닌 객체로 줘서 이렇게 함
            setItems([...items, itemObj.data.item]);
        }else{ // 검색결과가 2개 이상인 경우
            setItems([...items, ...itemObj.data.item]);   
        }

        setSearchLoading('');
    }//moreBtnFun() 함수정의

    const heartBtnFun = async (e, itemObj) => {
        e.stopPropagation();

        e.target.classList.toggle('active');

        const thumImg = sliceFun(itemObj.rtnThumbFileUrl._cdata);

        if(e.target.classList.contains('active')){// heart가 생긴 경우
            const data = {
                'id': myMemberInfo.current.id,
                'cntntsNo': itemObj.cntntsNo._cdata,
                'cntntsSj': itemObj.cntntsSj._cdata,
                'thumImg': thumImg,  //슬라이스 하기
                'detailImg': itemObj.rtnFileUrl._cdata
            };
            await axios.post('/api/mylist', {data: data});
                                                                     
        }else{// heart가 없어진 경우
            await axios.delete(`/api/mylist?memberId=${myMemberInfo.current.id}&cntntsNo=${itemObj.cntntsNo._cdata}`);
        }

    }//heartBtnFun() 함수정의

    const existHeart = (itemNo) => {
        let bool = false;
    
        if(itemNo != undefined){
            myHeartList.current.map((obj)=>{
        
                if(obj.cntntsNo == itemNo){bool = true;}
            })//id1List.map
    
        }//if(itemNo != undefined)
    
        return bool;
    }//existHeart() 함수정의

    if (typeof window !== 'undefined') { //window를 나중에 인식
        let pos = {y: 0, y2: 0, status: true};
        window.addEventListener('scroll', function(){
            pos.y = window.pageYOffset;

            pos.status = (pos.y > pos.y2) ? true : false; // 3항 연산자

            if(pos.status){elHeader.current.classList.add('up')} //id값은 querySelector로 안 잡아도 바로 인식가능
            else{elHeader.current.classList.remove('up');}

            pos.y2 = pos.y;
        });
    }

  return (
    <div className='contentsWrapper'>
    {
        items.length == 0 ? 
        <figure className='noSearchWrapper'>
            <i>
                <img src='/img/noSearch.jpg' alt='검색 결과가 없습니다.'/>
            </i>
            <figcaption>검색 결과가 없습니다.</figcaption>
        </figure>
        : 
        (<>
            <ul className='itemsWrapper'>  
                {
                    items.map((obj, k)=>(
                        <li className='item' key={k} onClick={() => {moveTo(obj.cntntsNo._cdata, obj.rtnFileUrl._cdata)}}>
                            <figure>
                                <i>
                                    <img src={sliceFun(obj.rtnThumbFileUrl._cdata)} alt={obj.cntntsSj._cdata}/>
                                    <span className={existHeart(obj.cntntsNo._cdata) ? 'heart active' : 'heart'} onClick={(e) => {heartBtnFun(e, obj)}} />
                                </i>
                                <figcaption>{titleFun(obj.cntntsSj._cdata)}</figcaption>
                            </figure>
                        </li>
                    ))
                    
                }   
            </ul>
            { moreBool ? <button type='button' className='moreBtn active' onClick={moreBtnFun}>더보기</button> : ''}
        </>)
    }
    </div>
  )//return
}
        