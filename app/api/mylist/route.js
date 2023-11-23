import { queryExecute } from "../db";


// login
export async function GET(req){
    const memberId = req.nextUrl.searchParams.get('memberId'); // 이걸로 url?id=값 의 값 가져올 수 있음
    const q = 'select * from my_heart_list where id = ?'
    const data = await queryExecute(q, [memberId]);
    console.log('가져온 리스트 데이터', data, memberId);

    return Response.json(data);  
}//GET()


export async function POST(req){    
    const {data} = await req.json(); //id, cntntsNo
    console.log('포스트 데이터: ');
    console.log(data);
    console.log(typeof(data.id),typeof(data.cntntsNo),typeof(data.cntntsSj),typeof(data.thumImg),typeof(data.detailImg));
    const q = 'insert into my_heart_list (id, cntntsNo, cntntsSj, thumImg, detailImg) values(?,?,?,?,?)';


    await queryExecute(q, [data.id, data.cntntsNo, data.cntntsSj, data.thumImg, data.detailImg]);
    return Response.json({done: '올리기 성공!!!'});
}//POST(req)


export async function DELETE(req){
    const {memberId, cntntsNo} = Object.fromEntries(req.nextUrl.searchParams);
    const q = 'delete from my_heart_list where id=? AND cntntsNo=?';
    await queryExecute(q, [memberId, cntntsNo]);

    return Response.json({done: '삭제 성공!!!'});
}//DELETE(req)