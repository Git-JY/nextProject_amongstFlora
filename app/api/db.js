import axios from 'axios';

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : process.env.NEXT_PUBLIC_HOST,
  user     : process.env.NEXT_PUBLIC_USER,
  password : process.env.NEXT_PUBLIC_PASSWORD,
  database : process.env.NEXT_PUBLIC_DATABASE,
  port : process.env.NEXT_PUBLIC_PORT
});

connection.connect();

export async function queryExecute(str, value){

    // return await new Promise((resolve, reject) => { // 이렇게 바로 return해도 되고
    
    let data = await new Promise((resolve, reject) => { // 이렇게 data로 넣은 후 보내도 됨
        connection.query(str, value, function(error, results){ // value는 str의 ?에 들어감
            resolve(results);  // 성공하면 resolve()의 인수 (ex. result)가 return // 실패하면 reject()의 인수가 return (ex. reject('실패') => '실패' 문자열 리턴)
        });
    });

    return data;

}//queryExecute(str) 함수정의


export const searchDb = axios.create({
    baseURL:'http://api.nongsaro.go.kr/service/garden/gardenList',
    params: {
        'apiKey': '20231005GLWWH4BTXKR0QJN79FOHSW',
    }
})//searchDb //axios.create

//http://api.nongsaro.go.kr/service/garden/gardenDtl?cntntsNo=12988&apiKey=20231005GLWWH4BTXKR0QJN79FOHSW
export const detailDb = axios.create({
    baseURL:'http://api.nongsaro.go.kr/service/garden/gardenDtl',
    params: {
        'apiKey': '20231005GLWWH4BTXKR0QJN79FOHSW',
    }
})//searchDb //axios.create
