import { useState } from "react";
import styled from "styled-components";

const StyledEditActivity = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: 30px;
  div {
    p {
      margin: 0 !important;
    }
    input,
    textarea {
      margin: 0 !important;
      font-size: 14px !important;
      padding: 10px !important;
      box-sizing: border-box !important;
    }
  }
  button {
    margin: 0 auto 0 0 !important;
  }
`;

const EditActivity = ({ data, updateEditActivity, removeEditActivity }) => {
  const [editActivity, setEditActivity] = useState(data);

  const handleNameChange = (e) => {
    const newEditActivity = { ...editActivity, name: e.target.value };
    setEditActivity(newEditActivity);
    updateEditActivity(data._id, newEditActivity);
  };

  const handlePeriodChange = (e) => {
    const newEditActivity = { ...editActivity, period: e.target.value };
    setEditActivity(newEditActivity);
    updateEditActivity(data._id, newEditActivity);
  };

  const handleDetailsChange = (e) => {
    const newEditActivity = { ...editActivity, details: e.target.value };
    setEditActivity(newEditActivity);
    updateEditActivity(data._id, newEditActivity);
  };

  return (
    <StyledEditActivity>
      <div>
        <p>활동명:</p>
        <input
          className="edit"
          defaultValue={data.name}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <p>기간:</p>
        <input
          className="edit"
          defaultValue={data.period}
          onChange={handlePeriodChange}
        />
      </div>
      <div>
        <p>설명:</p>
        <textarea
          className="edit"
          rows={8}
          defaultValue={data.details}
          onChange={handleDetailsChange}
        />
      </div>
      <button onClick={() => removeEditActivity(data._id)}>Delete</button>
    </StyledEditActivity>
  );
};

export default EditActivity;
