import styled from "styled-components";

const StyledForeignLanguage = styled.div``;

const ForeignLanguage = ({ data }) => {
  return (
    <StyledForeignLanguage>
      <p>
        시험명: {data.name} | 취득일: {data.period} | 점수: {data.details}
      </p>
    </StyledForeignLanguage>
  );
};

export default ForeignLanguage;
