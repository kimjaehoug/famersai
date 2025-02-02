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
    const newEditDegree = { ...editDegree, type: e.target.value };
    setEditDegree(newEditDegree);
    updateEditDegree(data._id, newEditDegree);
  };

  const handleInstitutionChange = (e) => {
    const newEditDegree = { ...editDegree, institution: e.target.value };
    setEditDegree(newEditDegree);
    updateEditDegree(data._id, newEditDegree);
  };

  const handleMajorChange = (e) => {
    const newEditDegree = { ...editDegree, major: e.target.value };
    setEditDegree(newEditDegree);
    updateEditDegree(data._id, newEditDegree);
  };

  const handleGPAChange = (e) => {
    const newEditDegree = { ...editDegree, GPA: e.target.value };
    setEditDegree(newEditDegree);
    updateEditDegree(data._id, newEditDegree);
  };

  const handleGradStatusChange = (e) => {
    const newEditDegree = { ...editDegree, gradStatus: e.target.value };
    setEditDegree(newEditDegree);
    updateEditDegree(data._id, newEditDegree);
  };

  const handleGradYearMonthChange = (e) => {
    const newEditDegree = { ...editDegree, gradYearMonth: e.target.value };
    setEditDegree(newEditDegree);
    updateEditDegree(data._id, newEditDegree);
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
      <button onClick={() => removeEditDegree(data._id)}>Delete</button>
    </StyledEditDegree>
  );
};

export default EditDegree;
