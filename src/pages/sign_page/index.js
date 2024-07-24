import React, { useRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import styled from 'styled-components';
import { LuEraser } from "react-icons/lu";
import { RxBorderWidth } from "react-icons/rx";
import { GrPowerReset } from "react-icons/gr";
import { FiPlus } from "react-icons/fi";
import Background from '../../components/Background';

const Container = styled.div`
  display: flex;
  padding: 20px;
  background-color: #fff;
`;

const MainArea = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  background-color: #fafafa;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const SubHeader = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`;

const SignatureContainer = styled.div`
  position: relative;
  width: 700px;
  height: 350px;
  border-radius: 16px;
  background-color: #f5efe4;
  margin-bottom: 20px;
`;

const StyledSignatureCanvas = styled(SignatureCanvas)`
  width: 100%;
  height: 100%;
  border-radius: 16px;
`;

const ToolContainer = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ToolButton = styled.button`
  display: flex;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background-color: ${({ isActive }) => (isActive ? '#ffffff' : 'transparent')};
  color: black;
  cursor: pointer;
  &:hover {
    color: #666;
  }
  svg {
    font-size: 24px;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 50px;
  right: 10px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const CircleIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const BlueButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 20px;
  border: 1px solid #00A3FF;
  border-radius: 5px;
  background-color: #00A3FF;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #008ddf;
  }
  svg {
    font-size: 20px;
  }
`;

const WhiteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 20px;
  border: 1px solid #00A3FF;
  border-radius: 5px;
  background-color: #ffffff;
  color: #00A3FF;
  cursor: pointer;
  &:hover {
    background-color: #e7f6ff;
  }
  svg {
    font-size: 20px;
  }
`;

const SideArea = styled.div`
  width: 200px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SignatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SignatureItem = styled.div`
  width: 100%;
  height: 60px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
  }
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const SignPage = () => {
  const sigCanvas = useRef({});
  const [savedSignatures, setSavedSignatures] = useState([]);
  const [penColor, setPenColor] = useState('black');
  const [penWidth, setPenWidth] = useState(2);
  const [isEraser, setIsEraser] = useState(false);
  const [showWidthDropdown, setShowWidthDropdown] = useState(false);
  const [showColorDropdown, setShowColorDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest('.dropdown') &&
        !event.target.closest('.tool-button')
      ) {
        setShowWidthDropdown(false);
        setShowColorDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (sigCanvas.current) {
      sigCanvas.current.penColor = isEraser ? 'white' : penColor;
      sigCanvas.current.penWidth = isEraser ? 10 : penWidth;
    }
  }, [penColor, penWidth, isEraser]);

  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  const saveSignature = () => {
    const signature = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    setSavedSignatures([...savedSignatures, signature]);
    const link = document.createElement('a');
    link.href = signature;
    link.download = 'signature.png';
    link.click();
    sigCanvas.current.clear();
  };

  const toggleEraser = () => {
    setIsEraser(!isEraser);
  };

  const changePenColor = (color) => {
    setPenColor(color);
    setShowColorDropdown(false);
  };

  const changePenWidth = (width) => {
    setPenWidth(width);
    setShowWidthDropdown(false);
  };

  const toggleWidthDropdown = () => {
    setShowWidthDropdown(!showWidthDropdown);
    if (showColorDropdown) {
      setShowColorDropdown(false);
    }
  };

  const toggleColorDropdown = () => {
    setShowColorDropdown(!showColorDropdown);
    if (showWidthDropdown) {
      setShowWidthDropdown(false);
    }
  };

  return (
    <Background>
    <Container>
      <MainArea>
        <Header>내 서명 만들기</Header>
        <SubHeader>나만의 서명을 만들어 등록하고 빠르고 간편하게 문서에 사인을 하세요.</SubHeader>
        <SignatureContainer>
          <StyledSignatureCanvas
            ref={sigCanvas}
            penColor={penColor}
            
            canvasProps={{ width: 700, height: 350, className: 'sigCanvas' }}
          />
          <ToolContainer>
            <ToolButton
              isActive={isEraser}
              onClick={toggleEraser}
              className="tool-button"
            >
              <LuEraser />
            </ToolButton>
            <ToolButton
              onClick={toggleWidthDropdown}
              className="tool-button"
            >
              <RxBorderWidth />
            </ToolButton>
            {showWidthDropdown && (
              <Dropdown className="dropdown">
                <DropdownItem onClick={() => changePenWidth(2)}>얇게</DropdownItem>
                <DropdownItem onClick={() => changePenWidth(5)}>중간</DropdownItem>
                <DropdownItem onClick={() => changePenWidth(10)}>두껍게</DropdownItem>
              </Dropdown>
            )}
            <ToolButton
              onClick={toggleColorDropdown}
              className="tool-button"
            >
              <CircleIcon color={penColor} />
            </ToolButton>
            {showColorDropdown && (
              <Dropdown className="dropdown">
                <DropdownItem onClick={() => changePenColor('black')}>
                  <CircleIcon color="black" />
                </DropdownItem>
                <DropdownItem onClick={() => changePenColor('blue')}>
                  <CircleIcon color="blue" />
                </DropdownItem>
                <DropdownItem onClick={() => changePenColor('red')}>
                  <CircleIcon color="red" />
                </DropdownItem>
              </Dropdown>
            )}
          </ToolContainer>
        </SignatureContainer>
        <ButtonContainer>
          <WhiteButton onClick={clearSignature}>
            <GrPowerReset />
            다시 서명하기
          </WhiteButton>
          <BlueButton onClick={saveSignature}>
            <FiPlus />
            서명 등록하기
          </BlueButton>
        </ButtonContainer>
      </MainArea>
      <SideArea>
        <SignatureList>
          {savedSignatures.map((signature, index) => (
            <SignatureItem key={index}>
              <img src={signature} alt={`signature-${index}`} />
            </SignatureItem>
          ))}
        </SignatureList>
      </SideArea>
    </Container>
    </Background>
  );
};

export default SignPage;
