import { useEffect, useState } from "react";
import styled from "styled-components";
import { customAxios } from "../customAxios";
import { useNavigate } from "react-router-dom";

const StyledCompanies = styled.div`
  .companiesContainer {
    border: 1px solid #e0e0e0;
    margin: 20px auto;
    padding: 25px;
    max-width: 900px;
    background: #ffffff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    color: #2c2c2c;
    font-size: 16px;
    line-height: 1.6;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    display: flex;
    flex-wrap: wrap;

    h2 {
      text-align: center;
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${({ theme }) => theme.colors.DARK};
      color: white;
      border: none;
      border-radius: 12px;
      padding: 8px 15px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      height: 40px;
      margin-top: 10px;
    }

    .company {
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
      border-radius: 12px;
      width: 200px;
    }
  }
`;

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    customAxios.get("/company").then((res) => {
      setCompanies(res.data.reverse());
      setIsLoading(false);
    });
  }, []);

  const handleViewCompany = (id) => {
    navigate(`/company?id=${id}`);
  };

  return (
    <StyledCompanies>
      <div className="companiesContainer">
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          <>
            {companies.length ? (
              <>
                {companies.map((company) => {
                  return (
                    <div key={company._id} className="company">
                      <h2>{company.name}</h2>
                      <h3 style={{ textAlign: "center" }}>
                        {company.dateOfFoundation}
                      </h3>
                      <p>{company.introduction}</p>
                      <button onClick={() => handleViewCompany(company._id)}>
                        상세 보기
                      </button>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <h2>등록된 회사가 존재하지 않습니다.</h2>
              </>
            )}
          </>
        )}
      </div>
    </StyledCompanies>
  );
};

export default Companies;
