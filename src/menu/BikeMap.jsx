import React, { useState } from "react";
import styled from "styled-components";
import MapView from "./MapView";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
`;

const Title = styled.p`
  text-align: center;
  margin: 0;
  margin-top: 50px;
  font: bold 30px "arial";
  color: #7db249;
  @media screen and (min-width: 768px) {
    font-size: 40px;
  }
`;

const Search = styled.input`
  margin: 20px 0;
  padding: 0 20px;
  width: 85%;
  max-width: 400px;
  height: 48px;
  border-radius: 12px;
  font: 16px "arial";
  border: 1px solid #ccc;
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  @media screen and (min-width: 768px) {
    width: calc(37%);
  }
  background-color: #f2f2f2;
  border: 1px solid #e0e0e0;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border 0.3s;

  &:focus {
    border: 1px solid #7db249;
    outline: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    width: calc(100%);
  }
`;

const ContentWrapper = styled.div`
  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
  }
`;

const MapViewWrapper = styled.div`
  width: 90vw;
  height: 500px;
  max-width: 600px;
  overflow: hidden;
  border: 1px solid black;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  @media screen and (min-width: 768px) {
    width: calc(40%);
    margin-right: 20px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100%);
  border-top: 0.5px solid black;
  &:last-child {
    border-bottom: 0.5px solid black;
  }
  &:hover {
    color: gray;
  }
`;

const P = styled.p`
  width: calc(80%);
  &.title {
    font: bold 17px "arial";
    margin: 10px;
    margin-left: 30px;
  }
  &.position {
    width: calc(50%);
    font: 400 13px "arial";
    margin: 10px 0;
    margin-left: 30px;
  }
  &.phone {
    font: 400 13px "arial";
    margin: 10px 0;
    margin-left: 30px;
  }
  &.page {
    margin: 0;
    font: 400 12px "arial";
    text-align: center;
    line-height: 30px;
  }
`;

const ButtonWrapper = styled.div`
  width: auto;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  margin: 0 15px;
  width: 100px;
  height: 35px;
  background: #ffffff;
  border: 1px solid #5882fa;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    cursor: pointer;
    background: #9fb3f2;
  }
  &:active {
    background-color: #9fb3f2;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

const BikeMap = () => {
  const [titles, setTitle] = useState([]);
  const [index, setIndex] = useState(0);

  const loadTitle = (titles) => {
    setTitle(titles);
  };
  return (
    <Container>
      <Title>자전거 길 찾기</Title>
      {/* <Search placeholder="찾고 싶은 지역을 입력해 주세요." /> */}
      <Wrapper>
        <MapViewWrapper>
          <MapView propFunction={loadTitle} index={index} />
        </MapViewWrapper>
        <ContentWrapper>
          {titles.map((title, index) => (
            <Content key={index}>
              <P className="title" id={index} onClick={() => setIndex(index)}>
                {title}
              </P>
            </Content>
          ))}
        </ContentWrapper>
      </Wrapper>
    </Container>
  );
};

export default BikeMap;
