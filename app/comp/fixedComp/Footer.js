import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <>
        <div className='contents'>
            <Link href="/page/home" className='homeLink'></Link>
            <div className='preferencesWrapper'>
                <Link className='preferences' href="/page/preferences"></Link>
            </div>
            <Link href="/page/calender" className='calenderLink'></Link>
        </div>
    </>
  )
}
