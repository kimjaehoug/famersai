import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import { useAuth } from "../AuthContext";
import { customAxios } from "../customAxios";
import axios from "axios";
<link href="https://fonts.googleapis.com/css2?family=Cafe24+Ssurround&display=swap" rel="stylesheet"></link>

const Container = styled.div`
  padding: 2rem;
  font-family: "Pretendard", sans-serif;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CropTabs = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Title = styled.h2`
  font-family: "Cafe24 Ssurround", sans-serif;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ModeButton = styled.button`
  background-color: #e5e7eb;
  color: #333;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #d1d5db;
  }
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

const TabNav = styled.div`
  display: flex;
  gap: 1rem;
  border-bottom: 2px solid #ddd;
  margin: 1.5rem 0 1rem;
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

const otherRegions = ["강원", "서울", "경기", "세종", "충북","전남","전북"];
const otherCrops = ["감자", "고구마", "배", "사과"];
const tabs = ["요일별 평균 가격", "일일 가격 증감율", "가격 분포", "이동 평균", "예측"];

const Selling = () => {
  const { user } = useAuth();
  const userId = user()?.id;

  const [mode, setMode] = useState("owned"); // 'owned' | 'other'
  const [farms, setFarms] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(otherRegions[0]);
  const [selectedCrop, setSelectedCrop] = useState(otherCrops[0]);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (mode === "owned" && userId) {
      customAxios.get(`/farm/farms?userId=${userId}`)
        .then(res => {
          setFarms(res.data);
          if (res.data.length > 0) setSelectedFarm(res.data[0].name);
        });
    }
  }, [mode, userId]);

  useEffect(() => {
    if (mode === "owned" && selectedFarm) {
      axios.get(`/api/farm-eda?farmName=${encodeURIComponent(selectedFarm)}&tab=${encodeURIComponent(activeTab)}`)
        .then(res => setChartData(res.data));
    } else if (mode === "other") {
      axios.get(`/api/market-eda?region=${selectedRegion}&crop=${selectedCrop}&tab=${activeTab}`)
        .then(res => setChartData(res.data));
    }
  }, [mode, selectedFarm, selectedRegion, selectedCrop, activeTab]);

  return (
    <Container>
      <Title>농작물판매정보</Title>

      <TopRow>
        <CropTabs>
          {mode === "owned"
            ? farms.map((farm) => (
                <TabButton
                  key={farm.name}
                  active={selectedFarm === farm.name}
                  onClick={() => setSelectedFarm(farm.name)}
                >
                  {farm.name}
                </TabButton>
              ))
            : otherRegions.map((region) => (
                <TabButton
                  key={region}
                  active={selectedRegion === region}
                  onClick={() => setSelectedRegion(region)}
                >
                  {region}
                </TabButton>
              ))}
        </CropTabs>
        <ModeButton onClick={() => setMode(mode === "owned" ? "other" : "owned")}>
          {mode === "owned" ? "📍 타 지역/작물 보기" : "🌾 내 농장 보기"}
        </ModeButton>
      </TopRow>

      {mode === "owned" && selectedFarm && (
        <div style={{
          marginBottom: "1rem",
          background: "#f9fafb",
          padding: "1rem",
          borderRadius: "10px",
          border: "1px solid #e2e8f0"
        }}>
          {(() => {
            const info = farms.find(f => f.name === selectedFarm);
            return info ? (
              <>
                <strong>{info.name} 농장 정보</strong><br />
                지역: <strong>{info.address}</strong><br />
                작물: <strong>{info.crop}</strong>
              </>
            ) : null;
          })()}
        </div>
      )}

      {mode === "other" && (
        <CropTabs style={{ marginTop: "-0.5rem" }}>
          {otherCrops.map((crop) => (
            <TabButton
              key={crop}
              active={selectedCrop === crop}
              onClick={() => setSelectedCrop(crop)}
            >
              {crop}
            </TabButton>
          ))}
        </CropTabs>
      )}

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