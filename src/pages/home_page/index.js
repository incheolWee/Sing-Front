import React from "react";
import styled from "styled-components";
import Background from "../../components/Background";
import { useNavigate } from 'react-router-dom';
import Body from "../../components/Body";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Background>
      <Body>
        <Title>
        홈
        </Title>
        <Navigation>
          <NavItem active>내 파일</NavItem>
          <NavItem>공유</NavItem>
        </Navigation>
        <MainArea>
          <FileListHeader>
            <HeaderItem>이름</HeaderItem>
            <HeaderItem>열어 본 날짜</HeaderItem>
            <HeaderItem>소유자</HeaderItem>
            <HeaderItem>크기</HeaderItem>
          </FileListHeader>
          <FileList>
            {Array.from({ length: 4 }).map((_, index) => (
              <FileItem key={index}>
                <FileIcon>📑</FileIcon>
                <FileName>근로계약서.pdf</FileName>
                <FileDetails>
                  <FileDate>2025. 05. 11. 12:28</FileDate>
                  <FileOwner>나</FileOwner>
                  <FileSize>224KB</FileSize>
                </FileDetails>
              </FileItem>
            ))}
          </FileList>
        </MainArea>
      </Body>
    </Background>
  );
};

const Title = styled.div`
  font-size: 28px;
  font-weight: 600;
  padding-bottom: 20px;
`;

const Navigation = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const NavItem = styled.div`
  font-size: 18px;
  cursor: pointer;
  color: ${props => (props.active ? "black" : "gray")};
  border-bottom: ${props => (props.active ? "2px solid black" : "none")};
  padding-bottom: 5px;
`;

const MainArea = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
`;

const FileListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
`;

const HeaderItem = styled.div`
  flex: 1;
  text-align: center;
`;

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

const FileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
`;

const FileIcon = styled.div`
  flex: 0 0 50px;
  font-size: 24px;
  text-align: center;
`;

const FileName = styled.div`
  flex: 2;
  font-weight: bold;
`;

const FileDetails = styled.div`
  flex: 3;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: gray;
`;

const FileOwner = styled.div``;

const FileDate = styled.div``;

const FileSize = styled.div``;

export default HomePage;
