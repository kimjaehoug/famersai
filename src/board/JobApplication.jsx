import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { customAxios } from "../customAxios";
import { useAuth } from "../AuthContext";

const StyledJobApplication = styled.div`
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

const JobApplication = () => {
  const [searchParams] = useSearchParams();
  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState();
  const [skillSet, setSkillSet] = useState([]);
  const [id, setId] = useState();
  const [email, setEmail] = useState();
  const [dOfB, setDOfB] = useState();
  const [introduction, setIntroduction] = useState();
  const [aplliedJobs, setAppliedJobs] = useState([]);

  const [editName, setEditName] = useState();
  const [editSkillSet, setEditSkillSet] = useState([]);
  const [editId, setEditId] = useState();
  const [editEmail, setEditEmail] = useState();
  const [editDOfB, setEditDOfB] = useState();
  const [editIntro, setEditIntro] = useState();

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
      setIntroduction(data.introduction);
      setAppliedJobs(data.appliedJobs);
    });
  }, [editMode]);

  const handleEditStart = () => {
    setEditName(name);
    setEditSkillSet(skillSet);
    setEditId(id);
    setEditEmail(email);
    setEditDOfB(dOfB);
    setEditIntro(introduction);
    setEditMode(true);
  };

  const handleApply = () => {
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

  const handleEditIntroChange = (e) => {
    setEditIntro(e.target.value);
  };

  const handleBackToBoard = () => {
    navigate("/board");
  };

  const handleBackToPost = () => {
    navigate(`/post?id=${searchParams.get("id")}`);
  };

  const handleDeleteUser = () => {
    if (window.confirm("유저를 삭제하시겠습니까?")) {
      if (window.confirm("유저를 영구히 삭제합니다.")) {
        customAxios
          .delete(`/user/${user()._id}`)
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
    <StyledJobApplication>
      <div className="boardContainer">
        {editMode ? (
          <>
            <div className="editContainer">
              <h1>성명</h1>
              <input
                className="edit"
                defaultValue={name}
                onChange={handleEditNameChange}
              />
            </div>
            <div className="skillSets">
              {skillSet.map((skill, idx) => {
                return (
                  <button key={idx + 1} className="skill" value={skill}>
                    {skill}
                  </button>
                );
              })}
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
              <h1>생년월일</h1>
              <input
                className="edit"
                defaultValue={dOfB}
                onChange={handleEditDOfBChange}
              />
            </div>
            <h1>간단 자기소개</h1>
            <textarea
              className="editIntro"
              placeholder="간단 자기소개"
              rows={20}
              onChange={handleEditIntroChange}
            />
          </>
        ) : (
          <>
            <h1>{name}</h1>
            <h1>기술 스택</h1>
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
            <h1>ID: {id}</h1>
            <h1>Email: {email}</h1>
            <h1>Date of Birth: {dOfB}</h1>
            <h1>소개: {introduction}</h1>
          </>
        )}
        <div className="buttonContainer">
          <button onClick={handleApply}>지원하기</button>
          <button onClick={handleBackToPost}>뒤로가기</button>
        </div>
      </div>
    </StyledJobApplication>
  );
};

export default JobApplication;
