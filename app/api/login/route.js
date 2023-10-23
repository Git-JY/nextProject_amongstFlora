import { queryExecute } from "../db";

// login
export async function GET(){
    const q = 'select * from Login_member'
    const data = await queryExecute(q)
    console.log('가져온 데이터', data);

    return Response.json(data);  
}

export async function POST(req){    
    const {data} = await req.json(); //await를 건 게 title, imgUrl값 들어오는데 시간이 걸려서 기다리라고 씀
    const q = `insert into Login_member (id, pw, nick, date) values(?,?,?,?)`; // files 테이블에 레코드 삽입


    // const imgUrl = req.nextUrl.searchParams.get('imgUrl');
    // console.log('title, imgUrl', title, imgUrl);

    await queryExecute(q, [data.id, data.pw, data.nick, data.date]);
    return Response.json({done: '성공!!!'});
}

export async function DELETE(req){
    const memberId = req.nextUrl.searchParams.get('id');
    const q = `delete from Login_member where id=?`;
    await queryExecute(q, [memberId]);
}