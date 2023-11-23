import { queryExecute } from "@/app/api/db";


export async function GET(req){
    const {currentId, plantNick, selectDate} = Object.fromEntries(req.nextUrl.searchParams) ;
    console.log('currentId, plantNick, selectDate: ', currentId, plantNick, selectDate);

    const q = 'delete from member_journal WHERE id=? AND plantNick=? AND journalDate=?'; //?말고 ${}하니 잘 못가져옴, ?로 하삼

    await queryExecute(q, [currentId, plantNick, selectDate]);

    return Response.json({data: '성공'});  
    // return Response.json(data);  
}