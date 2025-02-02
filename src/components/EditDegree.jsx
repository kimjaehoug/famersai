import { useState } from "react";
import styled from "styled-components";

const StyledEditDegree = styled.div`
  display: flex;
  flex-wrap: wrap;
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

const EditDegree = ({ data, updateEditDegree, removeEditDegree }) => {
  const [editDegree, setEditDegree] = useState(data);

  const handleTypeChange = (e) => {
    setEditDegree({ ...editDegree, type: e.target.value });
    updateEditDegree(data.id, editDegree);
  };

  const handleInstitutionChange = (e) => {
    setEditDegree({ ...editDegree, institution: e.target.value });
    updateEditDegree(data.id, editDegree);
  };

  const handleMajorChange = (e) => {
    setEditDegree({ ...editDegree, major: e.target.value });
    updateEditDegree(data.id, editDegree);
  };

  const handleGPAChange = (e) => {
    setEditDegree({ ...editDegree, GPA: e.target.value });
    updateEditDegree(data.id, editDegree);
  };

  const handleGradStatusChange = (e) => {
    setEditDegree({ ...editDegree, gradStatus: e.target.value });
    updateEditDegree(data.id, editDegree);
  };

  const handleGradYearMonthChange = (e) => {
    setEditDegree({ ...editDegree, gradYearMonth: e.target.value });
    updateEditDegree(data.id, editDegree);
  };

  return (
    <StyledEditDegree>
      <div style={{ width: "70px" }}>
        <p>학위 종류:</p>
        <input
          className="edit"
          defaultValue={data.type}
          onChange={handleTypeChange}
        />
      </div>
      <div style={{ minWidth: "40px" }}>
        <p>학교명:</p>
        <input
          className="edit"
          defaultValue={data.institution}
          onChange={handleInstitutionChange}
        />
      </div>
      <div style={{ minWidth: "40px" }}>
        <p>전공:</p>
        <input
          className="edit"
          defaultValue={data.major}
          onChange={handleMajorChange}
        />
      </div>
      <div style={{ width: "80px" }}>
        <p>학점/만점:</p>
        <input
          className="edit"
          defaultValue={data.GPA}
          onChange={handleGPAChange}
        />
      </div>
      <div style={{ width: "40px" }}>
        <p>학년:</p>
        <input
          className="edit"
          defaultValue={data.gradStatus}
          onChange={handleGradStatusChange}
        />
      </div>
      <div style={{ width: "90px" }}>
        <p>졸업(예정)일:</p>
        <input
          className="edit"
          defaultValue={data.gradYearMonth}
          onChange={handleGradYearMonthChange}
        />
      </div>
      <button onClick={() => removeEditDegree(data.id)}>Delete</button>
    </StyledEditDegree>
  );
};

export default EditDegree;
