const convert = require('xml-js');
import { detailDb } from '../../db'; 

export async function GET(req, {params}){ //{params}로 동적라우팅 값 detail/[cntntsNo] 가져올 수 있음
    // const {cntntsNo} = params;

    //req.nextUrl.searchParams.get('paramKey') 
    // 이걸로 url?paramKey=값 의 값 가져올 수 있음

    //const {cntntsNo} = Object.fromEntries(req.nextUrl.searchParams) 
    // 이걸로 url?paramKey1=값1&paramKey2=값2 의 값들 한꺼번에 가져올 수 있음
    

    console.log('params: ', params) // { cntntsNo: '값' }

    let takedData = await detailDb.get('/', {params: {cntntsNo: params.cntntsNo}});

    let jsonDataStr = convert.xml2json(takedData.data, {compact: true, spaces: 4}); // spaces: 스페이스바
    let jsonData = JSON.parse(jsonDataStr);
    let itemObj = jsonData.response.body.item;
    console.log('itemObj: ', itemObj);
 
    return Response.json(itemObj);
}