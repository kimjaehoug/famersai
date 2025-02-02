const ForeignLanguage = ({ data }) => {
  return (
    <div>
      <p>시험명: {data.name}</p>
      <p>취득일: {data.period}</p>
      <p>점수: {data.details}</p>
    </div>
  );
};

export default ForeignLanguage;
