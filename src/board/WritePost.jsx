import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../customAxios";
import { useAuth } from "../AuthContext";

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
      margin-bottom: 30px;
      margin-left: 30px;
    }

    p {
      margin-bottom: 20px;
      margin-left: 30px;
      color: #6e6e6e;
    }

    .buttonContainer {
      display: flex;
      gap: 10px;
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
      color: ${({ theme }) => theme.colors.BACK};
      border: 2px solid ${({ theme }) => theme.colors.BACK};
    }

    .radio {
      display: flex;
      flex-direction: row;
      justify-content: left;
      width: 100%;
      margin: 0 20px;
      label {
        display: flex;
        align-items: center;
        margin: 0 5px;
        input {
          max-width: 15px;
          box-shadow: none !important;
          margin: 0 !important;
        }
        p {
          margin: 10px;
        }
      }
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

const WritePost = () => {
  const [jobType, setJobType] = useState();
  const [title, setTitle] = useState();
  const [skillSets, setSkillSets] = useState([]);
  const [content, setContent] = useState();
  const navigate = useNavigate();
  const { user } = useAuth();
  const jobTypes = [
    "인턴",
    "신입",
    "경력 1~2년차",
    "경력 3~4년차",
    "경력 5년+",
  ];
  const skillSetList = [
    "Python",
    "Java",
    "Kotlin",
    "Redis",
    "JavaScript",
    "NLP",
    "Pytorch",
    "Adobe Premier",
    "SQL",
    "Microsoft Excel",
    "Data Science",
    "Machine Learning",
    "한글과컴퓨터",
    "Database",
    "Node JS",
    "JSON",
    "Microsoft Word",
    "Microsoft Powerpoint",
    "Figma",
    "Photoshop",
    "Illustrator",
    "TOEIC",
    "TEPS",
    "JLPT",
    "IELTS",
  ];

  useEffect(() => {
    setJobType(jobTypes[0]);
  }, []);

  const handleEditFinish = () => {
    customAxios
      .post("/jobPost", {
        jobType,
        title,
        skillSets,
        content,
        author: { email: user.email, _id: user.id },
      })
      .then((res) => {
        console.log(res);
        handleBackToBoard();
      })
      .catch((err) => console.log(err));
  };

  const handleEditTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleEditContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleBackToBoard = () => {
    navigate("/board");
  };

  const handleSkillSetChange = (e) => {
    if (skillSets.includes(e.target.value)) {
      const newSkillSets = skillSets.filter((set) => set !== e.target.value);
      setSkillSets(newSkillSets);
    } else {
      setSkillSets([...skillSets, e.target.value]);
    }
    console.log(skillSets);
  };

  return (
    <StyledPost>
      <div className="boardContainer">
        <form className="radio">
          {jobTypes.map((jobType, idx) => {
            return (
              <label key={idx + 1}>
                <input
                  name="radio"
                  type="radio"
                  value={jobType}
                  defaultChecked={!idx}
                />
                <p>{jobType}</p>
              </label>
            );
          })}
        </form>
        <input
          className="editTitle"
          defaultValue={title}
          placeholder="채용 공고 제목"
          onChange={handleEditTitleChange}
        />
        <div className="skillSets">
          {skillSetList.map((skillSet, idx) => {
            return (
              <button
                key={idx + 1}
                className="skillSet"
                value={skillSet}
                style={{
                  backgroundColor: skillSets.includes(skillSet)
                    ? ""
                    : "lightgrey",
                }}
                onClick={handleSkillSetChange}
              >
                {skillSet}
              </button>
            );
          })}
        </div>
        <textarea
          className="editContent"
          defaultValue={content}
          rows={20}
          onChange={handleEditContentChange}
          placeholder="채용 공고 관련 상세 내용"
        />
        <div className="buttonContainer">
          <button onClick={handleEditFinish}>채용 공고 등록</button>

          <button className="listButton" onClick={handleBackToBoard}>
            취소
          </button>
        </div>
      </div>
    </StyledPost>
  );
};

export default WritePost;
