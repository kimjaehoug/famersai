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
      background-color: #7db249;
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
      background-color: #d2ff7c;
    }

    button:active {
      background-color: #d2ff7c;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset;
    }

    .listButton {
      background-color: white;
      color: #7db249;
      border: 2px solid #7db249;
    }

    .listButton:hover {
      background-color: #d2ff7c;
    }

    .listButton:active {
      background-color: #e6e6e6;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset;
    }
  }
`;

const WritePost = () => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    setTitle("포스트 제목");
    setContent("포스트 내용");
  }, []);

  const handleEditFinish = () => {
    customAxios
      .post("/posts", {
        title,
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

  return (
    <StyledPost>
      <div className="boardContainer">
        <input
          className="editTitle"
          defaultValue={title}
          onChange={handleEditTitleChange}
        />
        <textarea
          className="editContent"
          defaultValue={content}
          rows={20}
          onChange={handleEditContentChange}
        />
        <div className="buttonContainer">
          <button onClick={handleEditFinish}>게시글 등록</button>

          <button className="listButton" onClick={handleBackToBoard}>
            취소
          </button>
        </div>
      </div>
    </StyledPost>
  );
};

export default WritePost;
