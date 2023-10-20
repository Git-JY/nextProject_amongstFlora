"use client"
import CalenderRead from '@/app/comp/calender/CalenderRead'
import { useSearchParams } from 'next/navigation'

import React from 'react'

export default function page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const plantNick = searchParams.get('plantNick');
  const date = searchParams.get('date');

  console.log('잘 가져오심?: ', id, plantNick, date);

  return (
    <div className='calenderRead'>
        <CalenderRead />
    </div>
  )
}