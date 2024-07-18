import React from "react";
import styled from "styled-components";
import Background from "../../components/Background";
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';
import Sidebar from "../../components/SideBar";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Background>
      <Header />
      <MainContent>
        <Sidebar></Sidebar>
        <MainArea>
          <FileList>
            <FileItem>
              <FileName>근로계약서.png</FileName>
              <FileDetails>
                <FileOwner>나</FileOwner>
                <FileDate>2025. 05. 11. 12:28</FileDate>
                <FileSize>224KB</FileSize>
              </FileDetails>
            </FileItem>
          </FileList>
        </MainArea>
      </MainContent>
    </Background>
  );
};

const MainContent = styled.div`
  display: flex;
  height: 100vh;
`;

const MainArea = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FileItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
`;

const FileName = styled.div`
  font-weight: bold;
`;

const FileDetails = styled.div`
  display: flex;
  gap: 10px;
  font-size: 14px;
  color: gray;
`;

const FileOwner = styled.div``;

const FileDate = styled.div``;

const FileSize = styled.div``;

export default HomePage;
