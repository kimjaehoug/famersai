import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../customAxios";
import { useAuth } from "../AuthContext";

const StyledMyPage = styled.div`
  .boardContainer {
    border: 1px solid #e0e0e0;
    margin: 20px auto;
    padding: 25px;
    max-width: 900px;
    background: #ffffff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    color: #2c2c2c;
    font-size: 16px;
    line-height: 1.6;

    .editTitle {
      font-size: 24px;
      font-weight: bold;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 10px;
      margin-top: 10px;
      margin-left: 20px;
      width: 93%;
      margin-bottom: 20px;
      outline: none;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .editContent {
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 10px;
      margin-left: 20px;
      width: 93%;
      height: 200px;
      resize: vertical;
      font-size: 14px;
      margin-bottom: 20px;
      outline: none;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    h1 {
      font-size: 27px;
      font-weight: bold;
      color: #2c2c2c;
      margin-left: 30px;
    }

    p {
      margin: 0 30px;
      color: #6e6e6e;
    }

    #content {
      margin: 30px;
    }

    .buttonContainer {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin-bottom: 20px;
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${({ theme }) => theme.colors.MAIN};
      color: white;
      border: none;
      border-radius: 12px;
      padding: 8px 15px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    button:hover {
      background-color: ${({ theme }) => theme.colors.SIDE};
    }

    button:active {
      background-color: ${({ theme }) => theme.colors.BACK};
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset;
    }

    .listButton {
      background-color: white;
      color: ${({ theme }) => theme.colors.MAIN};
      border: 2px solid ${({ theme }) => theme.colors.MAIN};
    }

    .listButton:hover {
      background-color: white;
      color: ${({ theme }) => theme.colors.SIDE};
      border: 2px solid ${({ theme }) => theme.colors.SIDE};
    }

    .listButton:active {
      background-color: ${({ theme }) => theme.colors.MAIN};
      color: ${({ theme }) => theme.colors.BACK};
      border: 2px solid ${({ theme }) => theme.colors.BACK};
    }

    .skillSets {
      display: flex;
      flex-direction: row;
      gap: 10px;
      width: 100%;
      flex-wrap: wrap;
      margin: 0 20px 20px 20px;
      button {
        height: 40px;
      }
    }

    .editContainer {
      display: flex;
      align-items: center;
      h1 {
        min-width: 100px;
      }
    }

    .edit {
      font-size: 24px;
      font-weight: bold;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 10px;
      margin-top: 10px;
      margin-left: 20px;
      width: 93%;
      margin-bottom: 20px;
      outline: none;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .editIntro {
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 10px;
      margin-left: 20px;
      width: 93%;
      height: 200px;
      resize: vertical;
      font-size: 14px;
      margin-bottom: 20px;
      outline: none;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    }
  }
`;

const CompanyMyPage = () => {
  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState();
  const [id, setId] = useState();
  const [email, setEmail] = useState();
  const [dOfF, setDOfF] = useState();
  const [introduction, setIntroduction] = useState();

  const [editName, setEditName] = useState();
  const [editId, setEditId] = useState();
  const [editEmail, setEditEmail] = useState();
  const [editDOfF, setEditDOfF] = useState();
  const [editIntro, setEditIntro] = useState();

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    customAxios.get(`company/${user()._id}`).then((res) => {
      console.log(res);
      const data = res.data;
      setName(data.name);
      setId(data.id);
      setEmail(data.email);
      setDOfF(data.dateOfFoundation);
      setIntroduction(data.introduction);
    });
  }, [editMode]);

  const handleEditStart = () => {
    setEditName(name);
    setEditId(id);
    setEditEmail(email);
    setEditDOfF(dOfF);
    setEditIntro(introduction);
    setEditMode(true);
  };

  const handleEditFinish = () => {
    customAxios
      .put(`company/${user()._id}`, {
        name: editName,
        id: editId,
        email: editEmail,
        dateOfFoundation: editDOfF,
        introduction: editIntro,
      })
      .then((res) => {
        console.log(res);
        setEditMode(false);
      })
      .catch((err) => console.log(err));
  };

  const handleEditNameChange = (e) => {
    setEditName(e.target.value);
  };

  const handleEditIdChange = (e) => {
    setEditId(e.target.value);
  };

  const handleEditEmailChange = (e) => {
    setEditEmail(e.target.value);
  };

  const handleEditDOfFChange = (e) => {
    setEditDOfF(e.target.value);
  };

  const handleEditIntroChange = (e) => {
    setEditIntro(e.target.value);
  };

  const handleBackToBoard = () => {
    navigate("/board");
  };

  const handleDeleteCompany = () => {
    if (window.confirm("기업 유저를 삭제하시겠습니까?")) {
      if (window.confirm("기업 유저를 영구히 삭제합니다.")) {
        customAxios
          .delete(`/company/${user()._id}`)
          .then((res) => {
            console.log(res);
            logout();
            handleBackToBoard();
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const handleEditCancel = () => {
    setEditMode(false);
  };

  return (
    <StyledMyPage>
      <div className="boardContainer">
        {editMode ? (
          <>
            <div className="editContainer">
              <h1>회사명</h1>
              <input
                className="edit"
                defaultValue={name}
                onChange={handleEditNameChange}
              />
            </div>
            <div className="editContainer">
              <h1>아이디</h1>
              <input
                className="edit"
                defaultValue={id}
                onChange={handleEditIdChange}
              />
            </div>

            <div className="editContainer">
              <h1>이메일</h1>
              <input
                className="edit"
                defaultValue={email}
                onChange={handleEditEmailChange}
              />
            </div>

            <div className="editContainer">
              <h1>창립일</h1>
              <input
                className="edit"
                defaultValue={dOfF}
                onChange={handleEditDOfFChange}
              />
            </div>
            <h1>간단 회사 소개</h1>
            <textarea
              className="editIntro"
              defaultValue={introduction}
              rows={20}
              onChange={handleEditIntroChange}
            />
          </>
        ) : (
          <>
            <h1>{name}</h1>
            <h1>ID: {id}</h1>
            <h1>Email: {email}</h1>
            <h1>Date of Foundation: {dOfF}</h1>
            <h1>회사 소개: {introduction}</h1>
          </>
        )}
        <div className="buttonContainer">
          {editMode ? (
            <>
              <button onClick={handleEditFinish}>수정 완료</button>
              <button onClick={handleEditCancel}>취소</button>
            </>
          ) : (
            <>
              <button onClick={handleEditStart}>기업 정보 수정</button>
              <button onClick={handleDeleteCompany}>기업 유저 삭제</button>
            </>
          )}
        </div>
      </div>
    </StyledMyPage>
  );
};

export default CompanyMyPage;
