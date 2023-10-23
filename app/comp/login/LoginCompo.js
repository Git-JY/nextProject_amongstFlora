"use client"

import React, { useContext, useEffect, useRef, useState } from 'react'
import Link from "next/link";
import Login from './popupContents/Login';
import PwHint from './popupContents/PwHint';
import SignUp from './popupContents/SignUp';
import {Mycontext} from '@/app/Context';
import { useRouter } from 'next/navigation';



export default function LoginCompo() {
  
  const navigation = useRouter();
  const {setVisual} = useContext(Mycontext);

    const kakaoLoginFun = () => {

    }//kakaoLoginFun() 함수정의
  
    useEffect(()=>{
      let login_bool = localStorage.getItem('login_bool');
      if(login_bool){
        navigation.push('/page/home');
      }

      setVisual('');
    },[])


    
    let [popNum, popNumSet] = useState(0);
    
    const popupContents = [<Login popNumSet={popNumSet}/>, 
                           <PwHint popNumSet={popNumSet}/>, 
                           <SignUp popNumSet={popNumSet}/>];  

    const elLoginPopup = useRef(); 

    // 일반 로그인으로 팝업을 보여주나 안 보여주나
    const popupActiveFun = (at) => {
      if(at){
        elLoginPopup.current.classList.add('active');
      }else{
        elLoginPopup.current.classList.remove('active');
      }
    }// popupActiveFun() 함수정의

  return (
    <div className="Login">
        <div className="entire">
            <h1>
            <b className="title_Ko">식물과 함께</b>
            <span className="title_En">Amongst Flora</span>
            </h1>

            <div className="loginWrapper">
            <button type="button" className="kakaoLogin" onClick={kakaoLoginFun()}>
                카카오로 계속하기
            </button>
            <button type="button" className="nomalLogin" onClick={() => {popupActiveFun(true)}}>
                일반 로그인
            </button>
            </div>

        </div>{/* div.entire */}

        <div className="LoginPopup_blackBg" ref={elLoginPopup}>

            <div className="LoginPopup">
            <button type="button" className="xBtn" onClick={() => {popupActiveFun(false)}}/>

            {popupContents[popNum]}

            </div>{/* div.LoginPopup */}

        </div>{/* div.LoginPopup_blackBg */}
    </div>
  )
}
