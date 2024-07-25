// Modal.js
import React from 'react';
import { primary45 } from "../utils/colors";
import { useIsSmallScreen } from "../hooks/useIsSmallScreen";

/*
Modal.js 사용자의 정의 가능한 위치, 스타일 및 가시성을 갖춘 모달창을 표시하도록 설계
또한 useIsSmallScreen 후크를 사용해서 작은 화면 크기로 적용
*/

export function Modal({ onClose, children, isVisible, style, positionTop }) {
    const isSmallScreen = useIsSmallScreen();

    const styles = {
        container: {
            position: isSmallScreen ? 'fixed' : 'absolute',
            backgroundColor: '#FFF',
            border: `1px solid ${primary45}`,
            borderRadius: 4,
            top: positionTop ? positionTop : isSmallScreen ? 60 : 150,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '94%',
            fontFamily: 'Open Sans',
            zIndex: 10000,
            boxShadow: '0 0px 14px hsla(0, 0%, 0%, 0.2)',
        },
        background: {
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            backgroundColor: '#00000033',
            zIndex: 5000,
        },
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div>
            {/* 배경 오버레이 클릭하면 onClose 실행 */}
            <div style={styles.background} onClick={onClose} />
            <div style={{ ...styles.container, ...style }}>{children}</div>
        </div>
    );
}
