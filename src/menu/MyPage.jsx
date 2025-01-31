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
  }
`;

const MyPage = () => {
  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState();
  const [skillSet, setSkillSet] = useState([]);
  const [id, setId] = useState();
  const [email, setEmail] = useState();
  const [dOfB, setDOfB] = useState();
  const [aplliedJobs, setAppliedJobs] = useState([]);

  const [editName, setEditName] = useState();
  const [editSkillSet, setEditSkillSet] = useState([]);
  const [editId, setEditId] = useState();
  const [editEmail, setEditEmail] = useState();
  const [editDOfB, setEditDOfB] = useState();

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    customAxios.get(`user/${user()._id}`).then((res) => {
      console.log(res);
      const data = res.data;
      setName(data.name);
      setSkillSet(data.skillSet);
      setId(data.id);
      setEmail(data.email);
      setDOfB(data.dateOfBirth);
      setAppliedJobs(data.appliedJobs);
    });
  }, [editMode]);

  const handleEditStart = () => {
    setEditName(name);
    setEditSkillSet(skillSet);
    setEditId(id);
    setEditEmail(email);
    setEditDOfB(dOfB);
    setEditMode(true);
  };

  const handleEditFinish = () => {
    customAxios
      .put(`user/${user()._id}`, {
        name,
        skillSet,
        id,
        email,
        dateOfBirth: dOfB,
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

  const handleEditDOfBChange = (e) => {
    setEditDOfB(e.target.value);
  };

  const handleBackToBoard = () => {
    navigate("/board");
  };

  const handleDeleteUser = () => {
    customAxios
      .delete(`/user/${user()._id}`)
      .then((res) => {
        console.log(res);
        logout();
        handleBackToBoard();
      })
      .catch((err) => console.log(err));
  };

  const handleEditCancel = () => {
    setEditMode(false);
  };

  return (
    <StyledMyPage>
      <div className="boardContainer">
        {editMode ? (
          <>
            <input
              className="editName"
              defaultValue={name}
              onChange={handleEditNameChange}
            />
            <div className="skillSets">
              {skillSet.map((skill, idx) => {
                return (
                  <button
                    key={idx + 1}
                    className="skill"
                    value={skill}
                    disabled
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
            <input
              className="editId"
              defaultValue={id}
              onChange={handleEditIdChange}
            />

            <input
              className="editEmail"
              defaultValue={email}
              onChange={handleEditEmailChange}
            />

            <input
              className="editDOfB"
              defaultValue={dOfB}
              onChange={handleEditDOfBChange}
            />
          </>
        ) : (
          <>
            <h1>{name}님, 안녕하세요.</h1>
            <div className="skillSets">
              {skillSet.map((skill, idx) => {
                return (
                  <button
                    key={idx + 1}
                    className="skill"
                    value={skill}
                    disabled
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
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
              <button onClick={handleEditStart}>개인 정보 수정</button>
              <button onClick={handleDeleteUser}>유저 삭제</button>
            </>
          )}
        </div>
      </div>
    </StyledMyPage>
  );
};

export default MyPage;
