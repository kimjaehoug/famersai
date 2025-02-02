import React from "react";
import styled from "styled-components";
import logo from "../img/logo.png";
import Menu from "./Menu";

const HeaderWrapper = styled.div`
  width: 100%;
  height: 60px;
  padding: 15px 0 15px 0;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.MAIN};
`;

const Logo = styled.img`
  padding: 0;
  margin-top: 10px;
  margin-left: 20px;
  height: auto;
  width: 200px;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <a href="/">
        <Logo src={logo} />
      </a>
      <Menu />
    </HeaderWrapper>
  );
};

export default Header;
