const Degree = ({ data }) => {
  return (
    <div>
      <p>학위 종류: {data.type}</p>
      <p>학교명: {data.institution}</p>
      <p>전공: {data.major}</p>
      <p>학점: {data.GPA}</p>
      <p>졸업여부: {data.gradStatus}</p>
      <p>졸업(예정)일: {data.gradYearMonth}</p>
    </div>
  );
};

export default Degree;
