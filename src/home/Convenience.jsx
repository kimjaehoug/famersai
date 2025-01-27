import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import img1 from "../img/mood.png";

const growShrink = keyframes`
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
`;

const slideUp = keyframes`
    0% {
        transform: translateY(30%);
        opacity: 0;
    }
    100% {
        transform: translateY(0%);
        opacity: 1;
    }
`;

const MainImgWrapper = styled.div`
  width: 100%;
  height: 500px;
  overflow-y: hidden;
  margin: 30px 0 0 0;
  padding: 0;
  position: relative;
  animation: ${({ inView }) => (inView ? growShrink : "none")} 1s ease-out;
  @media screen and (min-width: 768px) {
    margin-top: 100px;
    height: 700px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MainImgContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font: bold 25px "arial";
  text-align: center;
  margin: 0;
  padding: 0;
  @media screen and (min-width: 768px) {
    font-size: 50px;
  }
`;

const MainWrapper = styled.div`
  width: 100%;
  height: 200px;
  background: #252525;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainTitle = styled.p`
  width: calc(85%);
  font: bold 35px "arial";
  color: white;
  border-bottom: 1px solid white;
  padding: 0;
  margin: 40px 0 0 0;
  padding-bottom: 10px;
  @media screen and (min-width: 768px) {
    width: calc(70%);
  }
`;

const MainContent = styled.p`
  width: calc(85%);
  font: 600 12px "arial";
  color: white;
  margin: 0;
  padding: 0;
  padding-top: 15px;
  @media screen and (min-width: 768px) {
    width: calc(70%);
  }
`;

const SubContainer = styled.div`
  margin: 0 25px;
  padding: 0;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 768px) {
    margin: 0 170px;
  }
`;

const SubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  margin: 20px 0;
  padding: 0;
  animation: ${({ inView }) => (inView ? slideUp : "none")} 1s ease-out;
  @media screen and (min-width: 768px) {
    margin: 20px 10px;
  }
`;

const SubWrapper2 = styled.div`
  margin: 0;
  padding: 0;
  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const SubWrapper3 = styled.div`
  padding: 0;
  margin: 0;
  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: row;
  }
`;

const SubTitle = styled.p`
  color: black;
  font: bold 20px "arial";
  margin: 10px 20px;
  padding: 0;
`;

const SubContent = styled.p`
  color: black;
  font: 500 13px "arial";
  margin: 10px 20px;
  padding: 0;
`;

const SubImg = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const Convenience = () => {
  const [inView, setInView] = useState({});
  const refs = useRef([]);

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
      const currRef = refs.current;
      if (currRef) currRef.forEach((ref) => ref && observer.unobserve(ref));
    };
  }, []);

  return (
    <>
      <MainImgWrapper
        ref={(el) => (refs.current[0] = el)}
        data-index={0}
        inView={inView[0]}
      >
        <Img src={img1} />
        <MainImgContent>세상을 탐험하는 방식을 바꿔보세요.</MainImgContent>
      </MainImgWrapper>
      <MainWrapper>
        <MainTitle>편의성이 열쇠입니다</MainTitle>
        <MainContent>
          일상적인 출퇴근을 용이하게 하고자, 편의성을 염두에 두고 ebii를
          설계했습니다. 펑크 방지 타이어, 자동 잠금 시스템, 고속 충전 배터리 등,
          ebii가 생활 편의성을 높여 줍니다.
        </MainContent>
      </MainWrapper>
      <SubContainer>
        <SubWrapper3>
          <SubWrapper2>
            <SubWrapper
              ref={(el) => (refs.current[1] = el)}
              data-index={1}
              inView={inView[1]}
            >
              <SubTitle>펑크가 날 일이 없습니다</SubTitle>
              <SubContent>컨텐츠.</SubContent>
              <SubImg src={img1} />
            </SubWrapper>
            <SubWrapper
              ref={(el) => (refs.current[2] = el)}
              data-index={2}
              inView={inView[2]}
            >
              <SubTitle>고속 충전.</SubTitle>
              <SubContent>
                바쁜 낮이나 밤에 2.5시간을 할애하여 ebii를 충전하면, 거의 또는
                전혀 시간을 들일 필요 없이 100%로 충전됩니다. 이동 중에도 유지
                됩니다!
              </SubContent>
              <SubImg src={img1} />
            </SubWrapper>
          </SubWrapper2>
          <SubWrapper
            ref={(el) => (refs.current[3] = el)}
            data-index={3}
            inView={inView[3]}
          >
            <SubTitle>자동 잠금 해제</SubTitle>
            <SubContent>
              늘 이동할 준비가 되어 있습니다. ebii의 무선 Bluetooth 연결은
              라이더가 자전거를 떠날 때 자동으로 잠그고 가까이 있을 때 다시
              잠금을 해제합니다.
            </SubContent>
            <SubImg src={img1} />
          </SubWrapper>
        </SubWrapper3>
        <SubWrapper
          ref={(el) => (refs.current[4] = el)}
          data-index={4}
          inView={inView[4]}
        >
          <SubTitle>전원 공유.</SubTitle>
          <SubContent>
            탈착식 배터리로 가정에서 편하게 충전할 수 있을 뿐 아니라, 휴대폰 및
            노트북에 휴대용 충전기로도 쓰입니다. 전원을 공유하세요!.
          </SubContent>
          <SubImg src={img1} />
        </SubWrapper>
      </SubContainer>
    </>
  );
};

export default Convenience;
