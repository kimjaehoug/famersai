import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../customAxios";
import { useAuth } from "../AuthContext";

const StyledLogin = styled.div`
  @import url("https://cdn.jsdelivr.net/font-iropke-batang/1.2/font-iropke-batang.css");

  @font-face {
    font-family: "GmarketSansMedium";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
    font-family: "GmarketSansMedium", sans-serif;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f4f7fc;
  }

  .login {
    width: 400px;
    padding: 40px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    font-size: 16px;
    line-height: 1.6;
    margin: 20px auto;

    h2 {
      font-size: 24px;
      color: #333;
      margin-bottom: 20px;
      font-weight: bold;
    }

    #login {
      display: flex;
      flex-direction: column;

      input {
        width: 93%;
        height: 48px;
        padding: 0 10px;
        margin-bottom: 20px;
        border-radius: 12px;
        background-color: #f2f2f2;
        border: 1px solid #e0e0e0;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
        transition: border 0.3s;

        &:focus {
          border: 1px solid ${({ theme }) => theme.colors.SIDE};
          outline: none;
        }

        &::placeholder {
          color: #b0b0b0;
        }

        &[type="button"] {
          color: #fff;
          font-size: 16px;
          background-color: ${({ theme }) => theme.colors.MAIN};
          border: none;
          cursor: pointer;
          transition: background-color 0.3s;
          padding: 10px;

          &:hover {
            background-color: ${({ theme }) => theme.colors.SIDE};
          }

          &:active {
            background-color: ${({ theme }) => theme.colors.BACK};
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
          }
        }
      }
    }

    .option {
      margin-top: 5px;

      ul {
        padding: 0;
        margin: 0;
        display: inline-flex;
        justify-content: center;

        li {
          margin: 0 10px;

          a {
            font-size: 14px;
            text-decoration: none;
            color: ${({ theme }) => theme.colors.MAIN};
            transition: color 0.3s;

            &:hover {
              color: ${({ theme }) => theme.colors.SIDE};
            }
          }

          list-style: none;
        }
      }
    }

    .radio {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin: auto;
      width: 90%;
      label {
        display: flex;
        align-items: center;
        width: 50%;
        input {
          max-width: 15px;
          box-shadow: none !important;
          margin: 0 !important;
        }
        p {
          margin: 10px;
        }
      }
    }
  }
`;

const Login = () => {
  const [id, setId] = useState();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isCompanyUser, setIsCompanyUser] = useState(false);

  const handleLogin = () => {
    if (id.length < 5) {
      if (password.length >= 8) {
        setError(null);
        const route = isCompanyUser ? "/company" : "/user";
        customAxios
          .post(`${route}/login`, {
            id,
            password,
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              login(res.data, isCompanyUser);
              navigate("/");
            }
          })
          .catch((err) => {
            setError("유저를 찾을 수 없습니다.");
            console.log(err);
          });
      } else {
        setError("패스워드는 8자 이상이어야 합니다.");
      }
    } else {
      setError("아이디는 5자 이상이어야 합니다.");
    }
  };

  return (
    <StyledLogin>
      <div className="login">
        <h2>로그인</h2>
        <form id="login" action="/login" method="post">
          <form className="radio">
            <label>
              <input
                name="radio"
                type="radio"
                value="일반 회원"
                defaultChecked={true}
                onChange={() => setIsCompanyUser(false)}
              />
              <p>일반 회원</p>
            </label>
            <label>
              <input
                name="radio"
                type="radio"
                value="기업 회원"
                onChange={() => setIsCompanyUser(true)}
              />
              <p>기업 회원</p>
            </label>
          </form>
          <div>
            <input
              id="id"
              name="id"
              type="id"
              placeholder="아이디"
              required
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input type="button" value="로그인" onClick={handleLogin} />
          </div>
          <div className="option">
            <ul>
              <li>
                <a onClick={() => navigate("/signup")}>회원가입</a>
              </li>
            </ul>
          </div>
          <div style={{ color: "red", textAlign: "center" }}>{error}</div>
        </form>
      </div>
    </StyledLogin>
  );
};

export default Login;
