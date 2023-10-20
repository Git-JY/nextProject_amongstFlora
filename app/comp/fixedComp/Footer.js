import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <>
        <div className='contents'>
            <Link href="/" className='homeLink'></Link>
            <div className='preferencesWrapper'>
                <button type='button' className='preferences'></button>
            </div>
            <Link href="/page/calender" className='calenderLink'></Link>
        </div>
    </>
  )
}
