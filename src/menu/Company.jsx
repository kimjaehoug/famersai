import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { customAxios } from "../customAxios";
import { useAuth } from "../AuthContext";
import PostElement from "../board/PostElement";

const StyledCompany = styled.div`
  .boardContainer {
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

    .editTitle {
      font-size: 24px;
      font-weight: bold;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 10px;
      margin-top: 10px;
      margin-left: 20px;
      width: 93%;
      margin-bottom: 20px;
      outline: none;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .editContent {
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 10px;
      margin-left: 20px;
      width: 93%;
      height: 200px;
      resize: vertical;
      font-size: 14px;
      margin-bottom: 20px;
      outline: none;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    h1 {
      font-size: 27px;
      font-weight: bold;
      color: #2c2c2c;
      margin-left: 30px;
    }

    p {
      margin: 0 30px;
      color: #6e6e6e;
    }

    #content {
      margin: 30px;
    }

    .buttonContainer {
      display: flex;
      gap: 10px;
      justify-content: right;
    }

    a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 10px;
      margin: 8px 0;
      border-radius: 10px;
      background-color: transparent;
      border: 3px solid ${({ theme }) => theme.colors.BACK};
      text-decoration: none;
      color: #2c2c2c;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease-in-out;

      &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        cursor: pointer;
      }
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${({ theme }) => theme.colors.MAIN};
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
    }

    button:hover {
      background-color: ${({ theme }) => theme.colors.SIDE};
    }

    button:active {
      background-color: ${({ theme }) => theme.colors.BACK};
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset;
    }

    .listButton {
      background-color: white;
      color: ${({ theme }) => theme.colors.MAIN};
      border: 2px solid ${({ theme }) => theme.colors.MAIN};
    }

    .listButton:hover {
      background-color: white;
      color: ${({ theme }) => theme.colors.SIDE};
      border: 2px solid ${({ theme }) => theme.colors.SIDE};
    }

    .listButton:active {
      background-color: ${({ theme }) => theme.colors.MAIN};
      color: ${({ theme }) => theme.colors.BACK};
      border: 2px solid ${({ theme }) => theme.colors.BACK};
    }

    .skillSets {
      display: flex;
      flex-direction: row;
      gap: 10px;
      width: 100%;
      flex-wrap: wrap;
      margin: 0 20px 20px 20px;
      button {
        height: 40px;
      }
    }

    .editContainer {
      display: flex;
      align-items: center;
      h1 {
        min-width: 100px;
      }
    }

    .edit {
      font-size: 24px;
      font-weight: bold;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 10px;
      margin-top: 10px;
      margin-left: 20px;
      width: 93%;
      margin-bottom: 20px;
      outline: none;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .editIntro {
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 10px;
      margin-left: 20px;
      width: 93%;
      height: 200px;
      resize: vertical;
      font-size: 14px;
      margin-bottom: 20px;
      outline: none;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .pagenation {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 30px;

      .inner {
        display: flex;
        gap: 10px;

        .num {
          width: 36px;
          height: 36px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          font-weight: bold;
          border-radius: 20%;
          background-color: ${({ theme }) => theme.colors.BACK};
          color: ${({ theme }) => theme.colors.MAIN};
          border: none;
          transition: all 0.3s ease-in-out;

          &:hover {
            background-color: #d2ff7c;
            color: white;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
          }

          &.active {
            border: 2px solid ${({ theme }) => theme.colors.BACK};
            background-color: ${({ theme }) => theme.colors.MAIN};
            color: ${({ theme }) => theme.colors.BACK};
          }
        }
      }
    }
  }
`;

const Company = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [dOfF, setDOfF] = useState();
  const [introduction, setIntroduction] = useState();
  const [jobPosts, setJobPosts] = useState([]);
  const [page, setPage] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    customAxios
      .get(`company/${searchParams.get("id")}`)
      .then((res) => {
        console.log(res);
        const data = res.data;
        setName(data.name);
        setEmail(data.email);
        setDOfF(data.dateOfFoundation);
        setIntroduction(data.introduction);
        setPage(1);
        customAxios
          .get(`jobPost/company/${searchParams.get("id")}`)
          .then((res) => {
            setJobPosts(res.data);
          });
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleBackToCompanies = () => {
    if (searchParams.get("from")) {
      navigate(`/post?id=${searchParams.get("from")}`);
    } else {
      navigate("/companies");
    }
  };

  const handlePagenation = (page) => {
    setPage(page);
  };

  return (
    <StyledCompany>
      <div className="boardContainer">
        <h1 style={{ fontSize: "50px" }}>{name}</h1>
        <h1>이메일: {email}</h1>
        <h1>설립일: {dOfF}</h1>
        <h1>{introduction}</h1>
      </div>
      <div className="boardContainer">
        <h1>채용 공고</h1>
        {isLoading ? (
          <div className="upload">
            <h1>Loading...</h1>
          </div>
        ) : (
          jobPosts?.length === 0 && (
            <div className="upload">
              <h1>현재 채용 공고가 존재하지 않습니다.</h1>
            </div>
          )
        )}
        {jobPosts?.map((jobPost, i) => (
          <a
            key={i}
            href={`/post?id=${jobPost._id}&company=${searchParams.get("id")}`}
          >
            <PostElement
              title={jobPost.title}
              jobType={jobPost.jobType}
              author={jobPost.author}
              date={jobPost.createdAt}
            />
          </a>
        ))}
        <div className="pagenation">
          <div className="inner">
            {[...Array(Math.ceil(jobPosts?.length / 10))].map((_, i) => (
              <div
                key={i + 1}
                className={`num ${page === i + 1 ? "active" : ""}`}
                onClick={() => handlePagenation(i + 1)}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
        <div className="buttonContainer">
          <button onClick={handleBackToCompanies}>뒤로 가기</button>
        </div>
      </div>
    </StyledCompany>
  );
};

export default Company;
