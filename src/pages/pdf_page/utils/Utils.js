/*
교수님께서 말하신 파일 Binary Large Object 로 변환 후 URL로 전달해서 사용 
JS에서 파일과 유사한 객체

사용이유 
a. Blob은 파일 데이터를 JS에서 직접 조작할 수 있게 해준다. ex) 이미지 파일의 크기를 조정 or 일부내용을 편집
b. 파일을 서버에 업로드할 때 유용
c. 파일을 Blob 형태로 변환 후 URLcreateObjectURL를 사용하여 Blob URL을 생성하면, 이를 통해 이미지나 비디오등의 미리보기 기능 제공



 파일과 Blob 객체를 처리하여 URL로 변환
 파일을 Blob객체로 변환하는 유틸리티 함수

 함수 설명 
blobToURL

fileToBlob 
파일 객체를 Blob객체로 변환
파일 내용을 덩어리 단위ㅗㄹ 읽고

*/

export function blobToURL(blob) {

    return new Promise((resolve) => {
        const reader = new FileReader();// 객체 생성
        reader.readAsDataURL(blob);// Blob => Data URL
        reader.onloadend = function () {  // 읽기 완료시 호출되는 함수
            const base64data = reader.result; //  읽어온 데이터 URL
            resolve(base64data); // 데이터 URL반환
        };
    });
}

// 파일 객체를 Blob 객체로 변환하는 비동기 함수
export async function fileToBlob(file, handleUpdate) {
    const { content, size } = file; // 파일의 내용과 크기 추출
    let chunks = []; // 청크를 저장할 배열
    let i = 0; // 청크 인덱스
    const totalCount = Math.round(size / 250000); // 총 청크 수 계산

    for await (const chunk of content) { // 파일 내용을 청크 단위로 읽기
        if (handleUpdate) {
            handleUpdate(i, totalCount); // 진행 상황 업데이트
        }
        chunks.push(chunk); // 청크를 배열에 추가
        i++;
    }
    return new Blob(chunks); // 청크 배열을 Blob 객체로 변환하여 반환
}