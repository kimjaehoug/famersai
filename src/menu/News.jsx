import React, { useState } from "react";
import styled from "styled-components";
import img from "../img/explore.png";
// 회사 뉴스 및 이벤트 내용
// 규정, 서엊ㄱ서 등 공지사항

const Container = styled.div`
  margin: 20px 40px 30px 40px;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 768px) {
    margin-inline: 170px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Button = styled.div`
  margin: 0 10px;
  padding: 0;
  font: bold 14px "arial";
  color: ${(props) => (props.active ? "#82a5eb" : "gray")};
  cursor: pointer;
  border-bottom: 2px solid ${(props) => (props.active ? "#82a5eb" : "transparent")};
  &:hover {
    color: ${(props) => (props.active ? "#82a5eb" : "darkgray")};
  }
`;

const ContentWrapper = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2), 0px 6px 20px rgba(0, 0, 0, 0.15);
  margin: 20px 0;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
  @media screen and (min-width: 768px) {
    width: calc(70%);
  }
`;

const Img = styled.img`
  width: calc(80%);
  height: 300px;
  margin: 20px 0 0 0;
  border-radius: 5px;
  @media screen and (min-width: 768px) {
    height: 400px;
  }
`;

const NewsTitle = styled.p`
  margin: 10px 0;
  font: bold 20px "arial";
`;

const Summary = styled.p`
  margin: 0;
  font: 500 14px "arial";
`;

const Link = styled.a`
  margin: 10px 0;
  text-decoration: none;
  font: bold 13px "arial";
  color: #82a5eb;
  border-bottom: 2px solid transparent;
  &:hover {
    border-bottom: 2px solid #82a5eb;
  }
`;

const News = () => {
  const [info, setInfo] = useState(true);

  return (
    <Container>
      <ButtonWrapper>
        <Button onClick={() => setInfo(true)} active={info}>
          뉴스
        </Button>
        <Button onClick={() => setInfo(false)} active={!info}>
          이벤트
        </Button>
      </ButtonWrapper>
      {info ? (
        <>
          <ContentWrapper>
            <Img src={img} />
            <NewsTitle>뉴스</NewsTitle>
            <Summary>뉴스 간단한 내용이 들어갈 자리입니다</Summary>
            <Link href="#">뉴스 보러가기</Link>
          </ContentWrapper>
          <ContentWrapper>
            <Img src={img} />
            <NewsTitle>뉴스</NewsTitle>
            <Summary>뉴스 간단한 내용이 들어갈 자리입니다</Summary>
            <Link href="#">뉴스 보러가기</Link>
          </ContentWrapper>
          <ContentWrapper>
            <Img src={img} />
            <NewsTitle>뉴스</NewsTitle>
            <Summary>뉴스 간단한 내용이 들어갈 자리입니다</Summary>
            <Link href="#">뉴스 보러가기</Link>
          </ContentWrapper>
        </>
      ) : (
        <>
          <ContentWrapper>
            <Img src={img} />
            <NewsTitle>이벤트</NewsTitle>
            <Summary>간단한 이벤트 내용이 들어갈 자리입니다</Summary>
            <Link href="#">자세히 보기</Link>
          </ContentWrapper>
          <ContentWrapper>
            <Img src={img} />
            <NewsTitle>이벤트</NewsTitle>
            <Summary>간단한 이벤트 내용이 들어갈 자리입니다</Summary>
            <Link href="#">자세히 보기</Link>
          </ContentWrapper>
          <ContentWrapper>
            <Img src={img} />
            <NewsTitle>이벤트</NewsTitle>
            <Summary>간단한 이벤트 내용이 들어갈 자리입니다</Summary>
            <Link href="#">자세히 보기</Link>
          </ContentWrapper>
        </>
      )}
    </Container>
  );
};

export default News;
