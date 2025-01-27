import React from "react";
import styled from "styled-components";
import img from "../img/productbanner.png";
import commingsoon from "../img/commingsoon.png";

const BannerWrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: auto;
  position: relative;
`;

const BannerImg = styled.img`
  margin: 0;
  padding: 0;
  width: calc(100%);
  height: 300px;
`;

const BannerTitle = styled.p`
  position: absolute;
  color: #ffffff;
  font: bold 25px "arial";
  top: 50%;
  left: 40%;
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 0;
  @media screen and (min-width: 768px) {
    font-size: 50px;
    left: 50%;
  }
`;
const ProductContainer = styled.div`
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

const ProductTitle = styled.div`
  font: bold 20px "arial";
  border-bottom: 2px solid black;
  margin: 30px 0;
  padding: 0;
`;

const ProductWrapper = styled.div`
  width: calc(90%);
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 0.5px solid black;
  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: auto;
    gap: 50px;
    padding-inline: 50px;
  }
`;

const Item = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`;

const ProductImg = styled.img`
  margin: 0;
  padding: 0;
  width: 100%;
  transition: transform 0.3s ease; /* 애니메이션 추가 */

  &:hover {
    transform: scale(1.1); /* hover 시 이미지 110% 확대 */
  }
`;

const ProductName = styled.p`
  margin: 20px 0 10px 0;
  padding: 0;
  font: bold 18px "arial";
`;

const ProductContent = styled.p`
  font: bold 13px "arial";
  color: #494949;
  &:hover {
    cursor: pointer;
    color: gray;
  }
`;

const Products = () => {
  return (
    <>
      <BannerWrapper>
        <BannerImg src={img} />
        <BannerTitle>당신의 여정을 응원 합니다.</BannerTitle>
      </BannerWrapper>
      <ProductContainer>
        <ProductTitle>고급형</ProductTitle>
        <ProductWrapper>
          <Item>
            <ProductImg src={img} />
            <ProductName>쿼드스타</ProductName>
            <a href="quadstar" style={{ textDecoration: "none" }}>
              <ProductContent>자세히 보기</ProductContent>
            </a>
          </Item>
          <Item>
            <ProductImg src={commingsoon} />
            <ProductName>Comming Soon!</ProductName>
            <ProductContent>자세히 보기</ProductContent>
          </Item>
        </ProductWrapper>
        <ProductTitle>보급형</ProductTitle>
        <ProductWrapper>
          <Item>
            <ProductImg src={img} />
            <ProductName>매직콰트로1</ProductName>
            <a href="quatturo1" style={{ textDecoration: "none" }}>
              <ProductContent>자세히 보기</ProductContent>
            </a>
          </Item>
          <Item>
            <ProductImg src={img} />
            <ProductName>매직콰트로2</ProductName>
            <a href="quatturo2" style={{ textDecoration: "none" }}>
              <ProductContent>자세히 보기</ProductContent>
            </a>
          </Item>
          <Item>
            <ProductImg src={commingsoon} />
            <ProductName>Comming Soon!</ProductName>
            <ProductContent>자세히 보기</ProductContent>
          </Item>
        </ProductWrapper>
      </ProductContainer>
    </>
  );
};

export default Products;
