import styled from "styled-components";
import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom'; 
import { GoTriangleDown } from "react-icons/go";
import { BiSolidBell } from "react-icons/bi";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [view, setView] = useState(false);

  const handleLogoButtonClick = () => {
    navigate('/');
  };

  const handleLogoutButtonClick = () => {
    // 로그아웃
  };

  return (
    <HeaderContainer>
      <Logo onClick={handleLogoButtonClick}>
        <img src="/logo.png" alt="Logo" /> 
      </Logo>
      {location.pathname !== '/' && (
        <>
          <SearchBarContainer>
            <SearchBar>
              <SearchIcon />
              <SearchInput type="text" placeholder="파일 이름을 검색하세요" />
            </SearchBar>
          </SearchBarContainer>
          <HeaderIcons>
            <IconWrapper>
              <BiSolidBell size="23" />
            </IconWrapper>
            <MyPageBNT onClick={() => {setView(!view)}}>
              <IoPersonCircleSharp size="35" color="#D6D5D5"/>
              <GoTriangleDown size="20" />
            </MyPageBNT>
          </HeaderIcons>
        </>
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  background-color: white;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid #ccc;
`;

const Logo = styled.div`
  img {
    width: 248px; 
    height: auto;
  }
  cursor: pointer;
`;

const SearchBarContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 500px;
`;

const SearchIcon = styled(IoIosSearch)`
  position: absolute;
  left: 10px; /* 아이콘과 텍스트 간의 간격 */
  color: #ccc;
  font-size: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 10px 10px 40px; /* 아이콘 위치를 고려한 왼쪽 패딩 */
  border: 1px solid #ccc;
  border-radius: 10px;
`;

const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  margin-right: 25px;
  position: relative;
  color: gray;  // 여기서 기본 아이콘 색상 설정

  svg {
    transition: fill 0.3s ease;
  }

  &:hover {
    &::before {
      content: "";
      position: absolute;
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
      border-radius: 50%;
      background-color: rgba(102, 102, 102, 0.2);
    }

    svg {
      fill: black;
    }
  }
`;

const MyPageBNT = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: "#D6D5D5";  // 여기서 기본 아이콘 색상 설정

  svg {
    transition: fill 0.3s ease;
  }

  &:hover svg {
    fill: black;
  }
`;

export default Header;
