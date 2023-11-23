// login // 팝업의 컨텐츠중 로그인
"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login({popNumSet}) {

  
  const navigation = useRouter();
  const [type, setType] = useState('password');


  const visualPw = (e) => {
    e.target.classList.toggle('active');

    if(e.target.classList.contains('active')){
      setType('text');
    }else{
      setType('password');
    }

  }//visualPw() 함수정의

  const signIn = async (e) => {
    e.preventDefault();

    let idValue = e.target.id.value,
        pwValue = e.target.pw.value;

    let allData = await axios.get('/api/login');

    let member = allData.data.filter((obj) => {if(obj.id == idValue) return obj;});

    if(member.length == 0){
      alert('일치하는 아이디가 없습니다.\n 다시 입력해주세요.');
    }else{
      if(member[0].pw != pwValue){
        alert('비밀번호가 다릅니다. \n 다시 입력해주세요.');
      }else{
        window.localStorage.setItem('login_bool', true);
        window.localStorage.setItem('member_info', JSON.stringify(member[0]));

        navigation.push('/page/home');
      }
    }
  }//signIn() 함수정의

  return (
    <article className='loginPage'>
      <h3>로그인 페이지</h3>
      <form className='contents' onSubmit={signIn}>
        <input type='text' name='id' className='id' placeholder='아이디를 입력해주세요.'/>
        <div className='pwWrapper'>
          <input type={type} name='pw' className='pw' placeholder='비밀번호를 입력해주세요.'/>
          <button type='button' className='eyeBtn' onClick={visualPw}/>  
        </div>

        <button className='loginBtn'>LOGIN</button>
      </form>
      <nav className='footWrapper'>
        <span onClick={()=>{popNumSet(1)}}>비밀번호 힌트</span>
        <span onClick={()=>{popNumSet(2)}}>회원가입</span>
      </nav>
    </article>
  )
}
