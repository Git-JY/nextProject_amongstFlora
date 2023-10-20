"use client"
import { Mycontext } from '@/app/Context';
import React, { useContext, useEffect } from 'react'

export default function Home() {
    const {setVisual} = useContext(Mycontext);

    useEffect(()=>{
      let memInfo = JSON.parse(localStorage.getItem('member_info'));
      console.log('-----로그인정보-----',  memInfo);

      setVisual('active');
    },[])

  return (
    <div className='home'>
        
    </div>
  )
}
