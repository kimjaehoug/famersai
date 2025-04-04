import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import axios from "axios";

const Container = styled.div`
  padding: 2rem;
  font-family: "Pretendard", sans-serif;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const CropTabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const TabButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background-color: ${({ active }) => (active ? "#3b82f6" : "#f1f5f9")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
`;

const RegionSelect = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  label {
    font-size: 0.9rem;
  }
`;

const TabNav = styled.div`
  display: flex;
  gap: 1rem;
  border-bottom: 2px solid #ddd;
  margin-bottom: 1rem;
`;

const Tab = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-bottom: ${({ active }) => (active ? "3px solid #2563eb" : "none")};
  color: ${({ active }) => (active ? "#2563eb" : "#555")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
`;

const ChartWrapper = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  min-height: 300px;
`;

const crops = ["양파", "마늘", "건고추", "가을배추", "가을무"];
const regions = ["경남", "경북", "전남", "전북", "제주", "충남"];
const tabs = ["단수 추이", "증감율", "가격 분포", "이동 평균", "예측"];

const Selling = () => {
  const [selectedCrop, setSelectedCrop] = useState("양파");
  const [selectedRegions, setSelectedRegions] = useState([...regions]);
  const [activeTab, setActiveTab] = useState("단수 추이");
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/crop?crop=${selectedCrop}&regions=${selectedRegions.join(",")}`)
      .then((res) => {
        setChartData(res.data); // 데이터 예: { labels: [...], datasets: [...] }
      });
  }, [selectedCrop, selectedRegions]);

  return (
    <Container>
      <Title>농작물 생산성 예측</Title>

      <CropTabs>
        {crops.map((crop) => (
          <TabButton
            key={crop}
            active={selectedCrop === crop}
            onClick={() => setSelectedCrop(crop)}
          >
            {crop}
          </TabButton>
        ))}
      </CropTabs>

      <RegionSelect>
        {regions.map((region) => (
          <label key={region}>
            <input
              type="checkbox"
              checked={selectedRegions.includes(region)}
              onChange={() =>
                setSelectedRegions((prev) =>
                  prev.includes(region)
                    ? prev.filter((r) => r !== region)
                    : [...prev, region]
                )
              }
            />
            {region}
          </label>
        ))}
      </RegionSelect>

      <TabNav>
        {tabs.map((tab) => (
          <Tab key={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)}>
            {tab}
          </Tab>
        ))}
      </TabNav>

      <ChartWrapper>
        {chartData ? <Line data={chartData} /> : <p>데이터 로딩 중...</p>}
      </ChartWrapper>
    </Container>
  );
};

export default Selling;