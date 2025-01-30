import styled from "styled-components";
import PostElement from "../board/PostElement";
import { useEffect, useState } from "react";
import { customAxios } from "../customAxios";
import { useAuth } from "../AuthContext";

const StyledBoard = styled.div`
  .boardContainer {
    margin: 20px auto;
    padding: 25px;
    max-width: 900px;
    background: ${({ theme }) => theme.colors.MAIN};
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    color: #2c2c2c;

    a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 10px;
      margin: 8px 0;
      border-radius: 10px;
      background-color: transparent;
      border: 3px solid ${({ theme }) => theme.colors.BACK};
      text-decoration: none;
      color: #2c2c2c;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease-in-out;

      &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        cursor: pointer;
      }
    }

    .writePostContainer {
      display: flex;
      flex-direction: colunn;
      margin-top: 20px;
      a {
        margin: 0 0 0 auto;
        border: 3px solid ${({ theme }) => theme.colors.BACK};
        background-color: ${({ theme }) => theme.colors.MAIN};
        .writePost {
          height: 30px;
          width: 120px;
          font-size: 18px;
          text-align: center;
          border-radius: 10px;
          color: ${({ theme }) => theme.colors.BACK};
          justify-content: center;
          display: flex;
          flex-direction: column;
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
        border-radius: 20%;
        background-color: ${({ theme }) => theme.colors.BACK};
        color: ${({ theme }) => theme.colors.MAIN};
        border: none;
        transition: all 0.3s ease-in-out;

        &:hover {
          background-color: #d2ff7c;
          color: white;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
        }

        &.active {
          border: 2px solid ${({ theme }) => theme.colors.BACK};
          background-color: ${({ theme }) => theme.colors.MAIN};
          color: ${({ theme }) => theme.colors.BACK};
        }
      }
    }
  }
`;

const Board = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState();
  const { user } = useAuth();

  useEffect(() => {
    customAxios
      .get("/jobPost")
      .then((res) => {
        console.log(res);
        setAllPosts(res.data.reverse());
        setPage(1);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setPosts(allPosts.slice((page - 1) * 10, page * 10));
  }, [page, allPosts]);

  const handlePagenation = (page) => {
    setPage(page);
  };

  return (
    <StyledBoard>
      <div className="boardContainer">
        {posts.map(({ jobType, createdAt, title, _id, author }, i) => (
          <a key={i} href={`/post?id=${_id}`}>
            <PostElement
              title={title}
              jobType={jobType}
              author={author}
              date={createdAt}
            />
          </a>
        ))}
        <div className="pagenation">
          <div className="inner">
            {[...Array(Math.ceil(allPosts.length / 10))].map((_, i) => (
              <div
                key={i + 1}
                className={`num ${page === i + 1 ? "active" : ""}`}
                onClick={() => handlePagenation(i + 1)}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
        {user && (
          <div className="writePostContainer">
            <a href="/writePost">
              <div className="writePost">채용 공고 작성</div>
            </a>
          </div>
        )}
      </div>
    </StyledBoard>
  );
};

export default Board;
