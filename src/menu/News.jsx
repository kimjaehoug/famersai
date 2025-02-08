import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
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
  border-bottom: 2px solid
    ${(props) => (props.active ? "#82a5eb" : "transparent")};
  &:hover {
    color: ${(props) => (props.active ? "#82a5eb" : "darkgray")};
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2), 0px 6px 20px rgba(0, 0, 0, 0.15);
  margin: 20px auto;
  transition: transform 0.3s ease;
  padding: 20px 30px;
  &:hover {
    transform: scale(1.05);
  }
  @media screen and (min-width: 1000px) {
    width: calc(70%);
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

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get(`/v1/search/news.json`, {
        headers: {
          "X-Naver-Client-Id": process.env.REACT_APP_NAVER_ID,
          "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_SECRET,
        },
        params: {
          query: "기업",
          diaply: 100,
        },
      })
      .then((res) => {
        console.log(res.data.items);
        setNews(res.data.items);
      });
  }, []);

  const replaceHTMLEntities = (str) => {
    const htmlEntities = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#039;": "'",
      "&ndash;": "-",
    };

    return str.replace(/<\/?[^>]+(>|$)/g, "").replace(/&[\w#]+;/g, (entity) => {
      return htmlEntities[entity] || entity;
    });
  };

  return (
    <Container>
      <ButtonWrapper>
        <Button active>뉴스</Button>
      </ButtonWrapper>
      {news.map((newsItem) => {
        return (
          <a
            href={newsItem.link}
            target="_blank"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <ContentWrapper key={newsItem.title}>
              <NewsTitle>{replaceHTMLEntities(newsItem.title)}</NewsTitle>
              <Summary>{replaceHTMLEntities(newsItem.description)}</Summary>
            </ContentWrapper>
          </a>
        );
      })}
    </Container>
  );
};

export default News;
