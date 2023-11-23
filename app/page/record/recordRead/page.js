"use client"
import RecordRead from '@/app/comp/record/RecordRead'
import { useSearchParams } from 'next/navigation'

import React from 'react'

export default function page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const plantNick = searchParams.get('plantNick');
  const recordDate = searchParams.get('recordDate');

  return (
    <div className='recordRead'>
        <RecordRead id={id} plantNick={plantNick} recordDate={recordDate}/>
    </div>
  )
}