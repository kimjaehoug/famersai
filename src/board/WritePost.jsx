import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../customAxios";
import { useAuth } from "../AuthContext";

const StyledPost = styled.div`
  .boardContainer {
    margin: 20px auto;
    padding: 25px;
    max-width: 900px;
    background: #ffffff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;

    h1 {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
      color: #2e7d32; /* 진한 초록 */
    }

    input,
    textarea,
    select {
      width: 100%;
      margin-bottom: 15px;
      box-sizing: border-box; /* ✅ 이 줄 추가 */
      padding: 12px 14px;
      font-size: 16px;
      border: 1px solid #c8e6c9; /* 연한 초록 테두리 */
      border-radius: 8px;
      outline: none;
      background: #FFFFFF;

      &:focus {
        border-color: #81c784; /* 활성화 초록 */
        box-shadow: 0 0 0 3px rgba(129, 199, 132, 0.3);
      }
    }

    textarea {
      resize: vertical;
      height: 200px;
    }

    .buttonContainer {
      display: flex;
      justify-content: center;
      gap: 10px;

      button {
        padding: 10px 20px;
        border: none;
        border-radius: 8px;
        font-weight: bold;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
      }

      .submit {
        background-color: #43a047;  /* 짙은 그린 */
        color: white;

        &:hover {
          background-color: #388e3c;
        }
      }

      .cancel {
        background-color: #c8e6c9; /* 연한 그린 */
        color: #2e7d32;

        &:hover {
          background-color: #a5d6a7;
        }
      }
    }
  }
`;

const WritePost = () => {
  const { user } = useAuth();
  const userId = user()?.id;
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [farmList, setFarmList] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState("");
  const [selectPost , setSelectedPost] = useState("");



    const postLists = [
      { label: "뉴스",link: "news" },
      { label: "자유게시판",link: "free" },
    ];

  // 농장 목록 불러오기
  useEffect(() => {
    if (userId) {
      customAxios
        .get(`/farm/farms?userId=${userId}`)
        .then((res) => setFarmList(res.data))
        .catch((err) => console.error("농장 목록 불러오기 실패:", err));
    }
  }, [userId]);


  
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!title || !content) {
    alert("제목과 내용을 입력하세요.");
    return;
  }

  try {
    await customAxios.post("/posts/add", {
      title,
      content,
      author_id: user().id,
      author_name: user().name,
      category: selectPost
    });
    alert("게시글이 등록되었습니다.");
    navigate("/board");
  } catch (err) {
    console.error("❌ 게시글 등록 실패:", err);
    alert("업로드 실패");
  }
};
  return (
    <StyledPost>
      <div className="boardContainer">
        <h1>게시글 작성</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <select
            value={selectedFarm}
            onChange={(e) => setSelectedFarm(e.target.value)}
            required
          >
            <option value="">📍 농장 선택</option>
            {farmList.map((farm) => (
              <option key={farm.name} value={farm.name}>
                {farm.name}
              </option>
            ))}
          </select>

          <select
            value = {selectPost}
            onChange={(e) => setSelectedPost(e.target.value)}
            required
          >
            <option value="">📍 게시판 선택</option>
              {postLists.map((post) => (
                <option key={post.name} value={post.name}>
                  {post.name}
                </option>
              ))}
          </select>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/*, .pdf"
          />
          <div className="buttonContainer">
            <button type="submit" className="submit">등록</button>
            <button type="button" className="cancel" onClick={() => navigate("/board")}>취소</button>
          </div>
        </form>
      </div>
    </StyledPost>
  );
};

export default WritePost;