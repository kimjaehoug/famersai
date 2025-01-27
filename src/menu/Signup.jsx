import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../customAxios";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../AuthContext";

const StyledSignup = styled.div`
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

  .signup {
    width: 400px;
    padding: 40px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    color: #2c2c2c;
    font-size: 16px;
    line-height: 1.6;
    margin: 20px auto;

    h2 {
      font-size: 24px;
      color: #333;
      margin-bottom: 20px;
      font-weight: bold;
    }

    #signup {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;

      div {
        width: 100%;
        text-align: left;
      }

      div label {
        font-size: 15px;
        padding-left: 15px;
        margin-bottom: 5px;
      }

      input {
        width: 93%;
        height: 48px;
        padding: 0 10px;
        margin-bottom: 10px;
        border-radius: 12px;
        background-color: #f2f2f2;
        border: 1px solid #e0e0e0;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
        transition: border 0.3s;
        display: block;
        margin: 0 auto;

        &:focus {
          border: 1px solid #5882fa;
          outline: none;
        }

        &::placeholder {
          color: #b0b0b0;
        }
      }

      button {
        width: 93%;
        height: 48px;
        color: #fff;
        font-size: 16px;
        background-color: #7db249;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s;
        padding: 10px;
        border-radius: 12px;
        display: block;
        margin: 0 auto;

        &:hover {
          background-color: #d2ff7c;
        }

        &:active {
          background-color: #d2ff7c;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
        }
      }
    }

    .option {
      margin-top: 20px;

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
            color: #5882fa;
            transition: color 0.3s;

            &:hover {
              color: #819ff7;
            }
          }

          list-style: none;
        }
      }
    }

    .back-button {
      display: inline-block;
      font-size: 14px;
      color: #7db249;
      cursor: pointer;
      transition: color 0.3s;
      text-decoration: none;

      &:hover {
        color: #d2ff7c;
      }
    }
  }
`;

const Signup = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const signup = () => {
    if (emailRegex.test(email)) {
      if (password.length >= 8) {
        if (password === password2) {
          setError(null);
          customAxios
            .post("/users/signup", {
              email,
              password,
            })
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                toast("회원가입에 성공하였습니다.");
                customAxios
                  .post("/users/login", {
                    email,
                    password,
                  })
                  .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                      login(res.data);
                      navigate("/");
                    }
                  });
              }
            })
            .catch((err) => {
              console.log(err);
              setError(err.response.data.error);
            });
        } else {
          setError("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        }
      } else {
        setError("패스워드는 8자 이상이어야 합니다.");
      }
    } else {
      setError("이메일 형식이 맞지 않습니다.");
    }
  };

  return (
    <StyledSignup>
      <div className="signup">
        <h2>회원가입</h2>
        <form action="/signup" method="post" id="signup">
          <div>
            <label>이메일</label>
            <input
              name="email"
              type="email"
              placeholder="이메일"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>비밀번호</label>
            <input
              name="password"
              type="password"
              placeholder="비밀번호"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label>비밀번호 확인</label>
            <input
              name="password"
              type="password"
              placeholder="비밀번호 확인"
              required
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <button type="button" onClick={signup}>
            회원가입
          </button>
          <label className="back-button" onClick={() => navigate("/login")}>
            뒤로
          </label>
          <div style={{ color: "red", textAlign: "center" }}>{error}</div>
        </form>
      </div>
      <ToastContainer />
    </StyledSignup>
  );
};

export default Signup;
