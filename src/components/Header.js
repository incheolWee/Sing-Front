import styled from "styled-components";
import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom'; 
import { GoTriangleDown } from "react-icons/go";
import { FaUserCircle, FaBell } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [view, setView] = useState(false);

  const handleLogoButtonClick = () => {
    navigate('/');
  };

  const handleWriteButtonClick = () => {
    navigate('/write');
  };

  const handleMyPageButtonClick = () => {
    navigate('/mypage');
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
          <SearchBar>
            <input type="text" placeholder="파일 이름을 검색하세요" />
          </SearchBar>
          <HeaderIcons>
            <IconWrapper>
              <FaBell size="23" color="gray" />
            </IconWrapper>
            <MyPageBNT onClick={() => {setView(!view)}}>
              <FaUserCircle size="40" color="gray" />
              <GoTriangleDown size="20" color="#ECECEC" />
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

const SearchBar = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 0 20px;

  input {
    width: 100%;
    max-width: 500px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
`;

const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  margin-right: 25px;
  position: relative;

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
`;

export default Header;
