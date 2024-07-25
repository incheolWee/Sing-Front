// Dialog.js
import React from 'react';
import { primary45 } from '../utils/colors';
import { FaTimes } from 'react-icons/fa';
import { Modal } from './Modal';

/*
사용자 정의 가능한 제목, 본문 및 스타일이 포함된 모달 대화상자 설계
*/

export function Dialog({
    isVisible, // 대화상자의 가시성 제어
    body, //대화상자 본문에 표시할 내용
    onClose, //닫힐대 호출할 함수
    title, // 대화 상자의 제목
    noPadding, // 본문 페딩 제어
    backgroundColor,//본문 배경색
    positionTop,// 상단 위치
    style,//스타일
}) {
    if (!isVisible) { //isVisible false면 랜더링 되지 않는다.
        return null;
    }

    const styles = {
        header: {
            backgroundColor: primary45,
            color: '#FFF',
            padding: 8,
            fontSize: 14,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        body: {
            padding: noPadding ? 0 : 14,
            backgroundColor: backgroundColor ? backgroundColor : '#FFF',
        },
        xIcon: {
            cursor: 'pointer',
        },
    };

    return (
        <Modal onClose={onClose} isVisible={isVisible} positionTop={positionTop} style={style}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <div>{title}</div>
                    <FaTimes
                        color={'#FFF'}
                        size={16}
                        style={styles.xIcon}
                        className={'dialogClose'}
                        onClick={onClose}
                    />
                </div>
                <div style={styles.body}>{body}</div>
            </div>
        </Modal>
    );
}