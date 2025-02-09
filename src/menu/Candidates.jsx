import { useEffect, useState } from "react";
import styled from "styled-components";
import { customAxios } from "../customAxios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const StyledCandidates = styled.div`
  .usersContainer {
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

    .candidate {
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
      border-radius: 12px;
      width: 200px;
    }
  }
`;

const Candidates = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    customAxios.get("/user").then((res) => {
      setUsers(res.data.reverse());
      setIsLoading(false);
    });
  }, []);

  const handleViewUser = (id) => {
    navigate(`/candidate?id=${id}`);
  };

  return (
    <StyledCandidates>
      <div className="usersContainer">
        {user() ? (
          <>
            {isLoading ? (
              <h2>Loading...</h2>
            ) : (
              <>
                {users.length ? (
                  <>
                    {users.map((user) => {
                      return (
                        <div key={user._id} className="candidate">
                          <h2>{user.name}</h2>
                          <p>{user.introduction}</p>
                          <button onClick={() => handleViewUser(user._id)}>
                            상세 보기
                          </button>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <h2>등록된 유저가 존재하지 않습니다.</h2>
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <h2>로그인/회원가입이 필요한 서비스입니다.</h2>
        )}
      </div>
    </StyledCandidates>
  );
};

export default Candidates;
