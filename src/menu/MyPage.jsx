import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../customAxios";
import { useAuth } from "../AuthContext";
import { skillSetList } from "../data";
import Degree from "../components/Degree";
import ForeignLanguage from "../components/ForeignLanguage";
import EditDegree from "../components/EditDegree";
import EditForeignLanguage from "../components/EditForeignLanguage";
import DegreeModel from "../objects/DegreeModel";
import ForeignLanguageModel from "../objects/ForeignLanguageModel";

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
      margin-bottom: 0;
      margin-top: 20px;
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
      margin: 10px 20px 20px 30px;
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

    .forms {
      width: 100%;
      margin-left: 20px;
      button {
        margin: 20px auto;
        width: 80px;
      }
    }
  }
`;

const MyPage = () => {
  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState();
  const [skillSet, setSkillSet] = useState([]);
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [degrees, setDegrees] = useState([]);
  const [foreignLanguages, setForeignLanguages] = useState([]);
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
  const [editAddress, setEditAddress] = useState();
  const [editPhoneNumber, setEditPhoneNumber] = useState();
  const [editDegrees, setEditDegrees] = useState([]);
  const [editForeignLanguages, setEditForeignLanguages] = useState([]);

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    customAxios.get(`user/${user()._id}`).then((res) => {
      console.log(res);
      const data = res.data;
      setName(data.name);
      setSkillSet(data.skillSet);
      setAddress(data.address);
      setPhoneNumber(data.phoneNumber);
      setDegrees(data.degrees);
      setForeignLanguages(data.foreignLanguages);
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
    setEditAddress(address);
    setEditPhoneNumber(phoneNumber);
    setEditDegrees(degrees);
    setEditForeignLanguages(foreignLanguages);
    setEditMode(true);
  };

  const handleEditFinish = () => {
    console.log(editDegrees);
    customAxios
      .put(`user/${user()._id}`, {
        name: editName,
        skillSet: editSkillSet,
        id: editId,
        email: editEmail,
        dateOfBirth: editDOfB,
        introduction: editIntro,
        address: editAddress,
        phoneNumber: editPhoneNumber,
        degrees: editDegrees.map((el) => {
          delete el._id;
          return el;
        }),
        foreignLanguages: editForeignLanguages.map((el) => {
          delete el._id;
          return el;
        }),
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

  const handleEditSkillSetChange = (e) => {
    if (editSkillSet.includes(e.target.value)) {
      const newSkillSet = editSkillSet.filter((set) => set !== e.target.value);
      setEditSkillSet(newSkillSet);
    } else {
      setEditSkillSet([...editSkillSet, e.target.value]);
    }
    console.log(editSkillSet);
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

  const handleEditAddressChange = (e) => {
    setEditAddress(e.target.value);
  };

  const handleEditPhoneNumberChange = (e) => {
    setEditPhoneNumber(e.target.value);
  };

  const updateEditDegree = (id, newDegree) => {
    const degree = editDegrees.find((degree) => degree._id === id);
    const idx = editDegrees.indexOf(degree);
    const tmp = [...editDegrees];
    tmp.splice(idx, 1, newDegree);
    setEditDegrees(tmp);
    console.log(editDegrees);
  };

  const removeEditDegree = (id) => {
    setEditDegrees(editDegrees.filter((degree) => degree._id !== id));
  };

  const updateEditForeignLanguage = (id, newLanguage) => {
    const foreignLanguage = editForeignLanguages.find(
      (foreignLanguage) => foreignLanguage._id === id
    );
    const idx = editForeignLanguages.indexOf(foreignLanguage);
    const tmp = [...editForeignLanguages];
    tmp.splice(idx, 1, newLanguage);
    setEditForeignLanguages(tmp);
    console.log(editForeignLanguages);
  };

  const removeEditForeignLanguage = (id) => {
    setEditForeignLanguages(
      editForeignLanguages.filter(
        (foreignLanguage) => foreignLanguage._id !== id
      )
    );
  };

  const handleBackToBoard = () => {
    navigate("/board");
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

  const handleAddDegree = () => {
    setEditDegrees([
      ...editDegrees,
      { ...DegreeModel, _id: new Date().getTime() },
    ]);
  };

  const handleAddForeignLanguage = () => {
    setEditForeignLanguages([
      ...editForeignLanguages,
      {
        ...ForeignLanguageModel,
        _id: new Date().getTime(),
      },
    ]);
  };

  return (
    <StyledMyPage>
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
              {skillSetList.map((skill, idx) => {
                return (
                  <button
                    key={idx + 1}
                    className="skill"
                    value={skill}
                    style={{
                      backgroundColor: editSkillSet.includes(skill)
                        ? ""
                        : "lightgrey",
                    }}
                    onClick={handleEditSkillSetChange}
                  >
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
              defaultValue={introduction}
              rows={20}
              onChange={handleEditIntroChange}
            />
            <div className="editContainer">
              <h1>주소</h1>
              <input
                className="edit"
                defaultValue={address}
                onChange={handleEditAddressChange}
              />
            </div>
            <div className="editContainer">
              <h1>휴대전화</h1>
              <input
                className="edit"
                defaultValue={phoneNumber}
                onChange={handleEditPhoneNumberChange}
              />
            </div>
            <div className="editContainer">
              <h1>학력사항</h1>
              <div className="forms">
                {editDegrees.map((degree) => {
                  return (
                    <EditDegree
                      key={degree._id}
                      removeEditDegree={removeEditDegree}
                      updateEditDegree={updateEditDegree}
                      data={degree}
                    />
                  );
                })}
                <button onClick={handleAddDegree}>+</button>
              </div>
            </div>
            <div className="editContainer">
              <h1>어학성적</h1>
              <div className="forms">
                {editForeignLanguages.map((foreignLanguage) => {
                  console.log(editForeignLanguages);
                  return (
                    <EditForeignLanguage
                      key={foreignLanguage._id}
                      removeEditForeignLanguage={removeEditForeignLanguage}
                      updateEditForeignLanguage={updateEditForeignLanguage}
                      data={foreignLanguage}
                    />
                  );
                })}
                <button onClick={handleAddForeignLanguage}>+</button>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1>
              {name}({id})
            </h1>
            <h1>학력사항</h1>
            {degrees?.map((degree, i) => {
              return <Degree key={i + 1} data={degree} />;
            })}
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
            <h1>이메일</h1>
            <p>{email}</p>
            <h1>생년월일</h1>
            <p>{dOfB}</p>
            <h1>주소</h1>
            <p>{address}</p>
            <h1>휴대전화</h1>
            <p>{phoneNumber}</p>
            <h1>소개</h1>
            <p>{introduction}</p>
            <h1>어학성적</h1>
            {foreignLanguages?.map((foreignLanguage, i) => {
              return <ForeignLanguage key={i + 1} data={foreignLanguage} />;
            })}
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
