import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { customAxios } from "../customAxios";
import { useAuth } from "../AuthContext";
import { skillSetList } from "../data";
import Degree from "../components/Degree";
import ForeignLanguage from "../components/ForeignLanguage";
import EditDegree from "../components/EditDegree";
import EditForeignLanguage from "../components/EditForeignLanguage";
import DegreeModel from "../objects/DegreeModel";
import ForeignLanguageModel from "../objects/ForeignLanguageModel";

const StyledCandidate = styled.div`
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

    h1 {
      font-size: 27px;
      font-weight: bold;
      color: #2c2c2c;
      margin-left: 30px;
      margin-bottom: 0;
      margin-top: 30px;
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

    p {
      margin: 0 31px;
      color: #6e6e6e;
    }

    #content {
      margin: 30px;
    }

    .buttonContainer {
      display: flex;
      justify-content: right;
      gap: 20px;
      margin: 50px 0 10px;
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
      height: 40px;
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
    }

    .editContainer {
      display: flex;
      align-items: center;
      h1 {
        min-width: 100px;
        margin: 0 0 0 30px;
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

const Candidate = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

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

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    customAxios.get(`user/${searchParams.get("id")}`).then((res) => {
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
      setIsLoading(false);
    });
  }, []);

  const handleBackToCandidates = () => {
    navigate("/candidates");
  };

  return (
    <StyledCandidate>
      <div className="boardContainer">
        {isLoading ? (
          <div className="editContainer">
            <h1 style={{ margin: "auto" }}>Loading...</h1>
          </div>
        ) : (
          <>
            <h1 style={{ fontSize: "40px" }}>
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
          <button
            style={{ background: "#353535" }}
            onClick={handleBackToCandidates}
          >
            뒤로 가기
          </button>
        </div>
      </div>
    </StyledCandidate>
  );
};

export default Candidate;
