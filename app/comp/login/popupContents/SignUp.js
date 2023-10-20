"use client"
import axios from 'axios';
import React, { useRef, useState } from 'react'

export default function SignUp({popNumSet}) {
  
  let [idWarning, setIdWarning] = useState('');
  let [pwWarning, setPwWarning] = useState('');
  
  const [type, setType] = useState('password');
  
  const signUp = async (e) => {
    e.preventDefault();

    let elForm = e.target,
        id = elForm.id.value,
        pw = elForm.pw.value,
        pwCheck = elForm.pwCheck.value,
        nickname = elForm.nick.value;

        let regId = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{6,20}$/; // 아이디는 6~20글자, 숫자, 문자 포함 // 아이디는 6~20글자, 숫자, 문자를 포함해야 합니다.
        let regPw = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,20}$/; // 비번은 8~20글자, 숫자, 문자, 특수문자 포함 // 비밀번호는 8~20글자, 숫자, 문자, 특수문자를 포함해야 합니다.

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
        correctCheck[3] = !sameIdExistence ? true : false; // 보류 // 이미 존재하는 아이디 
        


    if(!(correctCheck[0] || correctCheck[1]) ){

      idWarningStr = '* 아이디는 6~20글자, 숫자, 문자를 포함해야 합니다.';
      pwWarningStr = '* 비밀번호는 8~20글자, 숫자, 문자, 특수문자를 포함해야 합니다.';

    }else if(!correctCheck[0]){

      idWarningStr = '* 아이디는 6~20글자, 숫자, 문자를 포함해야 합니다.';
      if(!correctCheck[2]){
        pwWarningStr = '* 비밀번호가 다릅니다.'
      }

    }else if(!correctCheck[1]){

      pwWarningStr = '* 비밀번호는 8~20글자, 숫자, 문자, 특수문자를 포함해야 합니다.';

    }else{
      if(!correctCheck[3]){
        idWarningStr = '* 동일한 아이디가 존재합니다. 다른 아이디를 골라주세요.'

      }else{
        if(!correctCheck[2]){
          pwWarningStr = '* 비밀번호가 다릅니다.'
        }else{
          let today = new Date();
  
          let data = {
            'id': id,
            'pw': pw,
            'nick': nickname,
            'date': `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
          }
      
          // id, pw, nick, date
          axios.post('/api/login', {data: data})
  
          console.log('가입 성공! data: ', data);
          alert('가입을 환영합니다!');

          popNumSet(0);
          // navigation.push('/page/home');
  
  
          return; // 함수 나가기
        }//else     
      }

    }//else

    setIdWarning(idWarningStr);
    setPwWarning(pwWarningStr);
  
  }//signUp() 함수정의



  const visualPw = (e) => {
    e.target.classList.toggle('active');

    if(e.target.classList.contains('active')){
      setType('text');
    }else{
      setType('password');
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
              <input type={type} name='pw' className='pw' placeholder='비밀번호를 입력해주세요.' /> 
              <button type='button' className='eyeBtn' onClick={visualPw}/>              
            </div>
            <div className='pwWrapper'>
              <input type={type} name='pwCheck' className='pwCheck' placeholder='비밀번호 확인' />
              <button type='button' className='eyeBtn' onClick={visualPw}/>              
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
