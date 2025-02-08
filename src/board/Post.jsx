import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { customAxios } from "../customAxios";
import { useAuth } from "../AuthContext";
import { jobTypes, skillSetList } from "../data";

const StyledPost = styled.div`
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
      gap: 20px;
      justify-content: center;
      margin-bottom: 20px;
    }

    .buttonContainer2 {
      display: flex;
      gap: 20px;
      justify-content: center;
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
      background-color: ${({ theme }) => theme.colors.BACK};
      color: ${({ theme }) => theme.colors.SIDE};
      border: 2px solid ${({ theme }) => theme.colors.SIDE};
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

    .skillSet {
      display: flex;
      flex-direction: row;
      gap: 10px;
      width: 100%;
      flex-wrap: wrap;
      margin: 0 20px 20px 20px;
    }

    .application {
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
      border-radius: 12px;
      min-width: 200px;
    }

    .applications {
      display: flex;
      gap: 10px;
      margin: 0 20px;
      flex-wrap: wrap;
    }
  }
`;

const Post = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [editMode, setEditMode] = useState(false);
  const [jobType, setJobType] = useState();
  const [title, setTitle] = useState();
  const [skillSet, setSkillSet] = useState([]);
  const [author, setAuthor] = useState();
  const [postId, setPostId] = useState();
  const [date, setDate] = useState();
  const [content, setContent] = useState();

  const [applications, setApplications] = useState([]);

  const [editJobType, setEditJobType] = useState();
  const [editTitle, setEditTitle] = useState();
  const [editSkillSet, setEditSkillSet] = useState();
  const [editContent, setEditContent] = useState();

  const navigate = useNavigate();
  const { user, isCompanyUser } = useAuth();

  useEffect(() => {
    customAxios
      .get(`jobPost/${searchParams.get("id")}`)
      .then((res) => {
        const data = res.data;
        console.log(data);
        setJobType(data.jobType);
        setTitle(data.title);
        setSkillSet(data.skillSets);
        setAuthor(data.author);
        setPostId(data._id);
        setDate(data.createdAt);
        setContent(data.content);
        user() &&
          data.author &&
          user()._id === data.author._id &&
          customAxios
            .get(`jobPost/applications/${searchParams.get("id")}`)
            .then((res) => {
              setApplications(res.data);
              console.log(res);
            })
            .catch((err) => {
              console.error(err);
            });
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [editMode, searchParams]);

  const handleEditStart = () => {
    setEditTitle(title);
    setEditContent(content);
    setEditMode(true);
  };

  const handleEditFinish = () => {
    customAxios
      .put(`posts/${searchParams.get("id")}`, {
        title: editTitle,
        content: editContent,
      })
      .then((res) => {
        console.log(res);
        setEditMode(false);
      })
      .catch((err) => console.log(err));
  };

  const handleEditTitleChange = (e) => {
    setEditTitle(e.target.value);
  };

  const handleEditContentChange = (e) => {
    setEditContent(e.target.value);
  };

  const handleBackToBoard = (e) => {
    if (searchParams.get("company")) {
      navigate(`/company?id=${searchParams.get("company")}`);
    } else {
      navigate("/board");
    }
  };

  const handleApplication = () => {
    navigate(`/resumes?applyTo=${postId}`);
  };

  const handleDeletePost = () => {
    customAxios
      .delete(`/posts/${postId}`)
      .then((res) => {
        console.log(res);
        handleBackToBoard();
      })
      .catch((err) => console.log(err));
  };

  const handleEditCancel = () => {
    setEditMode(false);
  };

  const handleSkillSetChange = (e) => {
    if (editSkillSet.includes(e.target.value)) {
      const newSkillSet = editSkillSet.filter((set) => set !== e.target.value);
      setEditSkillSet(newSkillSet);
    } else {
      setEditSkillSet([...editSkillSet, e.target.value]);
    }
    console.log(skillSet);
  };

  const handleViewResume = (application) => {
    navigate(
      `/resume?id=${application.resume._id}&user=${
        application.user._id
      }&from=${searchParams.get("id")}`
    );
  };

  const handleViewCompany = () => {
    navigate(`/company?id=${author?._id}&from=${postId}`);
  };

  return (
    <StyledPost>
      <div className="boardContainer">
        {isLoading ? (
          <div style={{ display: "flex" }}>
            <h1 style={{ margin: "auto" }}>Loading...</h1>
          </div>
        ) : (
          <>
            {editMode ? (
              <>
                <form className="radio">
                  {jobTypes.map((type, idx) => {
                    return (
                      <label key={idx + 1}>
                        <input
                          name="radio"
                          type="radio"
                          value={type}
                          defaultChecked={type === jobType}
                          onClick={() => setEditJobType(type)}
                        />
                        <p>{type}</p>
                      </label>
                    );
                  })}
                </form>
                <input
                  className="editTitle"
                  defaultValue={title}
                  onChange={handleEditTitleChange}
                />
                <div className="skillSet">
                  {skillSetList.map((skill, idx) => {
                    return (
                      <button
                        key={idx + 1}
                        className="skill"
                        value={skill}
                        style={{
                          backgroundColor: skillSet.includes(skill)
                            ? ""
                            : "lightgrey",
                        }}
                        onClick={handleSkillSetChange}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <h1>
                  [{jobType}] {title} - {author?.name}
                </h1>
                <div className="skillSet">
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
            <p>{date?.split("T")[0]}</p>
            {editMode ? (
              <textarea
                className="editContent"
                defaultValue={content}
                rows={20}
                onChange={handleEditContentChange}
              />
            ) : (
              <p id="content">{content}</p>
            )}
            <div className="buttonContainer">
              {editMode ? (
                <>
                  <button onClick={handleEditFinish}>수정 완료</button>
                  <button onClick={handleEditCancel}>취소</button>
                </>
              ) : (
                user() &&
                author &&
                user()._id === author._id && (
                  <>
                    <button onClick={handleEditStart}>채용 공고 수정</button>
                    <button onClick={handleDeletePost}>채용 공고 삭제</button>
                  </>
                )
              )}
              {!isCompanyUser() && (
                <button className="listButton" onClick={handleApplication}>
                  지원하기
                </button>
              )}
              <button className="listButton" onClick={handleViewCompany}>
                회사 정보 확인
              </button>
              <button
                id="backBtn"
                className="listButton"
                onClick={handleBackToBoard}
              >
                뒤로가기
              </button>
            </div>
          </>
        )}
      </div>
      {user() && author && user()._id === author._id && (
        <div className="boardContainer">
          <h1>지원자 명단</h1>
          {isLoading ? (
            <h2>Loading...</h2>
          ) : (
            <>
              {applications.length ? (
                <div className="applications">
                  {applications.map((application) => {
                    return (
                      <div key={application.resume._id} className="application">
                        <p>
                          {application.resume.title} ({application.user.name})
                        </p>
                        <p>지원 동기: {application.resume.motivation}</p>
                        <p>{application.resume.phone}</p>
                        <p>{application.resume.email}</p>
                        <div className="buttonContainer2">
                          <button onClick={() => handleViewResume(application)}>
                            자세히 보기
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <h2>현재 지원자가 없습니다.</h2>
              )}
            </>
          )}
        </div>
      )}
    </StyledPost>
  );
};

export default Post;
