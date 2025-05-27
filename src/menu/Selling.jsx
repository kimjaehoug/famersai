// ✅ Chart.js 컴포넌트 안전 적용 버전 with 날짜 필터 + 가격 분포 히스토그램 + 예측 색상 분리 (최근 14일 + 기간 필터 유지)
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../AuthContext";
import { customAxios } from "../customAxios";
import axios from "axios";
import SafeLineChart from "../components/SafeLineChart";
import SafeBarChart from "../components/SafeBarChart";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  LineElement,
  PointElement,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

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
  position: relative;
`;

const otherRegions = ["강원", "서울", "경기", "세종", "충북", "전남", "전북"];
const otherCrops = ["감자", "고구마", "배", "사과"];
const tabs = [ "일일 가격 증감율", "가격 분포", "이동 평균", "예측"];
const periods = ["7일", "14일", "30일", "전체"];

const Selling = () => {
  const { user } = useAuth();
  const userId = user()?.id;
  const [mode, setMode] = useState("owned");
  const [farms, setFarms] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(otherRegions[0]);
  const [selectedCrop, setSelectedCrop] = useState(otherCrops[0]);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [chartData, setChartData] = useState(null);
  const [period, setPeriod] = useState("30일");

  // 전체 → 약칭 지역명 매핑
const regionAbbreviationMap = {
  "서울특별시": "서울",
  "경기도": "경기",
  "강원도": "강원",
  "세종특별자치시": "세종",
  "충청북도": "충북",
  "전라북도": "전북",
  "전라남도": "전남",
  // 필요 시 추가
};

  useEffect(() => {
    if (mode === "owned" && userId) {
      customAxios.get(`/farm/farms?userId=${userId}`).then((res) => {
        setFarms(res.data);
        if (res.data.length > 0) setSelectedFarm(res.data[0].name);
      });
    }
  }, [mode, userId]);

  useEffect(() => {
  if (mode === "owned" && selectedFarm && farms.length > 0) {
    const selected = farms.find((farm) => farm.name === selectedFarm);
    if (selected) {
      const fullRegion = selected.address;
      const regionShort = regionAbbreviationMap[fullRegion] || fullRegion;
      setSelectedRegion(regionShort);         // 예: "전라북도" → "전북"
      setSelectedCrop(selected.crop);         // 예: "감자"
    }
  }
}, [selectedFarm, farms, mode]);

  const tabToEndpoint = {
    "일일 가격 증감율": "/api/daily-change",
    "가격 분포": "/api/distribution",
    "이동 평균": "/api/moving-average",
    "예측": "/api/prediction",
  };

  const filterByPeriod = (labels, datasets) => {
    let days = 30;
    if (period === "14일") days = 14;
    else if (period === "7일") days = 7;
    else if (period === "전체") return { labels, datasets };
    return {
      labels: labels.slice(-days),
      datasets: datasets.map((ds) => ({ ...ds, data: ds.data.slice(-days) })),
    };
  };

  useEffect(() => {
    const baseUrl = tabToEndpoint[activeTab];
    if (!baseUrl) return;

    const params =
  mode === "owned"
    ? `?region=${encodeURIComponent(selectedRegion)}&crop=${encodeURIComponent(selectedCrop)}`
    : `?region=${encodeURIComponent(selectedRegion)}&crop=${encodeURIComponent(selectedCrop)}`;

    const fullUrl = `${baseUrl}${params}`;

    axios.get(fullUrl).then((res) => {
      let formatted = res.data;
      const isDate = (val) => !isNaN(new Date(val).getTime());

      if (activeTab !== "가격 분포" && formatted.labels && isDate(formatted.labels[0])) {
        formatted.labels = formatted.labels.map((dateStr) =>
          new Date(dateStr).toISOString().split("T")[0]
        );
      }

      if (activeTab === "예측" && res.data.datasets?.[0]?.data?.length > 0) {
  const baseDataset = res.data.datasets[0];
  const allLabels = res.data.labels.map((d) =>
    new Date(d).toISOString().split("T")[0]
  );
  const allData = baseDataset.data;

  // ✅ 필터링 대상 범위 결정
  let days = 30;
  if (period === "14일") days = 14;
  else if (period === "7일") days = 7;
  else if (period === "전체") days = allLabels.length;

  const filteredLabels = allLabels.slice(-days);
  const filteredData = allData.slice(-days);

  // ✅ 최근 14일 분리 기준
  const predictionStartIndex = Math.max(0, filteredLabels.length - 14);

  // ✅ 실측 + 예측 분리
  const realData = filteredData.map((v, idx) =>
    idx < predictionStartIndex ? v : null
  );
  const predictData = filteredData.map((v, idx) =>
    idx >= predictionStartIndex ? v : null
  );

  formatted = {
    labels: filteredLabels,
    datasets: [
      {
        label: "실제 가격",
        data: realData,
        borderColor: "#3b82f6",
        backgroundColor: "#93c5fd",
        tension: 0.4,
      },
      {
        label: "예측 가격 (최근 14일)",
        data: predictData,
        borderColor: "#22c55e",
        backgroundColor: "#bbf7d0",
        borderDash: [5, 5],
        tension: 0.4,
      },
    ],
  };
} else if (activeTab !== "가격 분포") {
        formatted = filterByPeriod(formatted.labels, formatted.datasets);
      }

      setChartData(formatted);
    });
  }, [activeTab, selectedRegion, selectedCrop, selectedFarm, mode, period]);

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

      {mode === "other" && (
        <CropTabs>
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

      <CropTabs style={{ marginTop: "1rem" }}>
        {periods.map((p) => (
          <TabButton key={p} active={period === p} onClick={() => setPeriod(p)}>
            {p}
          </TabButton>
        ))}
      </CropTabs>

      <TabNav>
        {tabs.map((tab) => (
          <Tab key={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)}>
            {tab}
          </Tab>
        ))}
      </TabNav>

      <ChartWrapper style={{ height: "400px", position: "relative" }}>
        {chartData ? (
          activeTab === "가격 분포" ? (
            <SafeBarChart
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: true },
                },
                scales: {
                  x: {
                    title: { display: true, text: "가격 구간" },
                  },
                  y: {
                    title: { display: true, text: "Count" },
                    beginAtZero: true,
                  },
                },
              }}
            />
          ) : (
            <SafeLineChart
              data={chartData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          )
        ) : (
          <p>데이터 로딩 중...</p>
        )}
      </ChartWrapper>
    </Container>
  );
};

export default Selling;