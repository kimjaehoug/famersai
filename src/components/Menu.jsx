import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../AuthContext";

const MenuWrapper = styled.div`
  flex: 1;
  max-width: 800px;
  margin: 0px 10px 0px 10px;
  font-size: 20px;
  display: flex;
  flex-direction: row;
  ${"" /* color: #f54458; */}
  justify-content: space-around;
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

  .username {
    position: relative;
  }

  .dropdown {
    position: absolute;
    top: 20px;
    left: -20px;
    z-index: 1000;
    background-color: white;
    padding: 0 20px;

    a {
      height: 30px;
      font-size: 20px;
    }
  }
`;

const Menu = () => {
  const { user, logout, isCompanyUser } = useAuth();
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    console.log(user());
  }, []);

  return (
    <MenuWrapper>
      <a href="/board">
        <h5>{isCompanyUser() && "전체 "}채용 공고</h5>
      </a>
      {user() && isCompanyUser() ? (
        <a href="/board?mine=true">
          <h5>나의 채용 공고</h5>
        </a>
      ) : (
        <a href="/products">
          <h5>이력서 관리</h5>
        </a>
      )}

      <a href="/news">
        <h5>기업 뉴스</h5>
      </a>

      <a href="/bikemap">
        <h5>지역 특구 맵</h5>
      </a>

      {user() && isCompanyUser() ? (
        <a href="/about">
          <h5>인재 풀 탐색</h5>
        </a>
      ) : (
        <a href="/about">
          <h5>회사 탐색</h5>
        </a>
      )}
      {user() ? (
        <>
          <h5 className="username" onClick={() => setShowLogout(!showLogout)}>
            {user().name}님
            {showLogout && (
              <div className="dropdown">
                {isCompanyUser() ? (
                  <a href="/companyMyPage">
                    <h5 id="mypage">Company Page</h5>
                  </a>
                ) : (
                  <a href="/mypage">
                    <h5 id="mypage">My Page</h5>
                  </a>
                )}
                <a href="/login">
                  <h5 id="logout" onClick={logout}>
                    Logout
                  </h5>
                </a>
              </div>
            )}
          </h5>
        </>
      ) : (
        <a href="/login">
          <h5>로그인/회원가입</h5>
        </a>
      )}
    </MenuWrapper>
  );
};

export default Menu;
