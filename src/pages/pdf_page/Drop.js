import React, { useCallback } from "react";
import { useDropzone } from 'react-dropzone'; // 오타 수정
import { cleanBorder, primary45 } from './utils/colors'; // cleanBoarder 오타 수정

export default function Drop({ onLoaded }) {
    const styles = {
        container: {
            textAlign: "center", // 오타 수정
            border: cleanBorder, // 오타 수정
            padding: 20,
            marginTop: 12,
            color: primary45,
            fontSize: 18,
            fontWeight: 600,
            borderRadius: 4,
            userSelect: "none",
            outline: 0,
            cursor: "pointer",
        },
    };

    //파일 삭제 처리
    const onDrop = useCallback((acceptedFiles) => {
        onLoaded(acceptedFiles);
        // file 설정 하기
    }, [onLoaded]);

    //Dropzone 구성 요소 생성
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "application/pdf",
    });

    // 랜더링 Dropzone
    return (
        <div {...getRootProps()} style={styles.container}>
            <input {...getInputProps()} />
            {isDragActive ? <p>Drop a PDF here</p> : <p>Drag a PDF here</p>}
            {/* 만약 드래그 중이면 여기다 놓으세요 아니면 PDF를 드레그 하세요 내용 변경 */}
        </div>
    );
}
