import { useWindowSize } from './useWindowSize'; // 올바른 경로로 import

// useWindowSize 훅을 활용해서 600 픽셀 미만인지 확인하는 훅
export function useIsSmallScreen() {
    const windowSize = useWindowSize();
    return windowSize.width < 600;
}