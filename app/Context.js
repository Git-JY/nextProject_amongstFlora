"use client"

import React, { createContext, useRef, useState } from 'react';

import Header from './comp/fixedComp/Header';
import Footer from './comp/fixedComp/Footer';

export const Mycontext = createContext();


export default function Context({children}) {

  let [visual, setVisual] = useState(''); // header footer 보이고 안 보이게 하기
  let elHeader = useRef(''); //헤더 올라가게 하기 위해 헤더 잡음
  let [searchLoading, setSearchLoading] = useState(''); // loading페이지 보이고 안 보이게 하기
  let [items, setItems] = useState([]); // 서치로 받아온 거
  let pageObj = useRef({pageNo: 0, numOfRows: 0, totalCount: 0, data: {}}); // 페이지
  let [detailObj, setDetailObj] = useState(''); // 디테일 내용
  let imgsToDetail = useRef([]); // 디테일의 이미지

  return (
    <div className='all'>

      <div className={`searchLoadingWrapper ${searchLoading}`}> {/* active */}
        <img src='/img/icon_loading.svg' alt='잠시만 기다려 주세요...' />
      </div>

      <header className={visual} ref={elHeader}>
        <Header setSearchLoading={setSearchLoading} setItems={setItems} pageObj={pageObj}/>
      </header>

      <Mycontext.Provider value={{
        setVisual, 
        elHeader, 
        setSearchLoading, 
        items, setItems, 
        pageObj, 
        detailObj, setDetailObj, 
        imgsToDetail}}
        >
          {children}
      </Mycontext.Provider>

      <footer className={visual}>
        <Footer />
      </footer>
    </div>
  )
}
