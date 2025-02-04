import { useEffect, useState } from "react";
import styled from "styled-components";
import { customAxios } from "../customAxios";
import { useAuth } from "../AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";

const StyledResumes = styled.div`
  .resumesContainer {
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

    .resume {
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
      border-radius: 12px;
    }

    .addResume {
      font-size: 30px;
    }
  }
`;

const Resumes = () => {
  const [resumes, setResumes] = useState([]);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [applyMode, setApplyMode] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    user() &&
      customAxios.get(`/resume/user/${user()._id}`).then((res) => {
        setResumes(res.data.reverse());
        if (searchParams.get("applyTo")) {
          setApplyMode(true);
        }
        setIsLoading(false);
      });
  }, []);

  const handleWriteResume = () => {
    navigate("/resume");
  };

  const handleViewResume = (id) => {
    navigate(`/resume?id=${id}&applyTo=${searchParams.get("applyTo")}`);
  };

  return (
    <StyledResumes>
      <div className="resumesContainer">
        {user() ? (
          <>
            {isLoading ? (
              <h2>Loading...</h2>
            ) : (
              <>
                {resumes.length ? (
                  <>
                    {resumes.map((resume) => {
                      return (
                        <div key={resume._id} className="resume">
                          <h2>{resume.title}</h2>
                          <p>{resume.motivation}</p>
                          <button onClick={() => handleViewResume(resume._id)}>
                            상세 보기
                          </button>
                          {applyMode && (
                            <button
                              onClick={() => handleViewResume(resume._id)}
                            >
                              이력서 선택
                            </button>
                          )}
                        </div>
                      );
                    })}
                    <button className="addResume" onClick={handleWriteResume}>
                      +
                    </button>
                  </>
                ) : (
                  <>
                    <h2>이력서를 생성해주세요</h2>
                    <button className="addResume" onClick={handleWriteResume}>
                      +
                    </button>
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <h2>로그인/회원가입이 필요한 서비스입니다.</h2>
        )}
      </div>
    </StyledResumes>
  );
};

export default Resumes;
