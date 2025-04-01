import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../AuthContext";

const MenuWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center; /* 오타 수정: aling-items -> align-items */
  a {
    text-decoration: none;
  }

  a:link,
  a:visited {
    color: inherit;
  }

  a:hover {
    color: gray;
  }

  h5:hover {
    cursor: pointer;
  }

  .menu {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-grow: 1;
    flex: 1;
    margin: 15px 10px 0px 10px;
    max-width: 800px;
    font-size: 20px;
    flex-direction: row;

    .username {
      position: relative;
    }

    .infoDropdown {
      position: absolute;
      top: 40px;
      left: -30px;
      z-index: 1000;
      background-color: white;
      padding: 0 20px;
      width: 70px;
      border: 1px solid black;
      border-radius: 10px;

      a {
        height: 50px;
        font-size: 20px;
      }
    }
  }

  .menuDropdown {
    width: 50px;
    height: 50px;
    background-color: ${({ theme }) => theme.colors.MAIN};
    font-size: 50px;
    margin-right: 25px;
    padding: 0;
    color: white;
    position: relative;
    border-radius: 10px;

    p {
      margin-top: -10px;
    }

    &:hover {
      cursor: pointer;
    }
  }

  .dropdown {
    position: absolute;
    top: 50px;
    color: black;
    font-size: 25px;
    right: 0;
    background-color: white;
    border: 1px solid black;
    border-radius: 10px;
    width: 160px;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media screen and (min-width: 900px) {
    .menuDropdown {
      display: none;
    }
  }

  @media screen and (max-width: 899px) {
    .menu {
      display: none;
    }
  }
`;

const StyledButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center; /* 오타 수정: justigy-content -> justify-content */
  background-color: ${({ theme }) => theme.colors.MAIN};
  color: white !important;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  height: 50px;
  padding: 0px 20px;
  border-radius: 25px;
  text-decoration: none;
  transition: background-color 0.3s ease;
`;

const Menu = () => {
  const { user, logout } = useAuth(); // isCompanyUser, setCompanyUser 제거
  const [showLogout, setShowLogout] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // 초기값 false로 수정

  useEffect(() => {
    setShowDropdown(false);
  }, [window.location.protocol + "//" + window.location.host]);

  return (
    <MenuWrapper>
      <div className="menu">
        <a href="/">
          <h5>홈</h5>
        </a>
        <a href="/myfarm">
          <h5>내 농장</h5>
        </a>
        <a href="/board">
          <h5>커뮤니티</h5>
        </a>
        <a href="/market">
          <h5>시장 정보</h5>
        </a>
        {user() ? (
          <h5 className="username" onClick={() => setShowLogout(!showLogout)}>
            {user().name}님
            {showLogout && (
              <div className="infoDropdown">
                <a href="/mypage">
                  <h5 id="mypage">My Page</h5>
                </a>
                <a href="/login">
                  <h5 id="logout" onClick={logout}>
                    Logout
                  </h5>
                </a>
              </div>
            )}
          </h5>
        ) : (
          <StyledButton href="/login">JOIN US</StyledButton>
        )}
      </div>
      <button
        className="menuDropdown"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p>☰</p>
        {showDropdown && (
          <div className="dropdown">
            <a href="/">
              <h5>홈</h5>
            </a>
            <a href="/myfarm">
              <h5>내 농장</h5>
            </a>
            <a href="/board">
              <h5>커뮤니티</h5>
            </a>
            <a href="/market">
              <h5>시장 정보</h5>
            </a>
            {user() ? (
              <>
                <a href="/mypage">
                  <h5 id="mypage">My Page</h5>
                </a>
                <a href="/login">
                  <h5 id="logout" onClick={logout}>
                    Logout
                  </h5>
                </a>
              </>
            ) : (
              <a href="/login">
                <h5>로그인/회원가입</h5>
              </a>
            )}
          </div>
        )}
      </button>
    </MenuWrapper>
  );
};

export default Menu;