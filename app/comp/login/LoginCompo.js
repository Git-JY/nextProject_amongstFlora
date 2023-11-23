"use client";

import { useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Mycontext } from '@/app/Context';

import Login from './popupContents/Login';
import PwHint from './popupContents/PwHint';
import SignUp from './popupContents/SignUp';




export default function LoginCompo() {
  
  const {setVisual} = useContext(Mycontext);
  const navigation = useRouter();
  // const {setVisual} = useContext(Mycontext);

  const kakaoLoginFun = () => {
    //console.log(Kakao.isInitialized()); // sdk초기화여부판단
    if(!Kakao.isInitialized()){//초기화(init)이 되있는지 여부에 따라 true, false
      Kakao.init('f782111f6f8739fab9633fd6bbf23599') //초기화는 한 번만 //이미 된 상태에서 또 하면 오류
    }
    
      //발급받은 키 중 javascript키를 사용해준다.
    Kakao.Auth.login({
      success: function (response) {
        Kakao.API.request({
          url: '/v2/user/me',
          success: async function (response) {
            //console.log('-----', response);
            //console.log('aaaaa', response.id, response.properties.nickname);

            const idValue = 'kakao_' + response.id;

            const allData = await axios.get('/api/login');

            const member = allData.data.filter((obj) => {if(obj.id == idValue) return obj;});

            // 이전에 로그인 한 적이 없음(첫 로그인)
            if(member.length == 0){
              const today = new Date();
      
              const data = {
                'id': idValue,
                'pw': '',
                'nick': response.properties.nickname,
                'date': `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
              }
          
              // id, pw, nick, date
              await axios.post('/api/login', {data: data})
      
              alert('가입을 환영합니다!');
              window.localStorage.setItem('member_info', JSON.stringify(data));
            }else{// 이전에 로그인 한 적이 있음
              window.localStorage.setItem('member_info', JSON.stringify(member[0]));
            }
            window.localStorage.setItem('login_bool', true);
            navigation.push('/page/home');

          },//success: async function (response)
          fail: function (error) {
            console.log(error);
          },
        })//Kakao.API.request
      },//success(response)

      fail: function (error) {
        console.log(error);
      },//fail(error)
    })
  }//kakaoLoginFun() 함수정의

  const kakaoLogoutFun = () => {

    if (Kakao.Auth.getAccessToken()) {
      Kakao.API.request({
        url: '/v1/user/unlink',
        success: function (response) {
          console.log(response)
        },
        fail: function (error) {
          console.log(error)
        },
      })
      Kakao.Auth.setAccessToken(undefined)
    }  
  }//kakaoLogoutFun() 함수정의
  


  useEffect(()=>{
    const login_bool = localStorage.getItem('login_bool');
    if(login_bool){
      navigation.push('/page/home');
    }

    setVisual('');
  },[])


  
  let [popNum, popNumSet] = useState(0);
  
  const popupContents = [<Login popNumSet={popNumSet}/>, 
                          <PwHint popNumSet={popNumSet}/>, 
                          <SignUp popNumSet={popNumSet}/>];  

  const elLoginPopup = useRef(); //일반 로그인 팝업 

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

            {/* <button type='button' onClick={kakaoLogoutFun}>로그아웃</button> */}
            <div className="loginWrapper">
              <button type="button" className="kakaoLogin" onClick={kakaoLoginFun}>
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
