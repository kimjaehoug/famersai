import styled from "styled-components";

const StyledForeignLanguage = styled.div``;

const ForeignLanguage = ({ data }) => {
  return (
    <StyledForeignLanguage>
      <p>시험명: {data.name}</p>
      <p>취득일: {data.period}</p>
      <p>점수: {data.details}</p>
    </StyledForeignLanguage>
  );
};

export default ForeignLanguage;
