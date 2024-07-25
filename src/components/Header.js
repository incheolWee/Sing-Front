import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom'; 
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { BiSolidBell } from "react-icons/bi";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [view, setView] = useState(false);

  const handleLogoButtonClick = () => {
    navigate('/');
  };

  const handleLogoutButtonClick = () => {
    // Add logout functionality here
  };

  const handleProfileClick = () => {
    setView(!view);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.profile-dropdown') && view) {
      setView(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [view]);

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
              <BiSolidBell size="2" color="#D6D5D5" />
            </IconWrapper>
            <ProfileWrapper>
              <MyPageBNT onClick={handleProfileClick} className="profile-dropdown">
                <IoPersonCircleSharp size="35" color="#D6D5D5" />
                {view ? <GoTriangleUp size="20" color="#D6D5D5" /> : <GoTriangleDown size="20" color="#D6D5D5" />}
              </MyPageBNT>
              {view && (
                <DropdownMenu className="profile-dropdown">
                  <DropdownItem onClick={handleLogoutButtonClick}>
                    <FiLogOut />
                    </DropdownItem>
                </DropdownMenu>
              )}
            </ProfileWrapper>
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
      background-color: "#848484";
    }

    svg {
      fill: gray;
    }
  }
`;

const ProfileWrapper = styled.div`
  position: relative;
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
    fill: gray;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export default Header;
