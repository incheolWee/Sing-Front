import React, { useState, useEffect } from 'react';

/* 코드 역할
브라우저 창의 크기를 가져오고 추정하는 방법 제공
*/

export function useWindowSize() {
    //클라이언트 환경 확인=> window 객체가 사용 가능한지 확인, 브라우저 환경에서 코드 실행되고 있는지 확인
    const isClient = typeof window === 'object';

    //크기 가져오기
    function getSize() {
        return {
            width: isClient ? window.innerWidth : undefined,
            height: isClient ? window.innerHeight : undefined,
        };
    }

    //상태 초기화
    const [windowSize, setWindowSize] = useState(getSize);

    //효과 후크
    // useEffect 구성요소가 마운트 될때 크기 조정 이벤트 리스너를 추가 구성 요소가 마운트 해제 될때 제거하는데 사용
    useEffect(() => {
        //클라이언트 환경 확인
        if (!isClient) {
            return false;
        }

        //창의 크기가 조정될때 마다 windowSize 상태를 새 창 크기로 업데이트 한다.
        function handleResize() {
            setWindowSize(getSize());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isClient]);

    //반환: 현재 창의 크기 
    return windowSize;
}
