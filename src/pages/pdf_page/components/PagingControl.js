// PagingControl.js
import { BigButton } from "./BigButton";
import { primary45 } from "../utils/colors";
import React from 'react';
/*
사용자가 페이지를 전환할 수 있게 해준다.
현재 페이지 번호와 전체 페이지 수를 받아서 페이지 전환 버튼과 페이지 정보를 표시
*/

export default function PagingControl({ totalPages, pageNum, setPageNum }) {
    const styles = {
        container: {
            marginTop: 8,
            marginBottom: 8,
        },
        inlineFlex: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        pageInfo: {
            padding: 8,
            color: primary45,
            fontSize: 14,
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.inlineFlex}>
                {/* 이전 페이지 이동 */}
                <BigButton
                    title={"<"}
                    onClick={() => setPageNum(pageNum - 1)}
                    //첫 페이지 일 경우 비활성화
                    disabled={pageNum === 0}
                />
                {/* 현재 페이지 정보 표시 */}
                <div style={styles.pageInfo}>
                    Page: {pageNum + 1}/{totalPages}
                </div>
                {/* 다음 페이지 이동 */}
                <BigButton
                    title={">"}
                    onClick={() => setPageNum(pageNum + 1)}
                    // 마지막 페이지 일 경우 비활성화
                    disabled={pageNum + 1 >= totalPages}
                />
            </div>
        </div>
    );
}