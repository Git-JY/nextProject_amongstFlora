const convert = require('xml-js');
import { searchDb } from "../db";

// 서치한 후
export async function POST(req){    
    const {data} = await req.json(); 
    console.log('검색옵션: ', data);

    let paramObj = {};

    if(data.sText != ''){// 검색 내용
        paramObj.sType = data.sType;
        paramObj.sText = data.sText;
    }
    if(data.word != '0'){// 첫 글자(한글)
        paramObj.wordType = 'cntntsSj';
        paramObj.word = data.word;
    }

    if(data.flclrChkVal != '0'){ // 꽃 색
        paramObj.flclrChkVal = data.flclrChkVal;
    }

    if(data.fmldecolrChkVal != '0'){ // 열매 색
        paramObj.fmldecolrChkVal = data.fmldecolrChkVal;
    }

    if(data.lefcolrChkVal != '0'){ // 잎 색
        paramObj.lefcolrChkVal = data.lefcolrChkVal;
    }

    if(data.lefmrkChkVal != '0'){ // 잎무늬
        paramObj.lefmrkChkVal = data.lefmrkChkVal;
    }

    if(data.grwhstleChkVal != '0'){ // 생육형태
        paramObj.grwhstleChkVal = data.grwhstleChkVal;
    }

    if(data.lightChkVal != '0'){ // 광도요구
        paramObj.lightChkVal = data.lightChkVal;
    }

    if(data.waterCycleSel != '0'){ // 물주기
        paramObj.waterCycleSel = data.waterCycleSel;
    }

    if(data.ignSeasonChkVal != '0' && data.ignSeasonChkVal != undefined){ // 꽃 피는 계절
        paramObj.ignSeasonChkVal = data.ignSeasonChkVal;
    }

    if(data.winterLwetChkVal != '0' && data.ignSeasonChkVal != undefined){ // 겨울 최저온도
        paramObj.winterLwetChkVal = data.winterLwetChkVal;
    }

    if(data.priceTypeSel != '0'){ // 가격대
        paramObj.priceTypeSel = data.priceTypeSel;
    }

    if(data.pageNo){ //pageNo이 있을 때
        paramObj.pageNo = data.pageNo;
    }
    paramObj.numOfRows = 9; // 갖고 올 아이템을 9개로 함
    // console.log('전체: ', parasmObj);

    let takedData = await searchDb.get('/', {params: paramObj});
    // console.log('결과: ', takedData.data);

    let jsonData = convert.xml2json(takedData.data, {compact: true, spaces: 4}); // spaces: 스페이스바
    jsonData = JSON.parse(jsonData);
    let itemObj = jsonData.response.body.items;
    
    console.log('json결과: ', itemObj);
    // console.log('json타입: ', typeof(itemObj));

    return Response.json(itemObj);
}

/* 
// 이건 그냥 테스트
export async function GET(req){
    // const paramValue = req.nextUrl.searchParams.get('paramKey'); 
    // console.log('paramValue: ', paramValue);
    // 이걸로 url?paramKey=값 의 값 가져올 수 있음

    // const urlParamsObj = Object.fromEntries(req.nextUrl.searchParams);
    // console.log('urlParams객체: ', urlParamsObj);

    // const {paramKey1} = Object.fromEntries(req.nextUrl.searchParams);
    // console.log("paramKey1:", paramKey1);
    // 이걸로 url?paramKey1=값1&paramKey2=값2 의 값들 한꺼번에 가져올 수 있음

    
    return Response.json({data: '성공'});
}
 */