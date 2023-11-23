
import './sass/global.scss'
import 'remixicon/fonts/remixicon.css'

import Context from './Context'

import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'amongst_flora',
  description: "'식물과 함께' 앱은 키우고 싶은 식물을 검색할 수 있는 앱입니다.",
  // cdn붙일 거 링크 이렇게 , 로 여러개 붙이면 됨, (head)에 들어감
   // link:'https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css'
   // link:'https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css'
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/favicon/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/favicon/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/favicon/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/favicon/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon-precomposed" sizes="60x60" href="/favicon/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/favicon/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon-precomposed" sizes="76x76" href="/favicon/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/favicon/apple-touch-icon-152x152.png" />
        <link rel="icon" type="image/png" href="/favicon/favicon-196x196.png" sizes="196x196" />
        <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/png" href="/favicon/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/favicon/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" type="image/png" href="/favicon/favicon-128.png" sizes="128x128" />

        <meta name="application-name" content="&nbsp;"/>

        {/* 카카오 로그인 */}
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
      </head>

      <body className={inter.className}>

        <Context>
          <main>
            {children} 
          </main>
        </Context>
      </body>
    </html>
  )
}
