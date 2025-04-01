import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import TextTransition, { presets } from "react-text-transition";
import { Link } from "react-router-dom";

import seoulImg from "../img/서울.jpeg";
import gwangjuImg from "../img/광주.jpeg";
import ulsanImg from "../img/울산.jpeg";
import jeonjuImg from "../img/전주.jpeg";
import adImg1 from "../img/광고1.png";
import adImg2 from "../img/광고2.png";

const fadeInOut = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const slideIn = keyframes`
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ContentWrapper = styled.div`
  margin: 10px 0;
  padding: 0;
  overflow-x: hidden;
  @media screen and (min-width: 1000px) {
    margin: 10px auto;
  }
`;

const MainContainer = styled.div`
  position: relative;
  height: 400px;
  overflow: hidden;
`;

const BackgroundImage = styled.div`
  width: 100%;
  height: 80%;
  background-image: linear-gradient(to top, rgba(255, 255, 255, 1), transparent 20%), url(${(props) => props.img});
  background-position: center;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  animation: ${fadeInOut} 8s ease-in-out infinite;
`;

const MainAnimation = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
  color: white;
`;

const MainTitle = styled.h1`
  font-size: 40px;
  margin: 0;
`;

const MainContent = styled.p`
  font-size: 20px;
  margin: 20px 0;
  text-align: center;
`;

const GuideText = styled.p`
  text-align: center;
  font-size: 24px;
  color: #0056b3;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 20px 0 30px 0;
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 50px;
  padding: 5px;
  width: 95%;
  max-width: 1000px;
  margin: 0 auto 30px auto;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 15px 20px;
  font-size: 16px;
  border: none;
  border-radius: 50px 0 0 50px;
  outline: none;
  background-color: transparent;
`;

const SearchButton = styled.button`
  padding: 15px;
  font-size: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0 50px 50px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;

  &:hover {
    background-color: #0056b3;
  }
`;

const NewsSection = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
  span {
    color: #5a2ec6;
  }
`;

const SlideControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;

  button {
    background: #eee;
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    font-size: 18px;
    cursor: pointer;
    &:hover {
      background: #ccc;
    }
    &:disabled {
      background: #ddd;
      cursor: not-allowed;
    }
  }
`;

const NewsCardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  overflow: visible;
  animation: ${slideIn} 3s ease;
`;

const NewsCard = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  flex: 0 0 300px;
  overflow: hidden;
  text-align: center;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
  }

  p {
    padding: 16px;
    font-size: 16px;
    font-weight: 500;
    min-height: 60px;
  }
`;

const AdContainer = styled.div`
  margin-top: 40px;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const farmingNews = [
  { headline: "AI를 활용한 스마트 농업", image: seoulImg },
  { headline: "유기농법의 장점", image: gwangjuImg },
  { headline: "작물 병해충 관리", image: ulsanImg },
  { headline: "지속 가능한 농업 실천", image: jeonjuImg },
];

const dummyLocalNews = [
  { title: "키위 질 좋은 꽃가루 생산이 중요", imageUrl: "https://images.unsplash.com/photo-1607957142870-45d5ce40db4e" },
  { title: "봄철 꼭 등검은말벌 여왕벌 방제 하세요", imageUrl: "https://images.unsplash.com/photo-1526318472351-bc6f9fca0404" },
  { title: "수박, 참외 수정할 때 꿀벌 부족하면 '뒤영벌' 쓰세요", imageUrl: "https://images.unsplash.com/photo-1582281298058-0c63d736a4e3" },
  { title: "QR코드로 농약 안전지침 확인 가능", imageUrl: "https://images.unsplash.com/photo-1615396703785-06cd9d28b8a4" },
  { title: "토양 관리, 이제는 AI 분석으로!", imageUrl: "https://images.unsplash.com/photo-1605810230434-f42adfd0c49b" },
];

const Explain = () => {
  const [index, setIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [localNews, setLocalNews] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const visibleCount = 3;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % farmingNews.length);
    }, 8000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setLocalNews(dummyLocalNews);
  }, []);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setSlideIndex((prev) =>
        prev + 1 >= localNews.length - visibleCount + 1 ? 0 : prev + 1
      );
    }, 8000);
    return () => clearInterval(autoSlide);
  }, [localNews]);

  const handlePrev = () => {
    setSlideIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setSlideIndex((prev) =>
      Math.min(prev + 1, localNews.length - visibleCount)
    );
  };

  return (
    <ContentWrapper>
      <MainContainer>
        <BackgroundImage img={farmingNews[index].image} />
        <MainAnimation>
          <MainTitle>
            <TextTransition springConfig={presets.wobbly}>
              {farmingNews[index].headline}
            </TextTransition>
          </MainTitle>
          <MainContent>
            최신 농사 뉴스와 정보를 확인하세요.
            <br />
            Famers와 함께 스마트 농업을 시작해 보세요.
          </MainContent>
        </MainAnimation>
      </MainContainer>

      <GuideText>AI로 스마트 농사 정보를 확인하세요.</GuideText>

      <SearchBarContainer>
        <SearchInput
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Link to={`/chatbot?query=${searchQuery}`}>
          <SearchButton>🔍</SearchButton>
        </Link>
      </SearchBarContainer>

      <NewsSection>
        <SectionTitle>
          이달의 <span>농업기술</span>
        </SectionTitle>
        <SlideControls>
          <button onClick={handlePrev} disabled={slideIndex === 0}>◀</button>
          <button onClick={handleNext} disabled={slideIndex + visibleCount >= localNews.length}>▶</button>
        </SlideControls>

        <NewsCardContainer>
          {localNews
            .slice(slideIndex, slideIndex + visibleCount)
            .map((news, idx) => (
              <NewsCard key={idx}>
                <img src={news.imageUrl} alt={`뉴스 이미지 ${idx + 1}`} />
                <p>{news.title}</p>
              </NewsCard>
            ))}
        </NewsCardContainer>
      </NewsSection>

      <AdContainer>
        <img src={adImg1} alt="광고1" />
        <img src={adImg2} alt="광고2" />
      </AdContainer>
    </ContentWrapper>
  );
};

export default Explain;
