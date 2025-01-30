// 회사 소개
// 슬로건 : 조이풀 세이프티(안전한 즐거움)
import styled from "styled-components";
import React from "react";
import img from "../img/about.jpg";
import safety from "../img/safety.jpg";
import joy from "../img/joyful.jpg";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 768px) {
    margin-inline: 100px;
  }
`;

const Banner = styled.div`
  width: calc(100%);
  height: 300px;
  background-image: url(${img});
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 99;
  font: bold 50px;
  color: white;
  margin: 0;
  text-align: center;
  line-height: 300px;
  @media screen and (min-width: 768px) {
    font-size: 70px;
    height: 500px;
    margin-bottom: 40px;
    line-height: 500px;
  }
  &.joyful {
    background-image: url(${joy});
  }
  &.safety {
    background-image: url(${safety});
  }
`;

const P = styled.p`
  font: 500 20px;
  margin: 20px 0;
  padding: 0;
  text-align: center;
  @media screen and (min-width: 768px) {
    font: 600 30px;
    margin-bottom: 20px;
  }
  &.sub {
    margin: 0 50px;
    padding-bottom: 30px;
    font: 400 14px;
    color: #686565;
    border-bottom: 0.5px solid #686565;
    margin-bottom: 50px;
    @media screen and (min-width: 768px) {
      width: calc(80%);
      margin: 50px 0 50px 0;
      padding-bottom: 50px;
      font-size: 17px;
    }
  }
`;

const About = () => {
  return (
    <>
      <ContentWrapper>
        <Banner>Always</Banner>
        <P>언제나 당신과 함께입니다.</P>
        <P className="sub">
          언제 어디서나 당신의 안전과 즐거움을 최우선으로 생각합니다. 모든
          순간을 안전하게, 모든 여정을 신나게!
        </P>
      </ContentWrapper>
      <ContentWrapper>
        <Banner className="joyful">Joyful</Banner>
        <P>Joyful</P>
        <P className="sub">
          안전함과 즐거움이 공존하는 라이딩 경험을 제공합니다. 최고의 성능과
          안전성으로 설계된 자전거로 일상의 즐거움을 더하세요.
        </P>
      </ContentWrapper>
      <ContentWrapper>
        <Banner className="safety">Safety</Banner>
        <P>Safety</P>
        <P className="sub">
          당신의 소중한 여정에 든든한 안전을 더합니다. 혁신적인 기술과 신뢰할 수
          있는 품질로 더욱 안심할 수 있는 라이딩을 선사합니다.
        </P>
      </ContentWrapper>
    </>
  );
};

export default About;
