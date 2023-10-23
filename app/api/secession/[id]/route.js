import { queryExecute } from "../../db";

export async function DELETE(req, {params}){ 
    
    const q1 = `delete from Login_member where id=?`;
    await queryExecute(q1, [params.id]);

    const q2 = `delete from member_journal where id=?`;
    await queryExecute(q2, [params.id]);
    
    return Response.json({data: '삭제성공!'});
    // return Response.json([]);
}
