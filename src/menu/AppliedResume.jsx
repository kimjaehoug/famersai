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

const StyledAppliedResume = styled.div`
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

const AppliedResume = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [editMode, setEditMode] = useState(false);

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

  const [editTitle, setEditTitle] = useState();
  const [editMotiv, setEditMotiv] = useState();
  const [editJobExp, setEditJobExp] = useState([]);
  const [editProjects, setEditProjects] = useState([]);
  const [editActivities, setEditActivities] = useState([]);
  const [editPortfolioLinks, setEditPortfolioLinks] = useState([]);
  const [editPortfolioFiles, setEditPortfolioFiles] = useState([]);
  const [editAdditionalFiles, setEditAdditionalFiles] = useState([]);
  const [editAwards, setEditAwards] = useState([]);
  const [editCertificates, setEditCertificates] = useState([]);

  const navigate = useNavigate();
  const { user } = useAuth();
  const [applyMode, setApplyMode] = useState(false);

  useEffect(() => {
    if (searchParams.get("applyTo")) {
      setApplyMode(true);
    }
    if (searchParams.get("id")) {
      customAxios.get(`resume/${searchParams.get("id")}`).then((res) => {
        const data = res.data;
        setTitle(data.title);
        setEditTitle(data.title);
        setMotivation(data.motivation);
        setEditMotiv(data.motivation);
        setJobExperience(data.jobExperience);
        setEditJobExp(data.jobExperience);
        setProjects(data.projects);
        setEditProjects(data.projects);
        setActivities(data.activities);
        setEditActivities(data.activities);
        setAwards(data.awards);
        setEditAwards(data.awards);
        setCertificates(data.certificates);
        setEditCertificates(data.certificates);
        setPortfolioLinks(data.portfolioLinks);
        setEditPortfolioLinks(data.portfolioLinks);
        setPortfolioFiles(data.portfolioFiles);
        setEditPortfolioFiles(data.portfolioFiles);
        setAdditionalFiles(data.additionalFiles);
        setEditAdditionalFiles(data.additionalFiles);
      });
    } else {
      setEditMode(true);
    }
    customAxios.get(`user/${user()._id}`).then((res) => {
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
  }, [editMode]);

  const handleEditStart = () => {
    setEditMode(true);
  };

  const handleEditFinish = () => {
    if (!editTitle || !editMotiv) {
      window.alert("제목과 지원 동기는 필수 입력 사항입니다.");
      return;
    }
    const newResume = {
      author: user()._id,
      title: editTitle,
      motivation: editMotiv,
      jobExperience: editJobExp.map((el) => {
        delete el._id;
        return el;
      }),
      projects: editProjects.map((el) => {
        delete el._id;
        return el;
      }),
      activities: editActivities.map((el) => {
        delete el._id;
        return el;
      }),
      portfolioLinks: editPortfolioLinks.map((el) => {
        delete el._id;
        return el;
      }),
      awards: editAwards.map((el) => {
        delete el._id;
        return el;
      }),
      certificates: editCertificates.map((el) => {
        delete el._id;
        return el;
      }),
      portfolioFiles: editPortfolioFiles,
      additionalFiles: editAdditionalFiles,
    };

    if (searchParams.get("id")) {
      customAxios
        .put(`/resume/${searchParams.get("id")}`, newResume)
        .then((res) => {
          console.log(res);
          setEditMode(false);
        })
        .catch((err) => console.log(err));
    } else {
      customAxios
        .post("/resume", newResume)
        .then((res) => {
          console.log(res);
          navigate(`/resume?id=${res.data._id}`);
          setEditMode(false);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleEditTitleChange = (e) => {
    setEditTitle(e.target.value);
  };

  const handleEditMotivChange = (e) => {
    setEditMotiv(e.target.value);
  };

  const handleCancelApplication = () => {
    customAxios
      .put(`/jobPost/apply/${searchParams.get("appliedJob")}`, {
        resumeId: searchParams.get("id"),
        userId: user()._id,
      })
      .then((res) => {
        console.log(res);
        window.alert("지원을 성공적으로 취소하였습니다.");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBackToResumes = () => {
    navigate("/resumes");
  };

  const add = (target, setter, model) => {
    setter([...target, { ...model, _id: new Date().getTime() }]);
  };

  const update = (id, newEl, target, setter) => {
    const el = target.find((el) => el._id === id);
    const idx = target.indexOf(el);
    const tmp = [...target];
    tmp.splice(idx, 1, newEl);
    setter(tmp);
  };

  const remove = (id, target, setter) => {
    setter(target.filter((el) => el._id !== id));
  };

  const EditActivities = ({ name, target, setter }) => {
    return (
      <div className="editContainer">
        <h1>{name}</h1>
        <div className="forms">
          {target?.map((el) => {
            return (
              <EditActivity
                key={el._id + new Date().getTime()}
                removeEditActivity={(id) => remove(id, target, setter)}
                updateEditActivity={(id, newEl) =>
                  update(id, newEl, target, setter)
                }
                data={el}
              />
            );
          })}
          <button onClick={() => add(target, setter, ActivityModel)}>+</button>
        </div>
      </div>
    );
  };

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

  const handleApply = () => {
    customAxios
      .post(`/jobPost/apply/${searchParams.get("applyTo")}`, {
        resumeId: searchParams.get("id"),
        userId: user()._id,
      })
      .then((res) => {
        console.log(res);
        window.alert("지원을 성공적으로 완료하였습니다.");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBackToAppliedJob = () => {
    navigate(
      `/appliedJob?id=${searchParams.get(
        "appliedJob"
      )}&resume=${searchParams.get("id")}`
    );
  };

  return (
    <StyledAppliedResume>
      <div className="boardContainer">
        {isLoading ? (
          <div className="editContainer">
            <h1 style={{ margin: "auto" }}>Loading...</h1>
          </div>
        ) : (
          <>
            {editMode ? (
              <div className="editContainer">
                <input
                  className="edit"
                  placeholder="이력서 제목"
                  style={{ fontSize: "40px" }}
                  value={editTitle}
                  onChange={handleEditTitleChange}
                />
              </div>
            ) : (
              <h1 style={{ fontSize: "40px" }}>{title}</h1>
            )}
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
            {editMode ? (
              <>
                <div className="editContainer">
                  <h1>지원 동기</h1>
                  <textarea
                    className="editIntro"
                    defaultValue={editMotiv}
                    rows={20}
                    onChange={handleEditMotivChange}
                  />
                </div>
                <EditActivities
                  name={"경력"}
                  target={editJobExp}
                  setter={setEditJobExp}
                />
                <EditActivities
                  name={"프로젝트"}
                  target={editProjects}
                  setter={setEditProjects}
                />
                <EditActivities
                  name={"대외활동"}
                  target={editActivities}
                  setter={setEditActivities}
                />
                <EditActivities
                  name={"포트폴리오"}
                  target={editPortfolioLinks}
                  setter={setEditPortfolioLinks}
                />
                <EditActivities
                  name={"수상경력"}
                  target={editAwards}
                  setter={setEditAwards}
                />
                <EditActivities
                  name={"자격증"}
                  target={editCertificates}
                  setter={setEditCertificates}
                />
              </>
            ) : (
              <>
                <Activities name={"경력"} target={jobExperience} />
                <Activities name={"프로젝트"} target={projects} />
                <Activities name={"대회활동"} target={activities} />
                <Activities name={"포트폴리오"} target={portfolioLinks} />
                <Activities name={"수상경력"} target={awards} />
                <Activities name={"자격증"} target={certificates} />
              </>
            )}
            <div className="buttonContainer">
              {editMode ? (
                <>
                  <button onClick={handleEditFinish}>
                    {searchParams.get("id") ? "수정 완료" : "이력서 생성"}
                  </button>
                  <button
                    className="cancel"
                    onClick={() => {
                      if (searchParams.get("id")) {
                        setEditMode(false);
                      } else {
                        handleBackToResumes();
                      }
                    }}
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button onClick={handleBackToAppliedJob}>뒤로 가기</button>
                  {applyMode ? (
                    <button className="cancel" onClick={handleApply}>
                      이 이력서로 지원
                    </button>
                  ) : (
                    <button
                      className="cancel"
                      onClick={handleCancelApplication}
                    >
                      지원 취소
                    </button>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </StyledAppliedResume>
  );
};

export default AppliedResume;
