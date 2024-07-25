import styled from "styled-components";
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUserCircle, FaPlus } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { LiaPenNibSolid } from "react-icons/lia";
import { TfiTrash } from "react-icons/tfi";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container>
      <ProfileSection>
       <FaUserCircle size="50" color="#D6D5D5" />
        <ProfileInfo>
          <Username>신지수 학부생님</Username>
          <Email>22100417@handong.ac.kr</Email>
        </ProfileInfo>
      </ProfileSection>
      <Divider />
      <NavButtons>
        <BlueButton
          onClick={() => navigate('/work')}
          selected={location.pathname === '/work'}
        >
          <FaPlus />
          새로 만들기
        </BlueButton>
        <Button
          onClick={() => navigate('/home')}
          selected={location.pathname === '/home'}
        >
          <IoHomeOutline />
          홈 피드
        </Button>
        <Button
          onClick={() => navigate('/sign')}
          selected={location.pathname === '/sign'}
        >
          <LiaPenNibSolid />
          내 서명 만들기
        </Button>
        <Button
          onClick={() => navigate('/trash')}
          selected={location.pathname === '/trash'}
        >
          <TfiTrash />
          휴지통
        </Button>
        <Button
          onClick={() => navigate('/test')}
          selected={location.pathname === '/test'}
        >
          <TfiTrash />
          테스트 페이지
        </Button>
        <Button
          onClick={() => navigate('/pdf')}
          selected={location.pathname === '/pdf'}
        >
          <TfiTrash />
          코드 분석후 테스트
        </Button>
      </NavButtons>
    </Container>
  );
};

const Container = styled.div`
  background-color: #f9fafa;
  width: 17%;
  height: 100vh;
  padding: 20px;
  border-right: 1px solid #ccc;
  display: flex;
  flex-direction: column;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #ccc;
  margin-bottom: 20px;
`;

const ProfileInfo = styled.div`
  margin-left: 10px;
`;

const Username = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Email = styled.div`
  font-size: 14px;
  color: gray;
`;

const NavButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const BlueButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 6px;
  border: none;
  background-color: #00A3FF;
  color: white;
  cursor: pointer;
  font-size: 16px;
  text-align: left;

  ${({ selected }) => selected && `
    
  `}

  &:hover {
    background-color: #9b9b9b;
  }

  & > svg {
    font-size: 20px;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 6px;
  border: none;
  background-color: ${({ selected }) => (selected ? '#E7E8E8' : 'transparent')};
  color: black;
  cursor: pointer;
  font-size: 16px;
  text-align: left;

  &:hover {
    background-color: #E7E8E8;
  }

  & > svg {
    font-size: 20px;
  }
`;

export default Sidebar;
