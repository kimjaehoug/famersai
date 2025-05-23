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
          border: 1px solid ${({ theme }) => theme.colors.SIDE};
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
        background-color: ${({ theme }) => theme.colors.MAIN};
        border: none;
        cursor: pointer;
        transition: background-color 0.3s;
        padding: 10px;
        border-radius: 12px;
        display: block;
        margin: 0 auto;

        &:hover {
          background-color: ${({ theme }) => theme.colors.SIDE};
        }

        &:active {
          background-color: ${({ theme }) => theme.colors.BACK};
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
      color: ${({ theme }) => theme.colors.MAIN};
      cursor: pointer;
      transition: color 0.3s;
      text-decoration: none;

      &:hover {
        color: ${({ theme }) => theme.colors.SIDE};
      }
    }

    .skillSet {
      display: flex;
      flex-direction: row;
      gap: 10px;
      width: 100%;
      flex-wrap: wrap;
      margin: 20px;
      .skill {
        height: 40px;
        width: auto !important;
      }
    }

    .introContainer {
      display: flex;
      flex-direction: column;
      .introduction {
        width: 93%;
        margin: auto;
        height: 200px;
        font-size: 14px;
        outline: none;
        border-radius: 12px;
        background-color: #f2f2f2;
        border: 1px solid #e0e0e0;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
        transition: border 0.3s;
        padding: 10px;

        &:focus {
          border: 1px solid ${({ theme }) => theme.colors.SIDE};
          outline: none;
        }

        &::placeholder {
          color: #b0b0b0;
        }
      }
    }
  }
`;

const Signup = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [dOfB, setDOfB] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [skillSet, setSkillSet] = useState([]);
  const [introduction, setIntroduction] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const dOfBRegex = /^\d{4}\/\d{2}\/\d{2}$/;
  const phoneNumberRegex = /^\d{3}-\d{4}-\d{4}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const signup = () => {
    if (id.length >= 5) {
      if (name.length >= 2) {
        if (dOfBRegex.test(dOfB)) {
          if (emailRegex.test(email)) {
            if (phoneNumberRegex.test(phoneNumber)) {
              if (password.length >= 8) {
                if (password === password2) {
                  setError(null);
                  customAxios
                    .post("/user/signup", {
                      id,
                      name,
                      dateOfBirth: dOfB,
                      phoneNumber,
                      introduction,
                      email,
                      password,
                    })
                    .then((res) => {
                      if (res.status === 200) {
                        toast("회원가입에 성공하였습니다.");
                        customAxios
                          .post("/user/login", {
                            id,
                            password,
                          })
                          .then((res) => {
                            if (res.status === 200) {
                              login(res.data);
                              navigate("/");
                            }
                          });
                      }
                    })
                    .catch((err) => {
                      setError(err.response.data.error);
                    });
                } else {
                  setError("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
                }
              } else {
                setError("패스워드는 8자 이상이어야 합니다.");
              }
            } else {
              setError("휴대폰 번호 형식이 올바르지 않습니다.");
            }
          } else {
            setError("이메일 형식이 올바르지 않습니다.");
          }
        } else {
          setError("생년월일 형식이 올바르지 않습니다.");
        }
      } else {
        setError("이름은 두 글자 이상이어야 합니다.");
      }
    } else {
      setError("아이디는 5자 이상이어야 합니다.");
    }
  };

  const handleSkillSetChange = (e) => {
    const value = e.target.value;
    setSkillSet((prev) =>
      prev.includes(value)
        ? prev.filter((skill) => skill !== value)
        : [...prev, value]
    );
  };

  return (
    <StyledSignup>
      <div className="signup">
        <h2>회원가입</h2>
        <div id="signup">
          <div>
            <label>아이디</label>
            <input
              name="id"
              type="text"
              placeholder="아이디"
              required
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div>
            <label>이름</label>
            <input
              name="name"
              type="text"
              placeholder="이름"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>생년월일</label>
            <input
              name="dateOfBirth"
              type="text"
              placeholder="OOOO/OO/OO"
              maxLength={10}
              required
              onKeyUp={(e) => {
                if ([4, 7].includes(e.target.value.length)) {
                  if (e.key === "Backspace") {
                    e.target.value = e.target.value.slice(0, -1);
                  } else {
                    e.target.value += "/";
                  }
                }
                setDOfB(e.target.value);
              }}
            />
          </div>
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
            <label>휴대폰 번호</label>
            <input
              name="phoneNumber"
              type="text"
              placeholder="OOO-OOOO-OOOO"
              maxLength={13}
              required
              onKeyUp={(e) => {
                if ([3, 8].includes(e.target.value.length)) {
                  if (e.key === "Backspace") {
                    e.target.value = e.target.value.slice(0, -1);
                  } else {
                    e.target.value += "-";
                  }
                }
                setPhoneNumber(e.target.value);
              }}
            />
          </div>
          <div className="introContainer">
            <label>간단 자기소개</label>
            <textarea
              className="introduction"
              placeholder="간단 자기소개"
              rows={5}
              onChange={(e) => setIntroduction(e.target.value)}
            />
          </div>
          <div>
            <label>비밀번호</label>
            <input
              name="password"
              type="password"
              placeholder="비밀번호"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label>비밀번호 확인</label>
            <input
              name="password2"
              type="password"
              placeholder="비밀번호 확인"
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
        </div>
      </div>
      <ToastContainer />
    </StyledSignup>
  );
};

export default Signup;