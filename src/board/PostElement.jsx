import styled from "styled-components";

const StyledPostElement = styled.div`
  width: 100%;
  height: 40px;
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
    padding: 0 20px;
    font-family: "Arial", sans-serif;
    font-size: 14px;
    color: #333333;
  }
`;

const PostElement = ({ title, author, date }) => {
  return (
    <StyledPostElement>
      <div className="inner">
        <div className="title">{title}</div>
        <div className="date">
          작성자: {author?.email} | {date.split("T").join(" ").split(".")[0]}
        </div>
      </div>
    </StyledPostElement>
  );
};

export default PostElement;
