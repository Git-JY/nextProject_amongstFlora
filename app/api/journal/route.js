import { queryExecute } from "../db";

export async function GET(req){
    const {currentId, selectDate} = Object.fromEntries(req.nextUrl.searchParams) ;

    const q = 'SELECT * FROM member_journal WHERE id=? AND journalDate=?'; //?말고 ${}하니 잘 못가져옴, ?로 하삼

    const data = await queryExecute(q, [currentId, selectDate]);
    console.log('DB에서 가져온 data: ', data);

    return Response.json(data);  
    // return Response.json(data);  
}