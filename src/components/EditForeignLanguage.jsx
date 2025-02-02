import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledEditForeignLanguage = styled.div`
  display: flex;
  div {
    p {
      margin: 0 !important;
    }
    input {
      margin: 0 !important;
      font-size: 14px !important;
      padding: 10px !important;
      box-sizing: border-box !important;
    }
  }
  button {
    margin: 30px 0 0 0 !important;
  }
`;

const EditForeignLanguage = ({
  data,
  updateEditForeignLanguage,
  removeEditForeignLanguage,
}) => {
  const [editForeignLanguage, setEditForeignLanguage] = useState();

  const handleNameChange = (e) => {
    const newEditForeignLanguage = {
      ...editForeignLanguage,
      name: e.target.value,
    };
    setEditForeignLanguage(newEditForeignLanguage);
    updateEditForeignLanguage(data._id, newEditForeignLanguage);
  };

  const handlePeriodChange = (e) => {
    const newEditForeignLanguage = {
      ...editForeignLanguage,
      period: e.target.value,
    };
    setEditForeignLanguage(newEditForeignLanguage);
    updateEditForeignLanguage(data._id, newEditForeignLanguage);
  };

  const handleScoreChange = (e) => {
    const newEditForeignLanguage = {
      ...editForeignLanguage,
      score: e.target.value,
    };
    setEditForeignLanguage(newEditForeignLanguage);
    updateEditForeignLanguage(data._id, newEditForeignLanguage);
  };

  return (
    <StyledEditForeignLanguage>
      <div style={{ flex: 2 }}>
        <p>시험명:</p>
        <input
          className="edit"
          defaultValue={data.name}
          onChange={handleNameChange}
        />
      </div>
      <div style={{ flex: 1 }}>
        <p>취득일:</p>
        <input
          className="edit"
          defaultValue={data.period}
          onChange={handlePeriodChange}
        />
      </div>
      <div style={{ flex: 1 }}>
        <p>점수/만점:</p>
        <input
          className="edit"
          defaultValue={data.score}
          onChange={handleScoreChange}
        />
      </div>
      <button onClick={() => removeEditForeignLanguage(data._id)}>
        Delete
      </button>
    </StyledEditForeignLanguage>
  );
};

export default EditForeignLanguage;
