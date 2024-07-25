// ConfirmOrCancel.js
import { BigButton } from './BigButton';
import React from "react";

/*
확인 버튼과 선택적 취소 버튼 제공하는 UI
=> 사용자가 작업 확인 or 취소해야할 때
*/

export function ConfirmOrCancel({
    onCancel, //취소 버튼 클릭했을때 호출함수
    onConfirm, // 확인버튼 클릭했을때 호출함수
    confirmTitle = "Confirm", //확인 버튼에 표시할 텍스트
    leftBlock,  // 버튼 왼쪽에 표시할 선택적요소
    hideCancel, //취소버튼 숨길지 여부 결정
    disabled // 확인버튼을 비활성
}) {
    const styles = {
        action: {
            display: "flex",
            justifyContent: "space-between",
        },
        cancel: {
            marginRight: 8,
        },
    };

    return (
        <div style={styles.action}>
            <div>{leftBlock}</div>
            <div>
                {
                    !hideCancel ? (
                        <BigButton
                            title={"Cancel"} // 취소 버튼의 제목
                            style={styles.cancel} // 취소 버튼에 스타일 적용
                            onClick={onCancel} //클릭이벤트 처리
                        />
                    ) : null
                }
                <BigButton
                    title={confirmTitle} // 확인 버튼의 제목
                    inverted={true} // 버튼을 다르게 스타일링 하는 Prop
                    onClick={onConfirm} // 클릭 이벤트 처리
                    disabled={disabled} //disabled 가 true이면 버튼 활성화
                />
            </div>
        </div>
    );
}