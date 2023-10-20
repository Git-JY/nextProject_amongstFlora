"use client"

import React, { createContext, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import Header from './comp/fixedComp/Header';
import Footer from './comp/fixedComp/Footer';

export const Mycontext = createContext();


export default function Context({children}) {

  let [visual, setVisual] = useState('');
  let [footVisual, setFootVisual] = useState('');
  let [searchLoading, setSearchLoading] = useState('');
  let [items, setItems] = useState([]);
  let [detailObj, setDetailObj] = useState('');
  let imgsToDetail = useRef([]);
  let page = useRef(0);
  let headerUp = useRef('');

  return (
    <div className='all'>

      <div className={`searchLoadingWrapper ${searchLoading}`}> {/* active */}
        <img src='/img/icon_loading.svg' alt='잠시만 기다려 주세요...' />
      </div>

      <header className={visual} ref={headerUp}>
        <Header setSearchLoading={setSearchLoading} setItems={setItems} page={page}/>
      </header>

      <Mycontext.Provider value={{
        setVisual, 
        setSearchLoading, 
        items,setItems, 
        page, 
        headerUp, 
        setDetailObj, 
        detailObj, 
        imgsToDetail,
        setFootVisual}}>
          {children}
      </Mycontext.Provider>

      <footer className={`${visual} ${footVisual}`}>
        <Footer />
      </footer>
    </div>
  )
}
