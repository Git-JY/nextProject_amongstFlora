"use client"
import CalenderRead from '@/app/comp/calender/CalenderRead'
import { useSearchParams } from 'next/navigation'

import React from 'react'

export default function page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const plantNick = searchParams.get('plantNick');
  const journalDate = searchParams.get('journalDate');

  return (
    <div className='calenderRead'>
        <CalenderRead id={id} plantNick={plantNick} journalDate={journalDate}/>
    </div>
  )
}