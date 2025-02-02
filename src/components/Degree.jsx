import styled from "styled-components";

const StyledDegree = styled.div``;

const Degree = ({ data }) => {
  return (
    <StyledDegree>
      <p>
        학위 종류: {data.type} | 학교명: {data.institution} | 전공: {data.major}{" "}
        | 학점: {data.GPA} | 졸업여부: {data.gradStatus} | 졸업(예정)일:{" "}
        {data.gradYearMonth}
      </p>
    </StyledDegree>
  );
};

export default Degree;
