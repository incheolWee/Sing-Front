// AddSigDialog.js
import React, { useRef } from 'react';
import { Dialog } from "./Dialog";
import SignatureCanvas from "react-signature-canvas";
import { ConfirmOrCancel } from "./ConfirmOrCancel";
import { primary45 } from "../utils/colors";

/*
사용자에게 서명을 추가할 수 있는 다이얼 로그 제공, +@ 서명 캔버스 자동 날짜/시간 추가 옵션 확인및 취소 버튼 포함
*/

export function AddSigDialog({ onConfirm, onClose, autoDate, setAutoDate }) {
    const sigRef = useRef(null);

    const styles = {
        sigContainer: {
            display: "flex",
            justifyContent: "center",
        },
        sigBlock: {
            display: "inline-block",
            border: `1px solid ${primary45}`,
        },
        instructions: {
            display: "flex",
            justifyContent: "space-between",
            textAlign: "center",
            color: primary45,
            marginTop: 8,
            width: 600,
            alignSelf: "center",
        },
        instructionsContainer: {
            display: "flex",
            justifyContent: "center",
        },
    };

    return (
        <Dialog
            isVisible={true} // 항상 다이얼로그를 표시
            title={"Add signature"} //다이얼로그 제목
            body={
                <div style={styles.container}>
                    <div style={styles.sigContainer}>
                        <div style={styles.sigBlock}>
                            <SignatureCanvas
                                velocityFilterWeight={1}
                                ref={sigRef}
                                canvasProps={{
                                    width: 600,
                                    height: 200,
                                    className: "sigCanvas",
                                }}
                            />
                        </div>
                    </div>
                    <div style={styles.instructionsContainer}>
                        <div style={styles.instructions}>
                            <div>
                                Auto date/time{" "}
                                <input
                                    type={"checkbox"}
                                    checked={autoDate}
                                    onChange={(e) => setAutoDate(e.target.checked)}  //체크박스 변경시 호출되는 함수
                                />
                            </div>
                            <div>Draw your signature above</div>  {/*서명 켄버스에 서명 요청 */}
                        </div>
                    </div>

                    <ConfirmOrCancel
                        onCancel={onClose} //취소 버튼 클릭시 호출되는 함수
                        onConfirm={() => {
                            const sigURL = sigRef.current.toDataURL(); //서명을 데이터 url로 변환
                            onConfirm(sigURL); // 확인 버튼 클릭시 
                        }}
                    />
                </div>
            }
        />
    );
}