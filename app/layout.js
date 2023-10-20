
import Context from './Context'
import './sass/global.scss'
import { Inter } from 'next/font/google'
import 'remixicon/fonts/remixicon.css'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'amongst_flora',
  description: '식물과 함께 앱은 키우고 싶은 식물을 검색할 수 있는 앱입니다.'
   // cdn붙일 거 링크 이렇게 , 로 여러개 붙이면 됨, (head)에 들어감
  // link:'https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css'
  // link:'https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css'
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
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
