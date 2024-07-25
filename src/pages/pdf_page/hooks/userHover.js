import React, { useCallback, useRef, useState } from 'react';

/*
useHover.js 후크 요소 위에 마우스를 올려 놓았는지 추적하는 방법 제공
*/

export default function useHover() {
    // 상태 초기화 => 요소 위에 마우스 올리면 true
    const [value, setValue] = useState(false);
    //이벤트 핸들러 => 
    const handleMouseOver = useCallback(() => setValue(true), []); //마우스 위에 올릴때 true
    const handleMouseOut = useCallback(() => setValue(false), []); //마우스 떠날때 false로 
    //참조 초기화 = 추적 중인 DOM 요소에 대한 참조를 유지하기 위해 ref 초기화
    const ref = useRef();
    // 롤백 참조 
    /*
    이전 ref가 존재하는 경우 이벤트 리스너 제거
    새 노드를 ref에 할당
    새로운 ref에 이벤트 리스너 추가
    */
    const callbackRef = useCallback(
        (node) => {
            if (ref.current) {
                ref.current.removeEventListener('mouseenter', handleMouseOver);
                ref.current.removeEventListener('mouseleave', handleMouseOut);
            }

            ref.current = node;

            if (ref.current) {
                ref.current.addEventListener('mouseenter', handleMouseOver);
                ref.current.addEventListener('mouse;eave', handleMouseOut);

            }
        },

        [handleMouseOver, handleMouseOut],
    );
    //반환값 : Hover의 상태 를 나타내는 값
    return [callbackRef, value];
}