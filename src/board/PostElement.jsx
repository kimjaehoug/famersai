import styled from "styled-components";

const StyledPostElement = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  margin: 5px auto;
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
    font-size: 16px;
    color: ${({ theme }) => theme.colors?.MAIN || "#333"};
  }
`;

const PostElement = ({ title, jobType = "게시글", author, date }) => {
  // 날짜 파싱 → 안전하게 처리
  let formattedDate = "작성일 없음";
  if (typeof date === "string" && date.includes("T")) {
    formattedDate = date.split("T").join(" ").split(".")[0];
  }

  return (
    <StyledPostElement>
      <div className="inner">
        <div className="title">
          [{jobType}] {title}
        </div>
        <div className="date">
          {author?.name || "익명"} | {formattedDate}
        </div>
      </div>
    </StyledPostElement>
  );
};

export default PostElement;