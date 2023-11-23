"use client"
import axios from 'axios';
import React, { useState } from 'react'

export default function SignUp({popNumSet}) {
  
  let [idWarning, setIdWarning] = useState('');
  let [pwWarning, setPwWarning] = useState('');
  
  const [type1, setType1] = useState('password');
  const [type2, setType2] = useState('password');
  
  const signUp = async (e) => {
    e.preventDefault();

    let elForm = e.target,
      id = elForm.id.value,
      pw = elForm.pw.value,
      pwCheck = elForm.pwCheck.value,
      nickname = elForm.nick.value;

    let regId = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{6,20}$/; // 아이디는 6~20글자, 숫자, 문자를 포함해야 합니다.
    let regPw = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,20}$/; // 비밀번호는 8~20글자, 숫자, 문자, 특수문자를 포함해야 합니다.

    let correctCheck = [],
      idWarningStr = '',
      pwWarningStr = '',
      sameIdExistence = false; // 이미 아이디가 존재하는지의 여부

    let allData = await axios.get('/api/login');
    allData.data.map((obj) => {
      if(obj.id == id) sameIdExistence = true;
    });
    
    correctCheck[0] = regId.test(id) ? true : false;
    correctCheck[1] = regPw.test(pw) ? true : false;
    correctCheck[2] = pw == pwCheck ? true : false;
    correctCheck[3] = !sameIdExistence ? true : false; // 이미 존재하는 아이디 

    if(!(correctCheck[0] || correctCheck[1]) ){ // 둘다 false인 경우)

      idWarningStr = '* 아이디는 6~20글자, 숫자, 문자를 포함해야 합니다.';
      pwWarningStr = '* 비밀번호는 8~20글자, 숫자, 문자, 특수문자를 포함해야 합니다.';

    }else if(!correctCheck[0]){ // id만 false인 경우)

      idWarningStr = '* 아이디는 6~20글자, 숫자, 문자를 포함해야 합니다.';
      if(!correctCheck[2]){
        pwWarningStr = '* 비밀번호가 다릅니다.'
      }

    }else if(!correctCheck[1]){ // pw만 false인 경우

      pwWarningStr = '* 비밀번호는 8~20글자, 숫자, 문자, 특수문자를 포함해야 합니다.';

    }else{// id, pw 전부 형식에 맞게 씀)
      if(!correctCheck[3]){
        idWarningStr = '* 동일한 아이디가 존재합니다. 다른 아이디를 골라주세요.';
        if(!correctCheck[2]) pwWarningStr = '* 비밀번호가 다릅니다.';
      
      }else{
        if(!correctCheck[2]){
          pwWarningStr = '* 비밀번호가 다릅니다.'
        }else{// 전부 맞게 씀 (회원가입))
          const today = new Date();
  
          const data = {
            'id': id,
            'pw': pw,
            'nick': nickname,
            'date': `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
          }
      
          // id, pw, nick, date
          axios.post('/api/login', {data: data})
  
          alert('가입을 환영합니다!');

          popNumSet(0);
  
          return; // 함수 나가기
        }//else     
      }

    }//else

    setIdWarning(idWarningStr);
    setPwWarning(pwWarningStr);
  
  }//signUp() 함수정의

  const visualPw = (e, num) => {
    e.target.classList.toggle('active');

    if(e.target.classList.contains('active')){
      num == 1? setType1('text') : setType2('text');
    }else{
      num == 1? setType1('password') : setType2('password');
    }

  }//visualPw() 함수정의

  return (
    <article className='signIn'>
        <h3>회원가입</h3>
        <form className='contents' onSubmit={signUp}>
          <input type='text' name='nick' className='nick' placeholder='닉네임을 입력해주세요.'/>
          <input type='text' name='id' className='id' placeholder='아이디를 입력해주세요.'/>
          <span className='idWarning'>{idWarning}</span>{/* * 이미 존재하는 아이디 입니다. */}

          <div className='pwWrapper'>
            <input type={type1} name='pw' className='pw' placeholder='비밀번호를 입력해주세요.' /> 
            <button type='button' className='eyeBtn' onClick={(e)=>{visualPw(e, 1)}}/>              
          </div>
          <div className='pwWrapper'>
            <input type={type2} name='pwCheck' className='pwCheck' placeholder='비밀번호 확인' />
            <button type='button' className='eyeBtn' onClick={(e)=>{visualPw(e, 2)}}/>              
          </div>
          <span className='pwWarning'>{pwWarning}</span>{/* * 비밀번호가 다릅니다. */}

          <button className='signUpBtn'>SIGN UP</button>
        </form>

        <nav className='footWrapper'>
          <span onClick={()=>{popNumSet(0)}}>로그인</span>
          <span onClick={()=>{popNumSet(1)}}>비밀번호 힌트</span>
        </nav>
    </article>
  )
}
