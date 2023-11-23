import axios from 'axios';
import { useState } from 'react'

export default function PwHint({popNumSet}) {
  let [pwHint, setPwHint] = useState('');

  const give_pwHint = async (e) => {
    e.preventDefault();

    const idValue = e.target.id.value;

    const allData = await axios.get('/api/login');
    const member = allData.data.filter((obj) => {if(obj.id == idValue) return obj;});

    if(member.length == 0){
      setPwHint('');
      alert('일치하는 아이디가 없습니다.');
    }else{
      const str = member[0].pw.slice(0, 3) + '*'.repeat(member[0].pw.length - 3);
      setPwHint(str);
    }
  }//give_pwHint(e) 함수정의

  return (
    <article className='pwHint'>
        <h3>비밀번호 힌트</h3>
        <form className='contents' onSubmit={give_pwHint}>
          <input type='text' name='id' className='id' placeholder='아이디를 입력해주세요.'/>
          <span className='passHint'>{pwHint}</span> {/* 예시) tes******* */}

          <button className='FindBtn'>FIND</button>
        </form>

        <nav className='footWrapper'>
          <span onClick={()=>{popNumSet(0)}}>로그인</span>
          <span onClick={()=>{popNumSet(2)}}>회원가입</span>
        </nav>
    </article>
  )
}
