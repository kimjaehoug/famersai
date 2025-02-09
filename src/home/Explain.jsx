import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import TextTransition, { presets } from "react-text-transition";
import { Map } from "../components/Map";
import { useAuth } from "../AuthContext";

const slideIn = keyframes`
    0% {
        transform: translateX(-100%);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
`;

const slideDown = keyframes`
    0% {
        transform: translateY(-100%);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
`;

const ContentWrapper = styled.div`
  margin: 0 25px;
  padding: 0;
  overflow: hidden;
  @media screen and (min-width: 1000px) {
    max-width: 1200px;
    margin: 30px auto;
  }
`;

const MainAnimdation = styled.div`
  animation: ${({ inView }) => (inView ? slideDown : "none")} 1s ease-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const MapContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 80vw;
  max-width: 700px;
  margin: auto;
  gap: 30px;
  @media screen and (min-width: 1000px) {
    flex-direction: row;
    align-items: center;
    max-width: 1200px;
  }
  .search {
    margin: 0;
    justify-content: left;
    input {
      font-size: 30px;
    }
    .searchBar {
      display: flex;
    }
    .searchBtn {
      margin-left: 10px;
      font-size: 30px;
      background: white;
      border-radius: 10px;
      color: ${({ theme }) => theme.colors.MAIN};
      border: 3px solid ${({ theme }) => theme.colors.MAIN};
    }
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 0.5px solid #8e8d8d;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    border: none;
    margin: auto 50px;
  }
`;

const MainTitle = styled.p`
  font-size: 40px;
  margin: 0;
  padding: 0;
  margin: 60px 0 30px 0;
  @media screen and (min-width: 768px) {
    margin: 100px 0 150px 20px;
  }
`;

const MainContent = styled.p`
  font-size: 20px;
  margin-bottom: 40px;
  @media screen and (min-width: 768px) {
    margin: 0;
    padding: 0;
    margin: 30px 20px 40px 70px;
  }
`;

const SubContainer = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    border-top: 0.5px solid #8e8d8d;
    & > div:nth-child(2) {
      border-left: 0.5px solid #8e8d8d;
      border-right: 0.5px solid #8e8d8d;
    }
  }
`;

const SubWrapper = styled.div`
  animation: ${({ inView }) => (inView ? slideIn : "none")} 1s ease-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  border-bottom: 0.5px solid #8e8d8d;
  @media screen and (min-width: 768px) {
    border: none;
  }
`;

const SubTitle = styled.p`
  font: bold 22px inherit;
  color: #2b2b2b;
  margin: 40px 0 60px 0;
  padding: 0;
  @media screen and (min-width: 768px) {
    margin: 30px 40px 60px 50px;
    padding: 0;
  }
`;

const Content = styled.p`
  font: 500 13px inherit;
  margin-bottom: 40px;
  @media screen and (min-width: 768px) {
    margin: 0;
    padding: 0;
    margin: 30px 40px 40px 50px;
  }
`;

const TEXTS = ["Kakao", "Naver", "전북은행", "국민연금공단"];

const Explain = () => {
  const [inView, setInView] = useState({});
  const refs = useRef([]);
  const [index, setIndex] = useState(0);
  const [keyword, setKeyword] = useState();
  const { isCompanyUser } = useAuth();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView((prev) => ({
              ...prev,
              [entry.target.dataset.index]: true,
            }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (refs.current)
        refs.current.forEach((ref) => ref && observer.unobserve(ref));
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      2000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <ContentWrapper>
      {isCompanyUser() ? (
        <MapContainer>
          <Map />
          <div className="search">
            <h1>지역 특구 검색</h1>
            <div className="searchBar">
              <input
                type="text"
                placeholder="예) 서울 강동구"
                onChange={handleKeywordChange}
              />
              <button className="searchBtn">&#128269;</button>
            </div>
          </div>
        </MapContainer>
      ) : (
        <MainContainer>
          <MainAnimdation
            ref={(el) => (refs.current[0] = el)}
            data-index={0}
            inView={inView[0]}
          >
            <MainTitle>
              오늘의 추천 기업
              <TextTransition springConfig={presets.wobbly}>
                {TEXTS[index % TEXTS.length]}
              </TextTransition>
            </MainTitle>
            <MainContent>
              오작교는 지역 인재와 지방 이전 기업간의 매칭을 도와줍니다.
              <br></br>
              <br></br>지역 경제의 적극적인 참여자가 되거나 새로운 커리어 기회를
              찾아보세요.
            </MainContent>
          </MainAnimdation>
        </MainContainer>
      )}
      <SubContainer>
        <SubWrapper
          ref={(el) => (refs.current[1] = el)}
          data-index={1}
          inView={inView[1]}
        >
          <SubTitle>
            수월한<br></br>라이딩
          </SubTitle>
          <Content>
            스마트 AI 기능으로 매일 라이딩이 수월해집니다. ebii가 라이더의
            스타일과 선호도에 적응하여 라이더에게 최적화도니 여정을 제공합니다!
          </Content>
        </SubWrapper>
        <SubWrapper
          ref={(el) => (refs.current[2] = el)}
          data-index={2}
          inView={inView[2]}
        >
          <SubTitle>
            매끈한<br></br>디자인
          </SubTitle>
          <Content>
            단순함과 깔끔한 라인을 특징으로 하는 미니멀리즘 디자인으로 도시의
            모든 거리를 스타일리시하게 이동하실 수 있습니다.
          </Content>
        </SubWrapper>
        <SubWrapper
          ref={(el) => (refs.current[3] = el)}
          data-index={3}
          inView={inView[3]}
        >
          <SubTitle>
            걱정 없는<br></br>안전성
          </SubTitle>
          <Content>
            지인들과 모이거나, 출근을 좀 늦게 하거나, 아니면 단순히 시간을
            보내든, ebii가 라이더를 안전하고 건강하게 모십니다.
          </Content>
        </SubWrapper>
      </SubContainer>
    </ContentWrapper>
  );
};

export default Explain;
