import axios from 'axios';
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation';

export default function Header({setSearchLoading, setItems, pageObj}) {
  const elHeaderForm = useRef();
  const navigation = useRouter();

  const formActiveFun = () => {
    elHeaderForm.current.classList.toggle('active');
  }//formActiveFun() 함수정의

  const searchFun = async (e) => {
    e.preventDefault();

    let form = new FormData(e.target);
    let data = Object.fromEntries(form);

    // sType: "sCntntsSj"
    // sText: "장미" 

    //wordType: cntntsSj;
    //word: ㄹ

    // flclrChkVal: "0" // 꽃 색 
    // fmldecolrChkVal: "0" // 열 매 색  
    // lefcolrChkVal: "0" // 잎 색

    // lefmrkChkVal: "0" // 잎 무 늬 
    // grwhstleChkVal: "0" // 생육형태

    // lightChkVal: "0" // 광도요구
    // waterCycleSel: "0" // 물주기

    // priceTypeSel: "0" // 가격대

    setSearchLoading('active');
    const itemObj = await axios.post('/api/search', {data: data});
    pageObj.current = {
        pageNo: itemObj.data.pageNo._text,
        numOfRows: itemObj.data.numOfRows._text,
        totalCount: itemObj.data.totalCount._text,
        ...data
    };

    if(pageObj.current.totalCount == 1){ //검색 결과가 1개인 경우 // 배열이 아닌 객체로 줘서 이렇게 함
        const Oneitem = itemObj.data.item;

        setItems([Oneitem]);
    }else if(pageObj.current.totalCount == 0){ //검색 결과가 0개인 경우 // 아예 item이 없어서 이렇게 함
        setItems([]);

    }else{ // 검색결과가 2개 이상인 경우
        const itemArr = itemObj.data.item;
        setItems([...itemArr]);   
    }

    setSearchLoading('');
    elHeaderForm.current.classList.remove('active');
    navigation.push('/page/search');

  }//searchFun(e) 함수정의

  const [checkedOption1, setCheckedOption1] = useState('sCntntsSj'),
        [checkedOption2, setCheckedOption2] = useState('0'),
        [checkedOption3, setCheckedOption3] = useState('0'),
        [checkedOption4, setCheckedOption4] = useState('0');

  const radioChange = (e, num) => {

    switch(num){
        case 1: 
            setCheckedOption1(e.target.value); break;
        case 2: 
            setCheckedOption2(e.target.value); break;
        case 3: 
            setCheckedOption3(e.target.value); break;
        case 4: 
            setCheckedOption4(e.target.value); break;
    }
  }//radioChange(e) 함수정의

  return (
    <>
      <form className='searchAllOptionWrapper' ref={elHeaderForm} onSubmit={searchFun}>
          <div className='searchOption_visual'>

            <ul className='sType_Wrapper'>{/* 식물명, 학명, 영명 */}
            <li>
            <input type='radio' name='sType' value="sCntntsSj" id='sCntntsSj' 
            checked={checkedOption1 === 'sCntntsSj'}
            onChange={(e) => {radioChange(e, 1)}}/>
            <label htmlFor="sCntntsSj">식물명</label>
            </li>

            <li>
            <input type='radio' name='sType' value="sPlntbneNm" id='sPlntbneNm'
            checked={checkedOption1 === 'sPlntbneNm'}
            onChange={(e) => {radioChange(e, 1)}}/>
            <label htmlFor="sPlntbneNm">학명</label>
            </li>

            <li>
            <input type='radio' name='sType' value="sPlntzrNm" id='sPlntzrNm'
            checked={checkedOption1 === 'sPlntzrNm'}
            onChange={(e) => {radioChange(e, 1)}}/>
            <label htmlFor="sPlntzrNm">영명</label>
            </li>
            </ul>

            <div className='searchWrapper'>
            <input type='text' name='sText' className='sTest' placeholder='식물 이름을 검색해주세요.'/>
            <button className='searchBtn'>
                <i className='ri-search-2-line'/>
            </button>
            </div>
          </div>

          <div className='searchOptionScroll_hide'>
              
            <ul className='koreanChar_wrapper'>
                <li>
                    <input type='radio' name='word' value="ㄱ" id='giyeok'
                    checked={checkedOption2 === 'ㄱ'}
                    onChange={(e) => {radioChange(e, 2)}}/>
                    <label htmlFor="giyeok">ㄱ</label>
                </li>
                
                <li>
                    <input type='radio' name='word' value="ㄴ" id='nieun'
                    checked={checkedOption2 === 'ㄴ'}
                    onChange={(e) => {radioChange(e, 2)}}/>
                    <label htmlFor="nieun">ㄴ</label>
                </li>
                
                <li>
                    <input type='radio' name='word' value="ㄷ" id='digeut'
                    checked={checkedOption2 === 'ㄷ'}
                    onChange={(e) => {radioChange(e, 2)}}/>
                    <label htmlFor="digeut">ㄷ</label>
                </li>
                
                <li>
                    <input type='radio' name='word' value="ㄹ" id='rieul'
                    checked={checkedOption2 === 'ㄹ'}
                    onChange={(e) => {radioChange(e, 2)}}/>
                    <label htmlFor="rieul">ㄹ</label>
                </li>
                
                <li>
                    <input type='radio' name='word' value="ㅁ" id='mieum '
                    checked={checkedOption2 === 'ㅁ'}
                    onChange={(e) => {radioChange(e, 2)}}/>
                    <label htmlFor="mieum ">ㅁ</label>
                </li>
                
                <li>
                    <input type='radio' name='word' value="ㅂ" id='bieup'
                    checked={checkedOption2 === 'ㅂ'}
                    onChange={(e) => {radioChange(e, 2)}}/>
                    <label htmlFor="bieup">ㅂ</label>
                </li>

                <li>
                    <input type='radio' name='word' value="ㅅ" id='siot'
                    checked={checkedOption2 === 'ㅅ'}
                    onChange={(e) => {radioChange(e, 2)}}/>
                    <label htmlFor="siot">ㅅ</label>
                </li>
                
                <li>
                    <input type='radio' name='word' value="ㅇ" id='ieung'
                    checked={checkedOption2 === 'ㅇ'}
                    onChange={(e) => {radioChange(e, 2)}}/>
                    <label htmlFor="ieung">ㅇ</label>
                </li>

                <li>
                    <input type='radio' name='word' value="ㅈ" id='jieut'
                    checked={checkedOption2 === 'ㅈ'}
                    onChange={(e) => {radioChange(e, 2)}}/>
                    <label htmlFor="jieut">ㅈ</label>
                </li>
                
                <li>
                    <input type='radio' name='word' value="ㅊ" id='chieut'
                    checked={checkedOption2 === 'ㅊ'}
                    onChange={(e) => {radioChange(e, 2)}}/>
                    <label htmlFor="chieut">ㅊ</label>
                </li>
                
                <li>
                    <input type='radio' name='word' value="ㅋ" id='kieuk'
                    checked={checkedOption2 === 'ㅋ'}
                    onChange={(e) => {radioChange(e, 2)}}/>
                    <label htmlFor="kieuk">ㅋ</label>
                </li>

                <li>
                    <input type='radio' name='word' value="ㅌ" id='tieut'
                    checked={checkedOption2 === 'ㅌ'}
                    onChange={(e) => {radioChange(e, 2)}}/>
                    <label htmlFor="tieut">ㅌ</label>
                </li>
                
                <li>
                    <input type='radio' name='word' value="ㅍ" id='pieup'
                    checked={checkedOption2 === 'ㅍ'}
                    onChange={(e) => {radioChange(e, 2)}}/>
                    <label htmlFor="pieup">ㅍ</label>
                </li>

                <li>
                    <input type='radio' name='word' value="ㅎ" id='hieut'
                    checked={checkedOption2 === 'ㅎ'}
                    onChange={(e) => {radioChange(e, 2)}}/>
                    <label htmlFor="hieut">ㅎ</label>
                </li>

                <li className='x'>
                    <input type='radio' name='word' value="0" id='x'
                    checked={checkedOption2 === '0'}
                    onChange={(e) => {radioChange(e, 2)}}/>
                    <label htmlFor="x" className="ri-close-line"></label> {/* &#xEB98; */}
                </li>
                
            </ul>

            <ul className='optionGroup_color'>
                <li className='select'>
                    <label htmlFor="flclrChkVal">꽃 색</label>
                    <select name='flclrChkVal' id='flclrChkVal'>
                        <option value="0">x</option>
                        <option value="071004">빨강 색</option>
                        <option value="071005">오렌지 색</option>
                        <option value="071006">노랑 색</option>
                        <option value="071001">파랑 색</option>
                        <option value="071002">보라 색</option>
                        <option value="071003">분홍 색</option>
                        <option value="071007">흰 색</option>
                        <option value="071008">혼합 색</option>
                        <option value="071009">기타</option>
                    </select>
                </li>

                <li className='select'>
                    <label htmlFor="fmldecolrChkVal">열 매 색</label>
                    <select name='fmldecolrChkVal' id='fmldecolrChkVal'>
                        <option value="0">x</option>
                        <option value="081004">빨강 색</option>
                        <option value="081005">오렌지 색</option>
                        <option value="081006">노랑 색</option>
                        <option value="081001">파랑 색</option>
                        <option value="081002">보라 색</option>
                        <option value="081007">흰 색</option>
                        <option value="081003">검정 색</option>
                        <option value="081008">혼합 색</option>
                        <option value="081009">기타</option>
                    </select>
                </li>

                <li className='select'>
                    <label htmlFor="lefcolrChkVal">잎 색</label>
                    <select name='lefcolrChkVal' id='lefcolrChkVal'>
                        <option value="0">x</option>
                        <option value="069001">녹색, 연두색</option>
                        <option value="069002">금색, 노란색</option>
                        <option value="069003">흰색, 크림색</option>
                        <option value="069004">은색, 회색</option>
                        <option value="069005">빨강, 분홍, 자주색</option>
                        <option value="069006">여러색 혼합</option>
                        <option value="069007">기타</option>
                    </select>
                </li>
            </ul>

            <ul className='optionGroup_shape'>
                <li className='select'>
                    <label htmlFor="lefmrkChkVal">잎 무 늬</label>
                    <select name='lefmrkChkVal' id='lefmrkChkVal'>
                        <option value="0">x</option>
                        <option value="070001">줄무늬</option>
                        <option value="070002">점무늬</option>
                        <option value="070003">잎 가장자리 무늬</option>
                        <option value="070004">기타 (무늬없음 등)</option>
                    </select>
                </li>

                <li className='select'>
                    <label htmlFor="grwhstleChkVal">생육형태</label>
                    <select name='grwhstleChkVal' id='grwhstleChkVal'>
                        <option value="0">x</option>
                        <option value="054001">직립형</option>
                        <option value="054002">관목형</option>
                        <option value="054003">덩굴성</option>
                        <option value="054004">풀모양</option>
                        <option value="054005">로제트형</option>
                        <option value="054006">다육형</option>
                    </select>
                </li>
            </ul>

            <ul className='optionGroup_need'>
                <li className='select'>
                    <label htmlFor="lightChkVal">광도요구</label>
                    <select name='lightChkVal' id='lightChkVal'>
                        <option value="0">x</option>
                        <option value="055001">낮은 광도(300~800 Lux)</option>
                        <option value="055002">중간 광도(800~1,500 Lux)</option>
                        <option value="055003">높은 광도(1,500~10,000 Lux)</option>
                    </select>
                </li>

                <li className='select'>
                    <label htmlFor="waterCycleSel">물주기</label>
                    <select name='waterCycleSel' id='waterCycleSel'>
                        <option value="0">x</option>
                        <option value="053001">항상 흙을 축축하게 유지함(물에 잠김)</option>
                        <option value="053002">흙을 촉촉하게 유지함(물에 잠기지 않도록 주의)</option>
                        <option value="053004">토양 표면이 말랐을때 충분히 관수함</option>
                        <option value="053003">화분 흙 대부분 말랐을때 충분히 관수함</option>
                    </select>
                </li>

                <li className='radio'>
                    <b>꽃피는 계절</b>
                    <ul className='ignSeasonChkVal'>
                        <li>
                            <input type='radio' name='ignSeasonChkVal' value="073001" id='spring'
                            checked={checkedOption3 === '073001'}
                            onChange={(e) => {radioChange(e, 3)}}/>
                            <label htmlFor="spring">봄</label>
                        </li>
                        
                        <li>
                            <input type='radio' name='ignSeasonChkVal' value="073002" id='summer'
                            checked={checkedOption3 === '073002'}
                            onChange={(e) => {radioChange(e, 3)}}/>
                            <label htmlFor="summer">여름</label>
                        </li>

                        <li>
                            <input type='radio' name='ignSeasonChkVal' value="073003" id='fall'
                            checked={checkedOption3 === '073003'}
                            onChange={(e) => {radioChange(e, 3)}}/>
                            <label htmlFor="fall">가을</label>
                        </li>

                        <li>
                            <input type='radio' name='ignSeasonChkVal' value="073004" id='winter'
                            checked={checkedOption3 === '073004'}
                            onChange={(e) => {radioChange(e, 3)}}/>
                            <label htmlFor="winter">겨울</label>
                        </li>

                        <li className='x'>
                            <input type='radio' name='ignSeasonChkVal' value="0" id='ignSeasonChkVal_x'
                            checked={checkedOption3 === '0'}
                            onChange={(e) => {radioChange(e, 3)}}/>
                            <label htmlFor="ignSeasonChkVal_x" className="ri-close-line"></label>
                        </li>

                    </ul>
                </li>

                <li className='radio'>
                    <b>겨울 최저온도</b>
                    <ul className='winterLwetChkVal'>
                        <li>
                            <input type='radio' name='winterLwetChkVal' value="057001" id='zeroDegDown'
                            checked={checkedOption4 === '057001'}
                            onChange={(e) => {radioChange(e, 4)}}/>
                            <label htmlFor="zeroDegDown">0℃ 이하</label>
                        </li>
                        
                        <li>
                            <input type='radio' name='winterLwetChkVal' value="057002" id='fiveDeg'
                            checked={checkedOption4 === '057002'}
                            onChange={(e) => {radioChange(e, 4)}}/>
                            <label htmlFor="fiveDeg">5℃</label>
                        </li>

                        <li>
                            <input type='radio' name='winterLwetChkVal' value="057003" id='sevenDeg'
                            checked={checkedOption4 === '057003'}
                            onChange={(e) => {radioChange(e, 4)}}/>
                            <label htmlFor="sevenDeg">7℃</label>
                        </li>

                        <li>
                            <input type='radio' name='winterLwetChkVal' value="057004" id='tenDeg'
                            checked={checkedOption4 === '057004'}
                            onChange={(e) => {radioChange(e, 4)}}/>
                            <label htmlFor="tenDeg">10℃</label>
                        </li>

                        <li>
                            <input type='radio' name='winterLwetChkVal' value="057005" id='thirteenDegUp'
                            checked={checkedOption4 === '057005'}
                            onChange={(e) => {radioChange(e, 4)}}/>
                            <label htmlFor="thirteenDegUp">13℃ 이상</label>
                        </li>

                        <li>
                            <input type='radio' name='winterLwetChkVal' value="0" id='winterLwetChkVal_x'
                            checked={checkedOption4 === '0'}
                            onChange={(e) => {radioChange(e, 4)}}/>
                            <label htmlFor="winterLwetChkVal_x" className="ri-close-line"></label>
                        </li>

                    </ul>
                </li>
            </ul>

            <ul className='optionGroup_money'>
                <li className='select'>
                    <label htmlFor="priceTypeSel">가격대</label>
                    <select name='priceTypeSel' id='priceTypeSel'>
                        <option value="0">x</option>
                        <option value="068001">5천원 미만</option>
                        <option value="068002">5천원-1만원</option>
                        <option value="068003">1-3만원</option>
                        <option value="068004">3-5만원</option>
                        <option value="068005">5-10만원</option>
                        <option value="068006">10만원 이상</option>
                    </select>
                </li>
            </ul> 
          </div>

          <div className='bottom_hide' />{/* 마우스 휠 표시부분 */}

          <button type='button' className='underBtn' onClick={formActiveFun}/>

      </form>
    </>
  )
}
