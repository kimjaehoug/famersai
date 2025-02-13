import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import TextTransition, { presets } from "react-text-transition";
import { useAuth } from "../AuthContext";
import seoulImg from "../img/서울.jpeg";
import gwangjuImg from "../img/광주.jpeg";
import ulsanImg from "../img/울산.jpeg";
import jeonjuImg from "../img/전주.jpeg";
import Map from "./Map";
import regulatoryZoneData from "../data/regulatoryZoneData";
import searchImg from "../img/검색바.png";
import adImg1 from "../img/광고1.png";
import adImg2 from "../img/광고2.png";

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

  .options {
    margin-top: 0;
    button {
      font-size: 25px;
      background-color: white;
      border-radius: 10px;
      margin-left: 0px;
      margin-right: 10px;
      margin-bottom: 15px;
    }
  }

  .imgContainer {
    img {
      width: 100%;
      object-fit: fill;
    }
  }
`;

const MainAnimation = styled.div`
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
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 80vw;
  max-width: 700px;
  margin: auto;
  gap: 50px;
  align-items: center;
  @media screen and (min-width: 1000px) {
    flex-direction: row;
    align-items: center;
    max-width: 1200px;
  }

  .details {
    border: 1px solid;
    max-width: 450px;

    h2,
    p {
      margin: 0;
      box-sizing: border-box;
      border: 1px solid;
      padding: 20px;
    }

    h2 {
      background: rgb(11, 0, 222);
      background: linear-gradient(
        90deg,
        rgba(16, 8, 154, 1) 0%,
        rgb(99, 198, 255) 100%
      );
    }
  }
`;

// 배경 이미지 컨테이너
const BackgroundImage = styled.div`
  width: 100%;
  height: 400px;
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
  overflow: hidden;
  @media screen and (min-width: 768px) {
    border: none;
  }

  &#cities {
    margin: 0 0 40px 0;
    background-image: url(${(props) => props.img});
    background-position: bottom;
    background-size: cover;
    -webkit-transform: translate3d(0, 0, 0);
    box-shadow: 0 -30px 30px 0 white inset;
    height: 350px;
  }

  img {
    width: 100%;
    margin: 0;
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

// UI 구성 요소 및 애니메이션 로직
const Explain = () => {
  const [inView, setInView] = useState({});
  const refs = useRef([]);
  const [index, setIndex] = useState(0);
  // const [option, setOption] = useState(0);
  // const [keyword, setKeyword] = useState();
  const { isCompanyUser } = useAuth();
  const COMPANIES = ["Kakao", "Naver", "전북은행", "국민연금공단"];
  const CITIES = ["서울특별시", "울산광역시", "전북 전주시", "광주광역시"];
  const IMAGES = [seoulImg, ulsanImg, jeonjuImg, gwangjuImg];
  const [data, setData] = useState();

  const handleLocationChange = (e) => {
    console.log(e.target.id);
    for (const data of regulatoryZoneData) {
      if (data["지역"] == e.target.id) {
        setData(data);
      }
    }
  };

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
      4000
    );
    return () => clearTimeout(intervalId);
  }, []);

  // const handleKeywordChange = (e) => {
  //   setKeyword(e.target.value);
  // };

  return (
    <ContentWrapper>
      {isCompanyUser() ? (
        <>
          {" "}
          <MainContainer id="cities">
            <BackgroundImage key={index} img={IMAGES[index]} />
            <MainAnimation
              ref={(el) => (refs.current[0] = el)}
              data-index={0}
              inView={inView[0]}
              style={{ color: "white", position: "relative", zIndex: 1 }}
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
            <div>
              <h1>특구정보조회</h1>
              <Map handleLocationChange={handleLocationChange} />
            </div>
            {data && (
              <div className="details">
                <h2>
                  <text style={{ color: "yellow", fontSize: "25px" }}>
                    {data?.["지역"]}{" "}
                  </text>
                  <text style={{ color: "white", fontSize: "20px" }}>
                    {data?.["혜택요약"]}
                  </text>
                </h2>
                <img
                  style={{ width: "100%", objectFit: "contain" }}
                  src={require(`../img/${data?.["그림"]}.png`)}
                />
                <p>
                  {data?.["혜택"].map((el) => (
                    <li key={el}>{`${el} `}</li>
                  ))}
                </p>
                <p>세부사업: {data?.["세부사업"]}</p>
              </div>
            )}
          </MapContainer>
        </>
      ) : (
        <MainContainer id="cities">
          <BackgroundImage key={index} img={IMAGES[index]} />
          <MainAnimation
            ref={(el) => (refs.current[0] = el)}
            data-index={0}
            inView={inView[0]}
            style={{ color: "white", position: "relative", zIndex: 1 }}
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
      <div className="imgContainer">
        <img src={adImg1}></img>
        <img src={adImg2}></img>
      </div>
    </ContentWrapper>
  );
};

export default Explain;
