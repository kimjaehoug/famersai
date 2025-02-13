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

const fadeOut = keyframes`
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
  `;

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
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

const MapContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 80vw;
  max-width: 700px;
  margin: auto;
  gap: 30px;
  align-items: center;
  @media screen and (min-width: 1000px) {
    flex-direction: row;
    align-items: center;
    max-width: 1200px;
  }

  .details {
    border: 1px solid;

    h2,
    p {
      margin: 0;
      box-sizing: border-box;
      border: 1px solid;
      padding: 20px;
    }

    h2 {
      background: rgb(16, 8, 154);
      background: linear-gradient(
        90deg,
        rgba(16, 8, 154, 1) 0%,
        rgba(114, 9, 121, 1) 58%,
        rgba(164, 12, 148, 1) 100%
      );
    }
  }
`;

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
    height: 400px;
    margin: 0 0 40px 0;
    background-image: url(${(props) => props.img});
    background-position: center;
    background-size: cover;
    -webkit-transform: translate3d(0, 0, 0);
    box-shadow: 0 -30px 30px 0 white inset;
  }
`;

const MainTitle = styled.p`
  font-size: 40px;
  margin: 60px auto 30px;
  @media screen and (min-width: 768px) {
    margin: auto;
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
      2000 // every 3 seconds
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
          <MainContainer id="cities" img={IMAGES[index]}>
            <MainAnimation
              ref={(el) => (refs.current[0] = el)}
              data-index={0}
              inView={inView[0]}
              style={{ color: "white" }}
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
              <h1>규제자유특구</h1>
              <Map handleLocationChange={handleLocationChange} />
            </div>
            {data && (
              <div className="details">
                <h2>
                  <text style={{ color: "yellow" }}>{data?.["지역"]} </text>
                  <text style={{ color: "white" }}>{data?.["혜택요약"]}</text>
                </h2>
                <p>그림이름: {data?.["그림"]}</p>
                {data?.["혜택"].map((el) => (
                  <text>{`${el} `}</text>
                ))}
                <p>세부사업: {data?.["세부사업"]}</p>
              </div>
            )}
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
