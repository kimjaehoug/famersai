import styled from "styled-components";
import PostElement from "../board/PostElement";
import { useEffect, useState } from "react";
import { customAxios } from "../customAxios";
import { useAuth } from "../AuthContext";
import { useSearchParams } from "react-router-dom";

const StyledAppliedJobs = styled.div`
  .boardContainer {
    margin: 20px auto;
    padding: 25px;
    max-width: 900px;
    background: ${({ theme }) => theme.colors.MAIN};
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    color: #2c2c2c;

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

    .writePostContainer {
      display: flex;
      flex-direction: colunn;
      margin-top: 20px;
      a {
        margin: 0 0 0 auto;
        border: 3px solid ${({ theme }) => theme.colors.BACK};
        background-color: ${({ theme }) => theme.colors.MAIN};
        .writePost {
          height: 30px;
          width: 120px;
          font-size: 18px;
          text-align: center;
          border-radius: 10px;
          color: ${({ theme }) => theme.colors.BACK};
          justify-content: center;
          display: flex;
          flex-direction: column;
        }
      }
    }

    .upload {
      color: white;
      text-align: center;
    }
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
`;

const AppliedJobs = () => {
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [allApplications, setAllApplications] = useState([]);
  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState();
  const { user, isCompanyUser } = useAuth();

  useEffect(() => {
    if (user()) {
      customAxios
        .get(`/jobPost/appliedJobs/${user()._id}`)
        .then((res) => {
          setAllApplications(res.data.reverse());
          setPage(1);
          setIsLoading(false);
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    setApplications(allApplications.slice((page - 1) * 10, page * 10));
  }, [page, allApplications]);

  const handlePagenation = (page) => {
    setPage(page);
  };

  return (
    <StyledAppliedJobs>
      <div className="boardContainer">
        {user() ? (
          <>
            {isLoading ? (
              <div className="upload">
                <h1>Loading...</h1>
              </div>
            ) : (
              allApplications.length === 0 && (
                <div className="upload">
                  <h1>지원 내역이 존재하지 않습니다.</h1>
                </div>
              )
            )}
            {applications.map(({ jobPost, resume }, i) => (
              <a
                key={i}
                href={`/appliedJob?id=${jobPost._id}&resume=${resume}`}
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
                {[...Array(Math.ceil(allApplications.length / 10))].map(
                  (_, i) => (
                    <div
                      key={i + 1}
                      className={`num ${page === i + 1 ? "active" : ""}`}
                      onClick={() => handlePagenation(i + 1)}
                    >
                      {i + 1}
                    </div>
                  )
                )}
              </div>
            </div>
          </>
        ) : (
          <h1 style={{ color: "white", textAlign: "center" }}>
            로그인/회원가입이 필요한 서비스입니다.
          </h1>
        )}
      </div>
    </StyledAppliedJobs>
  );
};

export default AppliedJobs;
