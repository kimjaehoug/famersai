import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import TextTransition, { presets } from "react-text-transition";
import { Map } from "../components/Map";
import { useAuth } from "../AuthContext";
import seoulImg from "../img/서울.jpeg";
import gwangjuImg from "../img/광주.jpeg";
import ulsanImg from "../img/울산.jpeg";
import jeonjuImg from "../img/전주.jpeg";

// 페이드인 페이드아웃 애니메이션 (백그라운드 이미지)
const fadeInOut = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

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
  margin: 30px 0;
  padding: 0;
  overflow: hidden;
  @media screen and (min-width: 1000px) {
    margin: 30px auto;
  }
`;

const MainAnimation = styled.div`
  animation: ${({ inView }) => (inView ? slideDown : "none")} 1s ease-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  align-items: center;
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

// 지도 및 검색 창 컨테이너
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

// 배경 이미지 컨테이너
const BackgroundImage = styled.div`
  width: 100%;
  height: 700px;
  background-image: url(${(props) => props.img});
  background-position: center;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  animation: ${fadeInOut} 4s ease-in-out;
`;

// 주요 정보 컨테이너
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 0.5px solid #8e8d8d;
  margin: auto;
  padding: 0 50px;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    border: none;
  }

  &#cities {
    height: 700px;
    margin: 0 0 40px 0;
    background-image: url(${(props) => props.img});
    background-position: center;
    background-size: cover;
    -webkit-transform: translate3d(0, 0, 0);
  }
`;

// 추천 기업 및 지역 특구 타이틀
const MainTitle = styled.p`
  font-size: 40px;
  margin: 60px auto 30px;
  @media screen and (min-width: 768px) {
    margin: auto;
  }
`;


// 메인 컨텐츠 설명
const MainContent = styled.p`
  font-size: 20px;
  margin-bottom: 40px;
  @media screen and (min-width: 768px) {
    margin: 0;
    padding: 0;
    margin: 30px 20px 40px 70px;
  }
`;

// 서브 컨텐츠 컨테이너
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

// 서브 컨텐츠 애니메이션
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

//서브 컨텐츠 설명
const Content = styled.p`
  font: 500 13px inherit;
  margin-bottom: 40px;
  @media screen and (min-width: 768px) {
    margin: 0;
    padding: 0;
    margin: 30px 40px 40px 50px;
  }
`;

// UI 구성 요소 및 애니메이션 로직
const Explain = () => {
  const [inView, setInView] = useState({});
  const refs = useRef([]);
  const [index, setIndex] = useState(0);
  const [keyword, setKeyword] = useState();
  const { isCompanyUser } = useAuth();
  const COMPANIES = ["Kakao", "Naver", "전북은행", "국민연금공단"];
  const CITIES = ["서울특별시", "울산광역시", "전북 전주시", "광주광역시"];
  const IMAGES = [seoulImg, ulsanImg, jeonjuImg, gwangjuImg];

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
      () => setIndex((index) => (index + 1) % COMPANIES.length),
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
        <>
          {" "}
          <MainContainer id="cities">
            <BackgroundImage key={index} img={IMAGES[index]}/>
            <MainAnimation
              ref={(el) => (refs.current[0] = el)}
              data-index={0}
              inView={inView[0]}
              style={{ color: "white", position: "relative", zIndex: 1}}
            >
              <MainTitle>
                오늘의 추천 특구
                <TextTransition springConfig={presets.wobbly}>
                  {CITIES[index]}
                </TextTransition>
              </MainTitle>
              <MainContent>
                오작교는 지역 인재와 지방 이전 기업간의 매칭을 도와줍니다.
                <br></br>
                <br></br>지역 경제의 적극적인 참여자가 되거나 새로운 커리어
                기회를 찾아보세요.
              </MainContent>
            </MainAnimation>
          </MainContainer>
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
        </>
      ) : (
        <MainContainer>
          <MainAnimation
            ref={(el) => (refs.current[0] = el)}
            data-index={0}
            inView={inView[0]}
          >
            <MainTitle>
              오늘의 추천 기업
              <TextTransition springConfig={presets.wobbly}>
                {COMPANIES[index]}
              </TextTransition>
            </MainTitle>
            <MainContent>
              오작교는 지역 인재와 지방 이전 기업간의 매칭을 도와줍니다.
              <br></br>
              <br></br>지역 경제의 적극적인 참여자가 되거나 새로운 커리어 기회를
              찾아보세요.
            </MainContent>
          </MainAnimation>
        </MainContainer>
      )}
     
    </ContentWrapper>
  );
};

export default Explain;
