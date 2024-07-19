import React from "react";
import styled from "styled-components";
import Background from "../../components/Background";
import Header from "../../components/Header";
import { useNavigate, useLocation } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCardClick = () => {
    navigate('/home');
  };

  return (
    <Background>
      <Header/>
      <StyledBody>
        <TextContainer>
          <Title>
            종이보다 빠르고 간편한
            전자서명 솔루션
          </Title>
          <Content>
            당신만의 서명을 간편하게 등록하여 서명이 필요한 문서에 손쉽고 빠르게 서명하세요. 
            하나의 문서로 여러 명이서 함께 서명할 수 있습니다.
          </Content>
          <StyledButton onClick={handleCardClick}>
            구글로 로그인하여 시작하기
          </StyledButton>
        </TextContainer>
        <ImageContainer>
          <img src="/person.png" alt="person" />
        </ImageContainer>
      </StyledBody>
    </Background>
  );
};

const StyledHeader = styled.header`
  background-color: white;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  color: white;
  border-bottom: 1px solid #ccc;
`;

const StyledBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
  text-align: left;
`;

const TextContainer = styled.div`
  flex: 1;
  padding-right: 20px;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 70%;
    height: auto;
  }
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
  white-space: pre-line; /* 줄바꿈을 반영 */
`;

const Content = styled.div`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
  white-space: pre-line; /* 줄바꿈을 반영 */
`;

const StyledButton = styled.button`
  background-color: #00A3FF; /* 하늘색 배경 */
  color: white; /* 흰색 글자 */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: grey; /* hover 시 색상 변경 */
  }
`;

export default LandingPage;
