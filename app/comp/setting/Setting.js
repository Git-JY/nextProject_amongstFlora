"use client"
import { Mycontext } from '@/app/Context';
import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation';

export default function Preferences() {
    const {setVisual} = useContext(Mycontext);
    const navigation = useRouter();

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

    const logoutFun =  () => {
        let bool = confirm('로그아웃하시겠습니까?');

        if(bool){
            let currentMember = JSON.parse(localStorage.getItem('member_info'));

            // console.log(currentMember.id.slice(0, 5));
            // console.log(currentMember.id.slice(0, 5) == 'kakao');
            if(currentMember.id.slice(0, 5) == 'kakao' && currentMember.pw == ''){//카카오로 로그인했는지 알아봄                 
                kakaoLogoutFun();
            }

            localStorage.removeItem('member_info');
            localStorage.removeItem('login_bool');
            navigation.push('/'); 
        }else{
            alert('로그아웃이 취소되었습니다.');
        }
    }//logoutFun() 함수정의

    const secession = async () => {
        let bool = confirm('탈퇴하시겠습니까?');

        if(bool){
            let currentMember = JSON.parse(localStorage.getItem('member_info'));

            if(currentMember.id.slice(0, 5) == 'kakao' && currentMember.pw == ''){//카카오로 로그인했는지 알아봄                 
                kakaoLogoutFun();
            }

            await axios.delete(`/api/secession/${currentMember.id}`);
            localStorage.removeItem('member_info');
            localStorage.removeItem('login_bool');
            navigation.push('/'); 
        }else{
            alert('탈퇴가 취소되었습니다.');
        }
    }//secession() 함수정의



    useEffect(()=>{
        setVisual('noHeader');
    }, [])

  return (
    <ul className='contents'>
        <li>
            <button type='button' onClick={logoutFun}>
                로그아웃
            </button>
        </li>
        <li>
            <button type='button' onClick={secession}>
                탈퇴하기
            </button>
        </li>
    </ul>
  )
}
