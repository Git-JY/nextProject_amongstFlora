import { queryExecute } from "../../db";

export async function GET(req){
    const {currentId, plantNick, recordDate} = Object.fromEntries(req.nextUrl.searchParams) ;
    console.log('currentId, plantNick, recordDate: ', currentId, plantNick, recordDate);

    const q = 'SELECT * FROM recordplant_date WHERE id=? AND plantNick=? AND recordDate=?'; //?말고 ${}하니 잘 못가져옴, ?로 하삼

    const data = await queryExecute(q, [currentId, plantNick, recordDate]);
    console.log('DB에서 가져온 data: ', data);

    return Response.json(data[0]);  
}





export async function POST(req){    
    const {currentId, plantNick} = await req.json(); //await를 건 게 title, imgUrl값 들어오는데 시간이 걸려서 기다리라고 씀
                            // 대소문자 구분하더라(recordPlant_date 라고 쓰지 않도록 조심!)
    const q = 'SELECT dateWrapper FROM recordplant WHERE id=? AND plantNick=?';
    const data = await queryExecute(q, [currentId, plantNick]);
    
    const dateArr = data[0].dateWrapper.split('.....');
    console.log('dateArr-----', dateArr);

    return Response.json(dateArr);
}





export async function DELETE(req){
    const memberId = req.nextUrl.searchParams.get('id');
    const q = `delete from member_journal where id=?`;
    await queryExecute(q, [memberId]);
}