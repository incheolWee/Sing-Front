import styled from 'styled-components';

const Body = styled.div`
 display: flex; // Flex 컨테이너로 설정
  justify-content: center; // 가로 중앙 정렬
  align-items: center; // 세로 중앙 정렬
  overflow-y: auto;
  position: fixed;
  height: 100vh;
  top: 10;
  left: 0;
  // padding: 0 200px;
  width: 75vw;
  height: 100vh;
  flex: 1;
  background-color: white;
  background-attachment: fixed;
  z-index: -1;

`;

export default Body;