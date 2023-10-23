import { queryExecute } from "../../db";

export async function GET(req){
    const {currentId, plantNick} = Object.fromEntries(req.nextUrl.searchParams) ;
    console.log('currentId, plantNick: ', currentId, plantNick);

    const q = 'SELECT * FROM member_journal WHERE id=? AND plantNick=?'; //?말고 ${}하니 잘 못가져옴, ?로 하삼

    const data = await queryExecute(q, [currentId, plantNick]);
    console.log('DB에서 가져온 data: ', data);

    return Response.json(data);  
    // return Response.json(data);  
}

export async function DELETE(req){
    const memberId = req.nextUrl.searchParams.get('id');
    const q = `delete from member_journal where id=?`;
    await queryExecute(q, [memberId]);
}