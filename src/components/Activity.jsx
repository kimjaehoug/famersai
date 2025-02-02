const Activity = ({ data }) => {
  return (
    <div>
      <p>활동명: {data.name}</p>
      <p>기간: {data.period}</p>
      <p>설명: {data.details}</p>
    </div>
  );
};

export default Activity;
