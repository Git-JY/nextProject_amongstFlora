import { queryExecute } from "../../db";


// export async function POST(req){    
//     const {formData, currentId} = await req.json(); //await를 건 게 title, imgUrl값 들어오는데 시간이 걸려서 기다리라고 씀
//     const q = `insert into member_journal (id, plantNick, plantName, journalDate, journalMemo, img) values(?,?,?,?,?,?)`; // files 테이블에 레코드 삽입
//     console.log('formData: ', formData);
//     console.log('ididid', currentId, typeof(currentId));

//     await queryExecute(q, [currentId, formData.plantNick, formData.plantName, formData.journalDate, formData.journalMemo, formData.plantImg]);
 
//     return Response.json({done: '성공!!!'});
// }


export async function POST(req){    
    const {formData, currentId} = await req.json(); //await를 건 게 title, imgUrl값 들어오는데 시간이 걸려서 기다리라고 씀
    const q = `insert into member_journal (id, plantNick, plantName, journalDate, journalMemo, img) values(?,?,?,?,?,?)`; // files 테이블에 레코드 삽입
    console.log('formData: ', formData);
    console.log('ididid', currentId, typeof(currentId));

    let plantImgStr = '';
    formData.plantImg.map((src, k)=>{
        if(k==0){
            plantImgStr = src;
        }else{
            plantImgStr += '.....' + src;
        }
        
    })
    console.log('plantImgStr', plantImgStr);

    await queryExecute(q, [currentId, formData.plantNick, formData.plantName, formData.journalDate, formData.journalMemo, plantImgStr]);
 
    return Response.json({done: '성공!!!'});
}