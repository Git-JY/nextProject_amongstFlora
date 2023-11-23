"use client"
import React, { useContext, useEffect } from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination } from 'swiper/modules';
import { Mycontext } from '@/app/Context';

export default function Detail() {
  const {setVisual, detailObj} = useContext(Mycontext);

  useEffect(()=>{
    setVisual('noHeader');

    console.log('detailObj: ', detailObj);

  }, []);

  const titleFun = (oriTitle='', num = 0) => {
    let end = oriTitle.indexOf('(');
  
    
    if(!num){
      if(end <= -1){
        return oriTitle;
      }
      return oriTitle.slice(0, end);
    }else{
      if(end <= -1){
        return '';
      }
      return oriTitle.slice(end, oriTitle.length);
    }
  }//titleFun() 함수정의

  const sliceFun = (oriTitle='', num=0) => {
      let arr = oriTitle.split(',');

      return arr;
      
  }//sliceFun() 함수정의

  const accordionFun = (e) => {
    e.target.parentElement.classList.toggle('active');
  }//accordionFun();

  if(!detailObj) return (<>로딩 중...</>);
  
  return (
    <>
      <section className='infoAllWrapper'>      
        <div className='nameWrapper'>

          <div className='titleWrapper'>
            <div className='titleUp'>
              <h2 className='title1'>{titleFun(detailObj?.distbNm._cdata)}</h2> {/* distbNm //유통명 */}
              <ul className='eclgyCodeNm'>
                {
                  sliceFun(detailObj?.eclgyCodeNm._cdata).map(
                    (str, k)=>(
                      <li key={k}>{str}</li>
                    )
                  )
                }
              </ul>
            </div>
            <strong className='title2'>{titleFun(detailObj?.distbNm._cdata, 1)}</strong>
          </div>

          <span className='plntzrNm'>{detailObj?.plntzrNm._cdata}</span><br/>
          <span className='plntbneNm'>{detailObj?.plntbneNm._cdata}</span>
        </div>{/* div.nameWrapper */}


        <div className='basicToxctyInfoWrapper'>
          {detailObj.toxctyInfo._cdata?
            (
              <span className='toxctyWarning'>
                <i className='icon ri-alert-line' />독성: {detailObj?.toxctyInfo._cdata}
              </span>
            ) : ''
          }
          <table className='basicWrapper' border-collapse='collapse'>
            <tbody>
              <tr>
                <th>원산지</th>
                <td>{detailObj?.orgplceInfo._cdata}</td>
              </tr>
              <tr>
                <th>과명</th>
                <td>{detailObj?.fmlCodeNm._cdata}</td>
              </tr>
            </tbody>
          </table>
        </div>{/* div.basicToxctyInfoWrapper */}

{/* // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== */}
        <div className='infoWrapper'>

          <article className='colorInfoAccordion accordion'>
            <h3 onClick={accordionFun}><i className='icon ri-palette-fill' />색 정보<span className='ri-arrow-drop-down-line' /></h3>
            <div className='accordion colorAccordion'>
              <table className='colorInfoWrapper infoTable'>
                <tbody>
                  <tr>
                    <th><i className='icon'></i>꽃 색</th>
                    <td>{/* <span className='colorPoint'/> */}{detailObj?.flclrCodeNm._cdata}</td>
                  </tr>
                  <tr>
                    <th><i className='icon'></i>열 매 색</th>
                    <td>{/* <span className='colorPoint'/> */}{detailObj?.fmldecolrCodeNm._cdata}</td>
                  </tr>
                  <tr>
                    <th><i className='icon ri-seedling-line' />잎 색</th>
                    <td>{/* <span className='colorPoint'/> */}{detailObj?.lefcolrCodeNm._cdata}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>

          
          <article className='formInfoAccordion accordion'>
            <h3 onClick={accordionFun}><i className='icon ri-shapes-fill' />형태 정보<span className='ri-arrow-drop-down-line' /></h3>
            <div className='accordion formAccordion'>
              <table className='infoTable'>
                <tbody>
                  <tr>
                    <th><i className='icon ri-plant-line'></i>생육형태</th>
                    <td>{detailObj?.grwhstleCodeNm._cdata}</td>
                  </tr>
                  <tr>
                    <th><i className='icon ri-leaf-line'></i>잎 무 늬</th>
                    <td>{detailObj?.lefmrkCodeNm._cdata}</td>
                  </tr>
                  <tr>
                    <th><i className='icon ri-leaf-line' />잎 형태</th>
                    <td>{detailObj?.lefStleInfo._cdata}</td>
                  </tr>
                  <tr>
                    <th><i className='icon ri-tree-line' />실내정원구성</th>
                    <td>{detailObj?.indoorpsncpacompositionCodeNm._cdata}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>
          
          
          <article className='lengthInfoAccordion accordion'>
            <h3 onClick={accordionFun}><i className='icon ri-ruler-fill' />길이 정보<span className='ri-arrow-drop-down-line' /></h3>
            <div className='accordion'>
              <table className='infoTable'>
                <tbody>
                  <tr>
                    <th>성장 높이(H)</th>
                    <td>{detailObj?.growthHgInfo._cdata} cm</td>
                  </tr>
                  <tr>
                    <th>성장 너비(W)</th>
                    <td>{detailObj?.growthAraInfo._cdata} cm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>

          <article className='useInfoAccordion accordion'>
            <h3 onClick={accordionFun}><i className='icon ri-bubble-chart-fill' />사용 용도<span className='ri-arrow-drop-down-line' /></h3>
            <div className='accordion'>
              <table className='infoTable'>
                <tbody>
                  <tr>
                    <th>관상 분류</th>
                    <td>{detailObj?.clCodeNm._cdata}</td>
                  </tr>
                  <tr>
                    <th>조언 정보</th>
                    <td>{detailObj?.adviseInfo._cdata}</td>
                  </tr>
                  <tr>
                    <th>기능성 정보</th>
                    <td>{detailObj?.fncltyInfo._cdata}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>
          
          <article className='needInfoAccordion accordion'>
            <h3 onClick={accordionFun}><i className='icon ri-information-fill' />키우는 데 필요한 정보<span className='ri-arrow-drop-down-line' /></h3>
            <div className='accordion'>
              <table className='infoTable'>
                <tbody>
                  <tr>
                    <th><i className='icon ri-temp-hot-line'></i>생육 온도</th>
                    <td>{detailObj?.grwhTpCodeNm._cdata}</td>
                  </tr>
                  <tr>
                    <th><i className='icon ri-temp-cold-line'></i>겨울 최저 온도</th>
                    <td>{detailObj?.winterLwetTpCodeNm._cdata}</td>
                  </tr>
                  <tr>
                    <th><i className='icon ri-contrast-drop-2-line'></i>습도</th>
                    <td>{detailObj?.hdCodeNm._cdata}</td>
                  </tr>
                  <tr>
                    <th><i className='icon ri-sun-line'></i>광 요구도</th>
                    <td>{detailObj?.lighttdemanddoCodeNm ._cdata}</td>
                  </tr>
                  <tr>
                    <th><i className='icon ri-layout-grid-line'></i>토양 정보</th>
                    <td>{detailObj?.soilInfo._cdata}</td>
                  </tr>
                  <tr>
                    <th><i className='icon ri-sparkling-2-line'></i>비료 정보</th>
                    <td>{detailObj?.frtlzrInfo._cdata}</td>
                  </tr>
                  <tr>
                    <th><i className='icon ri-home-8-line'></i>배치 장소</th>
                    <td>{detailObj?.postngplaceCodeNm._cdata}</td>
                  </tr>
                  <tr>
                    <th><i className='icon ri-bug-line'></i>병충해</th>
                    <td>{detailObj?.dlthtsCodeNm._cdata}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>

          <article className='waterInfoAccordion accordion'>
            <h3 onClick={accordionFun}><i className='icon ri-contrast-drop-2-fill' />계절별 물주기<span className='ri-arrow-drop-down-line' /></h3>
            <div className='accordion'>
              <table className='infoTable'>
                <tbody>
                  <tr>
                    <th>봄</th>
                    <td>{detailObj?.watercycleSprngCodeNm._cdata}</td>
                  </tr>
                  <tr>
                    <th>여름</th>
                    <td>{detailObj?.watercycleSummerCodeNm._cdata}</td>
                  </tr>
                  <tr>
                    <th>가을</th>
                    <td>{detailObj?.watercycleAutumnCodeNm._cdata}</td>
                  </tr>
                  <tr>
                    <th>겨울</th>
                    <td>{detailObj?.watercycleWinterCodeNm._cdata}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>

          <article className='periodInfoAccordion accordion'>
            <h3 onClick={accordionFun}><i className='icon ri-calendar-2-fill' />계절별 물주기<span className='ri-arrow-drop-down-line' /></h3>
            <div className='accordion'>
              <table className='infoTable'>
                <tbody>
                  <tr>
                    <th><i className='icon' /> 발화 계절</th>
                    <td>{detailObj?.ignSeasonCodeNm._cdata}</td>
                  </tr>
                  <tr>
                    <th><i className='icon' /> 과일 계절</th>
                    <td>{detailObj?.fmldeSeasonCodeNm._cdata}</td>
                  </tr>
                  <tr>
                    <th>번식 시기</th>
                    <td>{detailObj?.prpgtEraInfo._cdata}</td>
                  </tr>
                  <tr>
                    <th>기타 시기</th>
                    <td>{detailObj?.etcEraInfo._cdata}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>

          <article className='levelInfoAccordion accordion'>
            <h3 onClick={accordionFun}><i className='icon ri-honour-fill' />난이도<span className='ri-arrow-drop-down-line' /></h3>
            <div className='accordion'>
              <table className='infoTable'>
                <tbody>
                  <tr>
                    <th>관리수준 코드명</th>
                    <td>{detailObj?.managelevelCodeNm._cdata}<span className='colorPoint'/></td>
                  </tr>
                  <tr>
                    <th>관리요구도 코드명</th>
                    <td>{detailObj?.managedemanddoCodeNm._cdata}</td>
                  </tr>
                  <tr>
                    <th>생장속도 코드명</th>
                    <td>{detailObj?.grwtveCodeNm._cdata}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>

          <article className='warningInfoAccordion accordion'>
            <h3 onClick={accordionFun}><i className='icon ri-alert-fill' />주의 사항<span className='ri-arrow-drop-down-line' /></h3>
            <div className='accordion'>
              <table className='infoTable'>
                <tbody>
                  <tr>
                    <th><i className='icon ri-alert-line' />독성 정보</th>
                    <td>{detailObj?.toxctyInfo._cdata}</td>
                  </tr>
                  <tr>
                    <th><i className='icon ri-blaze-line' />냄새 코드</th>
                    <td>{detailObj?.smellCodeNm._cdata}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>

          <article className='etcInfoAccordion accordion'>
            <h3 onClick={accordionFun}><i className='icon ri-more-2-fill' />기타 정보<span className='ri-arrow-drop-down-line' /></h3>
            <div className='accordion'>
              <table className='infoTable'>
                <tbody>
                  <tr>
                    <th>병충해 관리</th>
                    <td className={detailObj.dlthtsManageInfo._cdata == '' ? 'noData' : ''}
                    >{detailObj?.dlthtsManageInfo._cdata}</td>
                  </tr>
                  <tr>
                    <th>특별 관리</th>
                    <td>{detailObj?.speclmanageInfo._cdata}</td>
                  </tr>
                  <tr>
                    <th>번식 방법</th>
                    <td>{detailObj?.prpgtmthCodeNm._cdata}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>



        </div>


      </section>
    </>
  )
}
