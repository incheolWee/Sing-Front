import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Background from "../../components/Background";
import Body from "../../components/Body";
import { HiDotsVertical } from "react-icons/hi";
import { FaRegCheckSquare } from "react-icons/fa";
import axios from 'axios';

const HomePage = () => {
  const PdfLogo = '/pdf-logo.png';
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [pdfFiles, setPdfFiles] = useState([]);

  const toggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/PDF")
      .then(response => {
        setPdfFiles(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the PDF files!", error);
      });
  }, []);

  return (
    <Background>
      <Body>
        <Title>홈</Title>
        <Navigation>
          <NavItem active>내 파일</NavItem>
          <NavItem>공유</NavItem>
          <ChoiceButton onClick={toggleCheckboxes}>
            <FaRegCheckSquare />
            <span>편집</span>
          </ChoiceButton>
        </Navigation>
        <MainArea>
          <FileListHeader>
            <HeaderItem style={{ flex: 6 }}>이름</HeaderItem>
            <HeaderItem style={{ flex: 0.8 }}>소유자</HeaderItem>
            <HeaderItem style={{ flex: 1.14 }}>열어 본 날짜</HeaderItem>
            <HeaderItem style={{ flex: 0.7 }}>크기</HeaderItem>
            <HeaderItem style={{ flex: 0.2 }}></HeaderItem>
          </FileListHeader>
          <FileList>
            {pdfFiles.map(file => (
              <FileItem key={file.id}>
                {showCheckboxes && <Checkbox type="checkbox" />}

                <FileName>
                  <PdfImage src={PdfLogo} alt='pdf' />
                  <a href={file.url} target="_blank" rel="noopener noreferrer">
                    {file.name}
                  </a>
                </FileName>
                <FileOwner>{file.owner}</FileOwner>
                <FileDate>{file.date}</FileDate>
                <FileSize>{file.size}</FileSize>
                <MenuIconWrapper>
                  <HiDotsVertical color="#b0b0b0" />
                </MenuIconWrapper>
              </FileItem>
            ))}
          </FileList>
        </MainArea>
      </Body>
    </Background>
  );
};

const ChoiceButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 18px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  color: black;
  margin-left: auto; /* 자동으로 오른쪽으로 이동 */
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 700;
  padding-bottom: 50px;
`;

const Navigation = styled.div`
  display: flex;
  align-items: center;
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
  padding: 10px 0;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
`;

const HeaderItem = styled.div`
  flex: 1;
  text-align: left;
`;

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center; /* Center items vertically */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const FileName = styled.div`
  flex: 6;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px; /* Adjust gap between image and text */
`;

const PdfImage = styled.img`
  width: 20px; /* Adjust width as needed */
  height: 26px; /* Adjust height as needed */
  padding: 1px; /* Adjust padding as needed */
`;

const FileOwner = styled.div`
  flex: 0.6;
  color: gray;
  text-align: left;
`;

const FileDate = styled.div`
  flex: 1.2;
  color: gray;
  text-align: left;
`;

const FileSize = styled.div`
  flex: 0.68;
  color: gray;
  text-align: left;
`;

const MenuIconWrapper = styled.div`
  flex: 0.2;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
`;

export default HomePage;
