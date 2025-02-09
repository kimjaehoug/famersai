import React from "react";
import styled from "styled-components";
import logo from "../img/logo.png";
import Menu from "./Menu";
import { useAuth } from "../AuthContext";

const HeaderWrapper = styled.div`
  width: 100%;
  height: 60px;
  padding: 15px 0 15px 0;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.MAIN};

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  .toggle {
    background: white;
    font-size: 20px;
    border-radius: 10px;
    margin-left: 3px;

    &:hover {
      cursor: pointer;
    }
  }
`;

const Logo = styled.img`
  padding: 0;
  margin-top: 10px;
  margin-left: 20px;
  height: auto;
  width: 220px;
`;

const Header = () => {
  const { isCompanyUser } = useAuth();

  return (
    <HeaderWrapper>
      <a href="/">
        <Logo src={logo} />
        <button className="toggle">
          {isCompanyUser() ? "기업" : "구직자"}
        </button>
      </a>
      <Menu />
    </HeaderWrapper>
  );
};

export default Header;
