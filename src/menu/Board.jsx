import styled from "styled-components";
import PostElement from "../board/PostElement";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../customAxios";
import { useSearchParams } from "react-router-dom";

const StyledBoard = styled.div`
  .boardContainer {
    margin: 20px auto;
    padding: 25px;
    max-width: 1100px;
    background: #eafae3;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;

    a {
      text-decoration: none;
      color: #2c2c2c;
    }

    .tabs {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
      justify-content: center;

      button {
        padding: 8px 16px;
        font-size: 14px;
        font-weight: bold;
        border: 2px solid #4caf50;
        border-radius: 10px;
        background-color: #a5d6a7;
        color: #2e7d32;
        cursor: pointer;
        transition: all 0.3s ease;

        &.active {
          background-color: #4caf50;
          color: white;
          border-color: #388e3c;
        }

        &:hover {
          background-color: #388e3c;
          color: white;
        }
      }
    }

    .postItem {
      padding: 15px;
      margin-bottom: 10px;
      border: 2px solid #4caf50;
      border-radius: 10px;
      background: white;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .meta {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 15px;
        margin-right: 15px;

        .like-count {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          color: #2e7d32;
          font-weight: bold;

          svg {
            fill: #4caf50;
            width: 16px;
            height: 16px;
          }
        }
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
          background-color: #388e3c;
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
        border: 2px solid #4caf50;
        padding: 8px 16px;
        border-radius: 10px;
        background-color: #4caf50;
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
          background-color: #4caf50;
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
  const [activeTab, setActiveTab] = useState("all"); // "all" 또는 "popular"

  const [searchParams] = useSearchParams();

useEffect(() => {
  const tab = searchParams.get("tab");
  if (tab === "news" || tab === "all" || tab === "popular") {
    setActiveTab(tab);
  }
}, [searchParams]);
  useEffect(() => {
    customAxios
      .get("/posts")
      .then((res) => {
        setAllPosts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("❌ 게시글 불러오기 실패:", err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    let sortedPosts = [...allPosts];
    if (activeTab === "all") {
      sortedPosts = sortedPosts.filter(post => post.category === "free");
      sortedPosts = sortedPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (activeTab === "popular") {
      sortedPosts = sortedPosts.filter(post => post.category === "free");
      sortedPosts = sortedPosts.sort((a, b) => {
        const likeCountA = Number(a.like_count) || 0;
        const likeCountB = Number(b.like_count) || 0;
        if (likeCountB === likeCountA) {
          // 좋아요 수가 같으면 최신순으로 2차 정렬
          return new Date(b.created_at) - new Date(a.created_at);
        }
        return likeCountB - likeCountA;
      });
      sortedPosts = sortedPosts.filter(post => post.like_count > 2);
    }else if (activeTab === "news"){
      sortedPosts = sortedPosts.filter(post => post.category === "news");
    }
    setPosts(sortedPosts.slice((page - 1) * 10, page * 10));
  }, [page, allPosts, activeTab]);

  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await customAxios.delete(`/posts/${id}`);
      setAllPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      alert("삭제 실패: 서버 오류");
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1); // 탭 전환 시 페이지를 1로 초기화
  };

  return (
    <StyledBoard>
      <div className="boardContainer">
        <div className="tabs">
          <button
            className={activeTab === "news" ? "active" : ""}
            onClick={() => handleTabChange("news")}
          >
            농업 뉴스

          </button>
          <button
            className={activeTab === "all" ? "active" : ""}
            onClick={() => handleTabChange("all")}
          >
            전체 게시글
          </button>
          <button
            className={activeTab === "popular" ? "active" : ""}
            onClick={() => handleTabChange("popular")}
          >
            인기 게시글
          </button>
        </div>

        {isLoading ? (
          <div className="upload">
            <h1>게시글을 불러오는 중입니다...</h1>
          </div>
        ) : allPosts.length === 0 ? (
          <div className="upload">
            <h1>게시글이 없습니다.</h1>
          </div>
        ) : (
          posts.map(({ title, created_at, id, author_name, author_id, like_count }) => (
            <div key={id} className="postItem">
              <div className="meta" onClick={() => navigate(`/post?id=${id}`)}>
                <PostElement
                  title={title}
                  author={{ name: author_name, _id: author_id }}
                  date={created_at}
                  like_count={like_count}
                  jobType = {activeTab}
                />
                <div className="like-count">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span>{like_count || 0}</span>
                </div>
              </div>
              {user() && user().id === author_id && (
                <div className="actions">
                  <button
                    className="edit"
                    onClick={() => navigate(`/editPost?id=${id}`)}
                  >
                    수정
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(id)}
                  >
                    삭제
                  </button>
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