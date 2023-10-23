"use client"
import { Mycontext } from '@/app/Context';
import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation';

export default function Preferences() {
    const {setVisual} = useContext(Mycontext);
    const navigation = useRouter();

    const logoutFun =  () => {
        let bool = confirm('로그아웃하시겠습니까?');

        if(bool){
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
