import { queryExecute } from "../../db";


export async function GET(req){
    const currentId = req.nextUrl.searchParams.get('currentId');
    console.log('currentId', currentId);
    const q = 'select plantNick, plantKind, dateWrapper from recordplant where id = ?';
    const data = await queryExecute(q, [currentId]);
    console.log('가져온 데이터', data);

    return Response.json(data);  
}//GET()



export async function POST(req){    
    const {formData, currentId} = await req.json(); //await를 건 게 title, imgUrl값 들어오는데 시간이 걸려서 기다리라고 씀
                            // 대소문자 구분하더라(recordPlant_date 라고 쓰지 않도록 조심!)
    const q1 = 'insert into recordplant_date (id, plantNick, plantKind, mainTxt, img, recordDate) values(?,?,?,?,?,?)';
    console.log('formData: ', formData);

    let plantImgStr = '';

    if(formData.img.length != 0){
        formData.img.map((src, k)=>{
            if(k==0){
                plantImgStr = src;
            }else{
                plantImgStr += '.....' + src;
            }
            
        })
    }else{
        console.log("img노등록");
    }


    const q2 = 'select * from recordplant_date where id = ? AND plantNick = ?';
    let getData = await queryExecute(q2, [currentId, formData.plantNick]);
    console.log('getData==========', getData);

    let q3 = '';

    
    if(getData.length == 0){// 해당 식물을 처음 등록하는 경우)
        console.log('해당 식물은 처음 등록')
        let thumImg = '';
        if(formData.img.length != 0){// 이미지가 등록되어 있다면)
            thumImg = formData.img[0];
        }


        q3 = 'insert into recordplant (id, plantNick, plantKind, thumImg, dateWrapper, latestDate) values(?,?,?,?,?,?)';
        await queryExecute(q3, [currentId, formData.plantNick, formData.plantKind, thumImg, formData.recordDate, formData.recordDate]);

    }else{// 이전에 등록한 적이 있는 경우)

        // 해당 id의 해당 식물 가져옮
        const imsiQ = 'select * from recordplant where id = ? AND plantNick = ?',
              getData_plant = await queryExecute(imsiQ, [currentId, formData.plantNick]); 
        console.log('getData_plant', getData_plant, getData_plant[0]);

        let dateWrapArr = getData_plant[0].dateWrapper.split('.....');
        dateWrapArr.push(formData.recordDate);
        console.log('dateWrapArr', dateWrapArr);
        console.log('dateWrapArr.sort()', dateWrapArr.sort());
        dateWrapArr = dateWrapArr.sort();
        console.log('dateWrapArr sort()이후', dateWrapArr);

        let dateWrapStr = '';
        dateWrapArr.map((dateItem, k)=>{
            if(k==0){
                dateWrapStr = dateItem;
            }else{
                dateWrapStr += '.....' + dateItem;
            }
        })
        console.log('dateWrapStr', dateWrapStr);
        console.log('dateWrapArr', dateWrapArr[dateWrapArr.length - 1])

        q3 = 'update recordplant set dateWrapper = ?, latestDate = ? where id = ? AND plantNick = ?';
        await queryExecute(q3, [dateWrapStr, dateWrapArr[dateWrapArr.length - 1], currentId, formData.plantNick]);
    }

    await queryExecute(q1, [currentId, formData.plantNick, formData.plantKind, formData.recordMemo, plantImgStr, formData.recordDate]);

    return Response.json({done: '성공!!!'});
}