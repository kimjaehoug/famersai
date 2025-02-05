import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { customAxios } from "../customAxios";
import { useAuth } from "../AuthContext";
import Degree from "../components/Degree";
import ForeignLanguage from "../components/ForeignLanguage";
import EditActivity from "../components/EditActivity";
import ActivityModel from "../objects/ActivityModel";
import Activity from "../components/Activity";

const StyledApplicantResume = styled.div`
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
      margin-top: 30px;
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
      background-color: ${({ theme }) => theme.colors.DARK};
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
      box-sizing: border-box;
    }

    .cancel {
      background-color: ${({ theme }) => theme.colors.CANCEL};
    }

    button:hover {
      background-color: ${({ theme }) => theme.colors.BACK};
      color: ${({ theme }) => theme.colors.DARK};
      border: 2px solid ${({ theme }) => theme.colors.DARK};
    }

    .cancel:hover {
      color: ${({ theme }) => theme.colors.CANCEL};
      border: 2px solid ${({ theme }) => theme.colors.CANCEL};
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
      flex-direction: column;
      align-items: left;
      margin: 0 0 0 30px;
      h1 {
        min-width: 140px;
        margin-left: 0;
      }

      input,
      textarea {
        margin-left: 0;
        margin-bottom: 0;
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
      button {
        margin: 20px auto;
        width: 80px;
      }
    }
  }
`;

const ApplicantResume = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const [name, setName] = useState();
  const [skillSet, setSkillSet] = useState([]);
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [degrees, setDegrees] = useState([]);
  const [foreignLanguages, setForeignLanguages] = useState([]);
  const [email, setEmail] = useState();
  const [dOfB, setDOfB] = useState();
  const [introduction, setIntroduction] = useState();
  const [title, setTitle] = useState();
  const [motivation, setMotivation] = useState();
  const [jobExperience, setJobExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [awards, setAwards] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [portfolioLinks, setPortfolioLinks] = useState([]);
  const [portfolioFiles, setPortfolioFiles] = useState([]);
  const [additionalFiles, setAdditionalFiles] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get("id")) {
      customAxios.get(`resume/${searchParams.get("id")}`).then((res) => {
        const data = res.data;
        setTitle(data.title);
        setMotivation(data.motivation);
        setJobExperience(data.jobExperience);
        setProjects(data.projects);
        setActivities(data.activities);
        setAwards(data.awards);
        setCertificates(data.certificates);
        setPortfolioLinks(data.portfolioLinks);
        setPortfolioFiles(data.portfolioFiles);
        setAdditionalFiles(data.additionalFiles);
      });
    }
    customAxios.get(`user/${searchParams.get("user")}`).then((res) => {
      const data = res.data;
      setName(data.name);
      setSkillSet(data.skillSet);
      setEmail(data.email);
      setDOfB(data.dateOfBirth);
      setIntroduction(data.introduction);
      setAddress(data.address);
      setPhoneNumber(data.phoneNumber);
      setDegrees(data.degrees);
      setForeignLanguages(data.foreignLanguages);
      setIsLoading(false);
    });
  }, []);

  const Activities = ({ target, name }) => {
    return (
      <>
        <h1>{name}</h1>
        {target?.map((el, i) => {
          return <Activity key={i + 1} data={el} />;
        })}
      </>
    );
  };

  const handleBacktoJobPost = () => {
    navigate(`/post?id=${searchParams.get("from")}`);
  };

  return (
    <StyledApplicantResume>
      <div className="boardContainer">
        {isLoading ? (
          <div className="editContainer">
            <h1 style={{ margin: "auto" }}>Loading...</h1>
          </div>
        ) : (
          <>
            <h1 style={{ fontSize: "40px" }}>{title}</h1>
            <h1 style={{ fontSize: "50px" }}>{name}</h1>
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
            <h1>지원동기</h1>
            <p>{motivation}</p>
            <Activities name={"경력"} target={jobExperience} />
            <Activities name={"프로젝트"} target={projects} />
            <Activities name={"대회활동"} target={activities} />
            <Activities name={"포트폴리오"} target={portfolioLinks} />
            <Activities name={"수상경력"} target={awards} />
            <Activities name={"자격증"} target={certificates} />
            <div className="buttonContainer">
              <button onClick={handleBacktoJobPost}>뒤로 가기</button>
            </div>
          </>
        )}
      </div>
    </StyledApplicantResume>
  );
};

export default ApplicantResume;
