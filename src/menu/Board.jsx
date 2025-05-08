import styled from "styled-components";
import PostElement from "../board/PostElement";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const StyledBoard = styled.div`
  .boardContainer {
    margin: 20px auto;
    padding: 25px;
    max-width: 900px;
    background: #eafae3;  // 💚 연녹색 배경
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;

    a {
      text-decoration: none;
      color: #2c2c2c;
    }

    .postItem {
      padding: 15px;
      margin-bottom: 10px;
      border: 2px solid #4CAF50;  // 💚 진한 녹색 테두리
      border-radius: 10px;
      background: white;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .meta {
        flex: 1;
      }

      .actions {
        display: flex;
        gap: 8px;

        button {
          padding: 5px 10px;
          font-size: 13px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .edit {
          background-color: #388e3c;  // 진한 초록
          color: white;
        }

        .delete {
          background-color: #e53935;
          color: white;
        }
      }
    }

    .upload {
      color: #2e7d32;
      text-align: center;
      font-weight: bold;
    }

    .writePostContainer {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;

      a {
        border: 2px solid #4CAF50;
        padding: 8px 16px;
        border-radius: 10px;
        background-color: #4CAF50;
        color: white;
        font-weight: bold;

        &:hover {
          background-color: #388e3c;
        }
      }
    }
  }

  .pagenation {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;

    .inner {
      display: flex;
      gap: 10px;

      .num {
        width: 36px;
        height: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: bold;
        border-radius: 50%;
        background-color: #a5d6a7;
        color: white;
        cursor: pointer;

        &.active {
          background-color: #4CAF50;
          border: 2px solid #388e3c;
          color: white;
        }
      }
    }
  }
`;

const Board = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ 테스트용 더미 데이터
  useEffect(() => {
    const dummy = Array.from({ length: 15 }, (_, i) => ({
      _id: `${i}`,
      title: `더미 게시글 제목 ${i + 1}`,
      author: { _id: "1234", name: `사용자${i + 1}` },
      createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    }));

    setAllPosts(dummy);
    setIsLoading(false);
  }, []);

  // 페이지별 분할
  useEffect(() => {
    setPosts(allPosts.slice((page - 1) * 10, page * 10));
  }, [page, allPosts]);

  const handleDelete = (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    setAllPosts((prev) => prev.filter((post) => post._id !== id));
  };

  return (
    <StyledBoard>
      <div className="boardContainer">
        {isLoading ? (
          <div className="upload">
            <h1>게시글을 불러오는 중입니다...</h1>
          </div>
        ) : allPosts.length === 0 ? (
          <div className="upload">
            <h1>게시글이 없습니다.</h1>
          </div>
        ) : (
          posts.map(({ title, createdAt, _id, author }) => (
            <div key={_id} className="postItem">
              <div className="meta" onClick={() => navigate(`/post?id=${_id}`)}>
                <PostElement title={title} author={author} date={createdAt} />
              </div>
              {user() && user()._id === author._id && (
                <div className="actions">
                  <button className="edit" onClick={() => navigate(`/editPost?id=${_id}`)}>수정</button>
                  <button className="delete" onClick={() => handleDelete(_id)}>삭제</button>
                </div>
              )}
            </div>
          ))
        )}
        <div className="pagenation">
          <div className="inner">
            {[...Array(Math.ceil(allPosts.length / 10))].map((_, i) => (
              <div
                key={i + 1}
                className={`num ${page === i + 1 ? "active" : ""}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
        {user() && (
          <div className="writePostContainer">
            <a href="/writePost">게시글 작성</a>
          </div>
        )}
      </div>
    </StyledBoard>
  );
};

export default Board;