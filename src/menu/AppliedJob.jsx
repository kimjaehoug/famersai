import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { customAxios } from "../customAxios";
import { useAuth } from "../AuthContext";
import { jobTypes, skillSetList } from "../data";

const StyledAppliedJob = styled.div`
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
  }
`;

const AppliedJob = () => {
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

  const [editJobType, setEditJobType] = useState();
  const [editTitle, setEditTitle] = useState();
  const [editSkillSet, setEditSkillSet] = useState();
  const [editContent, setEditContent] = useState();

  const navigate = useNavigate();
  const { user, isCompanyUser } = useAuth();

  useEffect(() => {
    customAxios.get(`jobPost/${searchParams.get("id")}`).then((res) => {
      console.log(res);
      const data = res.data;
      setJobType(data.jobType);
      setTitle(data.title);
      setSkillSet(data.skillSets);
      setAuthor(data.author);
      setPostId(data._id);
      setDate(data.createdAt);
      setContent(data.content);
      setIsLoading(false);
    });
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
    navigate("/board");
  };

  const handleViewResume = () => {
    navigate(
      `/appliedResume?id=${searchParams.get(
        "resume"
      )}&appliedJob=${searchParams.get("id")}`
    );
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

  return (
    <StyledAppliedJob>
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
                  [{jobType}] {title}
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

            <p>작성자: {author?.name}</p>
            <p>작성일: {date?.split("T").join(" ").split(".")[0]}</p>
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
                <button className="listButton" onClick={handleViewResume}>
                  지원 이력서 보기
                </button>
              )}
              <button
                id="backBtn"
                className="listButton"
                onClick={handleBackToBoard}
              >
                목록
              </button>
            </div>
          </>
        )}
      </div>
    </StyledAppliedJob>
  );
};

export default AppliedJob;
