import Link from 'next/link';

export default function Footer() {
  return (
    <div className='contents'>
      <Link href="/page/home" className='homeLink' >
        <i className="ri-home-5-line"/>
      </Link>
      <Link href="/page/mylist" className='myListLink'>
        <i className="ri-hearts-line"/>
      </Link>
      <Link href="/page/record" className='recordLink'>
        <i className="ri-edit-box-line"/>
      </Link>
      <Link href="/page/setting" className='settingLink'>
        <i className="ri-settings-4-line"/>
      </Link>
    </div>
  )
}
