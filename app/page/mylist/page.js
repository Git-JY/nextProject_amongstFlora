import MyList from '@/app/comp/myList/MyList'
import React from 'react'

export default function page() {
  return (
    <div className='myList'>
        <div className='titleWrapper'>
            <h2>
                <i className='ri-plant-line'/>
                <strong>나의 식물목록</strong>
            </h2>
        </div>
        <div className='contentsAllWrapper'>
            <MyList/>
        </div>
    </div>
  )
}
