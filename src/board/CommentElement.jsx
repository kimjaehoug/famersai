import styled from "styled-components";
import { customAxios } from "../customAxios";

const StyledCommentElement = styled.div`
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
  margin: 5px auto 5px auto;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  .inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 10px;
    font-family: "Arial", sans-serif;
    font-size: 14px;
    color: #333333;

    .right {
      display: flex;
      align-items: center;
      .date {
        margin-right: 10px;
      }
    }
  }
`;

const CommentElement = ({ comment, user, updateComments }) => {
  const handleDeleteComment = () => {
    customAxios
      .delete(`/comments/${comment._id}`)
      .then((res) => {
        console.log(res);
        updateComments();
      })
      .catch((err) => console.log(err));
  };

  return (
    <StyledCommentElement>
      <div className="inner">
        <div className="comment">
          <b>{comment.author.email}</b>: {comment.content}
        </div>
        <div className="right">
          <div className="date">
            {comment.createdAt
              .split("T")
              .join(" ")
              .split(":")
              .slice(0, 2)
              .join(":")}
          </div>
          {user && comment && user.id === comment.author._id && (
            <button onClick={handleDeleteComment}>댓글 삭제</button>
          )}
        </div>
      </div>
    </StyledCommentElement>
  );
};

export default CommentElement;
