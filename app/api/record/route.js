import { queryExecute } from "../db";

export async function GET(req){
    const {currentId, selectDate} = Object.fromEntries(req.nextUrl.searchParams) ;

    const q = 'SELECT * FROM recordplant_date WHERE id=? AND recordDate=?'; 

    const data = await queryExecute(q, [currentId, selectDate]);
    console.log('DB에서 가져온 data: ', data);

    return Response.json(data);  
    // return Response.json(data);  
}



export async function POST(req){    
    const {currentId} = await req.json(); 

    const q = 'SELECT * FROM recordplant WHERE id=?';
    const data = await queryExecute(q, [currentId]);

    return Response.json(data);
}