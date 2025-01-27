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
    font-family: "Arial", sans-serif;
    color: #2c2c2c;

    a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 10px;
      margin: 8px 0;
      border-radius: 10px;
      background-color: #f9f9f9;
      text-decoration: none;
      color: #2c2c2c;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease-in-out;

      &:hover {
        background-color: #d2ff7c;
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
        background: white;
        .writePost {
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          height: 40px;
          width: 120px;
          font-size: 18px;
          border-radius: 12px;
          text-align: center;
          background-color: #d2ff7c;
          color: #7db249;
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
        background-color: #f2f2f2;
        color: #585858;
        border: none;
        transition: all 0.3s ease-in-out;

        &:hover {
          background-color: #d2ff7c;
          color: white;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
        }

        &.active {
          background-color: #d2ff7c;
          color: white;
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
      .get("/posts")
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
        {posts.map(({ comments, createdAt, title, _id, author }, i) => (
          <a key={i} href={`/post?id=${_id}`}>
            <PostElement
              title={title}
              numOfComments={comments.length}
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
              <div className="writePost">게시글 작성</div>
            </a>
          </div>
        )}
      </div>
    </StyledBoard>
  );
};

export default Board;
