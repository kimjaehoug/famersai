const EditActivity = ({ data }) => {
  return (
    <div>
      <h2>
        활동명:
        <input className="edit" defaultValue={data.name} onChange={null} />
      </h2>
      <p>
        기간:
        <input className="edit" defaultValue={data.period} onChange={null} />
      </p>
      <p>
        설명:
        <input className="edit" defaultValue={data.details} onChange={null} />
      </p>
    </div>
  );
};

export default EditActivity;
