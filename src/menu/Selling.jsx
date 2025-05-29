// EconestOverview.jsx  ─ “디자인 유지 + 실시간 요약 + 카드-클릭 그래프” 완전본
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiArrowDownRight } from "react-icons/fi";
import { customAxios } from "../customAxios";
import { useAuth } from "../AuthContext";
import axios from "axios";
import SafeLineChart from "../components/SafeLineChart";
import SafeBarChart from "../components/SafeBarChart";
import { Chart as ChartJS, LineElement, PointElement, BarElement,
         LinearScale, CategoryScale, Tooltip, Legend } from "chart.js";
ChartJS.register(LineElement, PointElement, BarElement,
                 LinearScale, CategoryScale, Tooltip, Legend);

/* ───────────── styled (기존 그대로) ───────────── */
const Layout = styled.div`display:flex;min-height:100vh;`;




const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px 30px;
  border-radius: 12px;
  width: 420px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  animation: fadeIn 0.25s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  h3 {
    font-size: 20px;
    margin-bottom: 20px;
    color: #2c3e50;
    text-align: center;
  }

  .form-group {
    margin-bottom: 15px;

    label {
      display: block;
      margin-bottom: 6px;
      font-weight: 500;
      color: #444;
    }

    input,
    textarea {
      width: 95%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 15px;
      transition: border-color 0.2s;

      &:focus {
        border-color: #28a745;
        outline: none;
      }
    }
  }

  .button-group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;

    button {
      padding: 10px 18px;
      border: none;
      border-radius: 6px;
      font-size: 15px;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .save {
      background-color: #28a745;
      color: white;

      &:hover {
        background-color: #218838;
      }
    }

    .cancel {
      background-color: #ccc;
      color: black;

      &:hover {
        background-color: #bbb;
      }
    }
  }
`;
const FarmInfoContainer = styled.div`
  flex: 1;
  padding: 20px;

  h2 {
    margin-bottom: 20px;
  }

  .farm-list {
    margin-bottom: 20px;

    .farm-item {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 12px;
  margin-bottom: 15px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f1f1f1;
    transform: translateY(-2px);
  }

  .farm-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;

    .farm-name {
      font-size: 18px;
      font-weight: bold;
      color: #2c3e50;
    }

    .farm-actions {
      display: flex;
      gap: 8px;

      button {
        font-size: 12px;
        padding: 4px 8px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.2s ease;
      }

      button:first-child {
        background-color: #3498db;
        color: #fff;
      }

      button:last-child {
        background-color: #e74c3c;
        color: #fff;
      }

      button:hover {
        opacity: 0.85;
      }
    }
  }

  .farm-info-line {
    font-size: 14px;
    color: #555;
    margin-bottom: 4px;

    span {
      font-weight: bold;
      color: #333;
    }
  }
}
  }

  .add-button {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #218838;
    }
  }
`;
const Sidebar = styled.div`
  width: 200px;
  background-color: #ffffff;
  padding: 20px;
  border-right: 1px solid #ccc;

  .tab {
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;

    &.active {
      background-color: #28a745;
      color: white;
      font-weight: bold;
    }

    &:hover {
      background-color: #ddd;
    }
  }
`;
const MenuTitle = styled.h3`margin-bottom:2rem;font-size:1.5rem;`;
/* active 여부에 따라 배경색 + 글자색 모두 변경 */
const MenuItem = styled.div`
  margin-bottom: 1.2rem;
  padding: .5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;

  background: ${p => (p.active ? '#28a745' : 'transparent')};
  color:      ${p => (p.active ? '#fff'    : '#000')};

  /* hover 시 (active 면 그대로, 아니면 회색) */
  &:hover {
    background: ${p => (p.active ? '#28a745' : '#ddd')};
  }
`;
const Container = styled.div`flex:1;padding:2rem;background:#f9fafc;font-family:'Pretendard',sans-serif;`;
const SummaryGrid = styled.div`display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;margin-bottom:2rem;`;
const SummaryCard = styled.div`background:#fff;border-radius:10px;padding:1rem;box-shadow:0 2px 8px rgba(0,0,0,.05);`;
const Title = styled.h2`font-weight: bold;font-size:2rem;font-weight:600;margin-bottom:1.5rem;`;
const ChartPlaceholder = styled.div`
  background:#e5e7eb;border:2px dashed #9ca3af;border-radius:12px;
  height:400px;display:flex;align-items:center;justify-content:center;
  font-size:1.2rem;color:#6b7280;margin-bottom:2rem;`;
const TransactionList = styled.div`background:#fff;padding:1rem;border-radius:12px;box-shadow:0 2px 6px rgba(0,0,0,.08);`;
const Table = styled.table`width:100%;border-collapse:collapse;
  th,td{padding:.75rem;border-bottom:1px solid #eee;text-align:left;font-size:.9rem;}`;
const ProfitBadge = styled.span`color:${p=>p.down?'#ef4444':'#22c55e'};font-weight:600;display:flex;align-items:center;`;
const ChartWrapper = styled.div`
  background:#fff;border:1px solid #ddd;border-radius:12px;box-shadow:0 2px 6px rgba(0,0,0,.08);
  height:400px;padding:1rem;position:relative;overflow:hidden;`;

/* 상수 */
const otherRegions=["강원","서울","경기","세종","충북","전남","전북"];
const otherCrops=["감자","고구마","배","사과"];
const periods=["7일","14일","30일","전체"];

/* ───────────── 메인 ───────────── */
export default function EconestOverview() {
  const { user } = useAuth();
  const userId = user()?.id;

  /* state */
  const [mode,setMode]=useState("owned");
  const [farms,setFarms]=useState([]);
  const [selectedFarm,setSelectedFarm]=useState(null);
  const [selectedRegion,setSelectedRegion]=useState(otherRegions[0]);
  const [selectedCrop,setSelectedCrop]=useState(otherCrops[0]);
  const [period,setPeriod]=useState("30일");
  const [activeTab,setActiveTab]=useState("평균 가격");
  const [chartData,setChartData]=useState(null);
  const [loading,setLoading]=useState(false);
  const [transactions, setTransactions] = useState([]);
  const [currentMenu, setCurrentMenu]   = useState("dashboard"); 

  const [showTxForm, setShowTxForm] = useState(false);  // 폼 열기 상태
const [newTx, setNewTx] = useState({
  date: "",
  amount: "",
  size: "",
  memo: "",
});
  // 요약 카드 값 보관
const [summary, setSummary] = useState({
  avg: null,        // 이번달 평균가
  avgDelta: null,   // 전월 대비 %
  pred: null,       // 최신 예측가
  chg: null,        // 일일 증감률 (%)
  dist: null,       // 데이터 건수
  ma: null,
});

const fetchTransactions = async (farmName) => {
    if (!farmName) return;
    try {
      const { data } = await customAxios.get("/api/gettrans", {
        params: { farmName },
      });
      setTransactions(data);                              // [{txNo,date,amount,size,memo}, …]
    } catch (err) {
      console.error("📛 거래 내역 불러오기 실패:", err);
      setTransactions([]);
    }
  };

    useEffect(() => {
    if (selectedFarm) fetchTransactions(selectedFarm);
  }, [selectedFarm]);

  /* utils */
  const regionAbbr={ "서울특별시":"서울","경기도":"경기","강원도":"강원",
    "세종특별자치시":"세종","충청북도":"충북","전라북도":"전북","전라남도":"전남" };
  const getShort=r=>Object.keys(regionAbbr).find(k=>r.startsWith(k))
      ? regionAbbr[Object.keys(regionAbbr).find(k=>r.startsWith(k))] : r.slice(0,2);
  const adapt=raw=>raw && !raw.datasets && raw.data
      ? {labels:raw.labels,datasets:[{label:"series-1",data:raw.data}]} : raw;
  const toMonthlyAverage=(labels,values)=>{
    const m={};labels.forEach((d,i)=>{const ym=d.slice(0,7);
      if(!m[ym])m[ym]={s:0,c:0};m[ym].s+=values[i];m[ym].c++;});
    const keys=Object.keys(m).sort();
    return {labels:keys,data:keys.map(k=>+(m[k].s/m[k].c).toFixed(2))};
  };

  const applyPeriod = (labels, datasets) => {
  // 버튼 ↔ 일수 매핑
  const map = { "7일": 7, "14일": 14, "30일": 30, "전체": null };
  const days = map[period];
  if (!days) return { labels, datasets };          // 전체
  return {
    labels: labels.slice(-days),
    datasets: datasets.map(ds => ({
      ...ds,
      data: ds.data.slice(-days),
    })),
  };
};

  /* farms 목록 */
  useEffect(()=>{
    if(mode==="owned"&&userId){
      customAxios.get(`/farm/farms?userId=${userId}`)
        .then(r=>{setFarms(r.data);if(r.data.length) setSelectedFarm(r.data[0].name);});
    }
  },[mode,userId]);

  /* farm → region/crop */
  useEffect(()=>{
    if(mode==="owned"&&selectedFarm){
      const f=farms.find(v=>v.name===selectedFarm);
      if(f){setSelectedRegion(getShort(f.address));setSelectedCrop(f.crop);}
    }
  },[selectedFarm,farms,mode]);

  /* 요약 fetch */
  useEffect(() => {
  const fetchSummary = async () => {
    if (!selectedRegion || !selectedCrop) return;

    try {
      // ① prediction → 일자별 가격
      const predRes = await customAxios.get("/api/prediction", {
        params: { region: selectedRegion, crop: selectedCrop },
      });
      const daily    = adapt(predRes.data);
      const prices   = daily.datasets[0].data;
      const monAvg   = toMonthlyAverage(daily.labels, prices).data;

      const latest   = monAvg.slice(-1)[0] ?? null;          // 이번달
      const prev     = monAvg.slice(-2)[0] ?? null;          // 전월
      const deltaPct = prev ? (((latest - prev) / prev) * 100).toFixed(1) : null;


      /* ―― 🔹 최빈 가격 구간 계산 ―― */
      const BIN = 50;                                 // bin 폭(단위가격)
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      const bins = Array(Math.ceil((max - min) / BIN)).fill(0);
      prices.forEach(p=>{
        const idx = Math.min(Math.floor((p - min) / BIN), bins.length-1);
        bins[idx]++;});
      const topIdx = bins.indexOf(Math.max(...bins));
      const rangeStart = min + topIdx * BIN;
      const rangeEnd   = rangeStart + BIN;
      const modeRange  = `${rangeStart}-${rangeEnd}`; // 예: "1250-1300"
      /* ② 어제 대비 % */
let deltaDay = null;
if (prices.length >= 2) {
  const todayPrice = prices.at(-1);
  const yestPrice  = prices.at(-2);
  deltaDay = ((todayPrice - yestPrice) / yestPrice * 100).toFixed(1);
}

      /* ── ② 일일 증감률 데이터 받아오기 ── */
const chgRes  = await customAxios.get("/api/daily-change", {
  params: { region: selectedRegion, crop: selectedCrop },
});
const chgData = adapt(chgRes.data);              // labels + datasets 형태로 통일
const chgArr  = chgData.datasets[0].data;        // 증감률(%) 배열

const todayChg = chgArr.at(-1) ?? null;          // 오늘 증감률
let deltaMov   = null;                           // 어제 대비 변화량(%p 또는 %)
if (chgArr.length >= 2) {
  const yestChg = chgArr.at(-2);
  /* 절대 diff(포인트) → today - yesterday  */
  deltaMov = (todayChg - yestChg).toFixed(1);

  /* 만약 상대변화(%)가 필요하다면 아래로 교체
     deltaMov = (((todayChg - yestChg) / Math.abs(yestChg)) * 100).toFixed(1);
  */
}

 /* ── 🔹 moving-average (7일 / 14일) ── */
const maRes  = await customAxios.get("/api/moving-average", {
  params: { region: selectedRegion, crop: selectedCrop },
});
const maData = adapt(maRes.data);
const ma7Arr = maData.datasets?.[0]?.data ?? [];
const ma7    = ma7Arr.at(-1) ?? null;           // 오늘 MA7
const ma7Prev= ma7Arr.at(-2) ?? null;           // 어제 MA7
const ma14   = maData.datasets?.[1]?.data?.at(-1) ?? null;

const maDelta = (ma7 !== null && ma7Prev !== null)
  ? (ma7 - ma7Prev).toFixed(1)                  // 절대 변화량 (포인트)
  : null;

const maStr = ma7 !== null
  ? `${ma7.toFixed(0)}${ma14 !== null ? ` / ${ma14.toFixed(0)}` : ""}`
  : null;

          


      setSummary({
        avg: latest,
        avgDelta: deltaPct,
        pred: prices.slice(-1)[0] ?? null,
        preddel: deltaDay,
        chg: todayChg,
        chgdel:deltaMov,
        dist: modeRange,
        ma:  maStr,
  maDelta: maDelta,
      });
    } catch (err) {
      console.error("summary error", err);
      setSummary({ avg:null, avgDelta:null, pred:null, chg:null, dist:null, ma:null });
    }
  };

  fetchSummary();
}, [selectedRegion, selectedCrop, period]);

  /* 그래프 fetch */
  const ep={"평균 가격":"/api/prediction","일일 가격 증감율":"/api/daily-change",
           "가격 분포":"/api/distribution","이동 평균":"/api/moving-average","예측":"/api/prediction"};
  useEffect(() => {
  const url = ep[activeTab];
  if (!url) return;

  setLoading(true);
  const q = `?region=${encodeURIComponent(selectedRegion)}&crop=${encodeURIComponent(selectedCrop)}`;

  axios.get(url + q)
    .then(res => {
      let out = adapt(res.data);          // ① 서버 응답 → labels/datasets

      /* ───────── 차트별 후 처리 ───────── */
      if (activeTab === "평균 가격") {
        // 월별 평균 + 기간 필터
        const m = toMonthlyAverage(out.labels, out.datasets[0].data);
        out = {
          labels: m.labels,
          datasets: [{
            label: "월별 평균",
            data: m.data,
            borderColor: "#3b82f6",
            backgroundColor: "#93c5fd",
            tension: 0.3,
          }],
        };
        out = applyPeriod(out.labels, out.datasets);   // ← ★ 기간 적용
      } else if (activeTab === "예측") {
        // 실측 + 예측 (기간 필터 포함)
        const labelsAll = out.labels;
        const dataAll   = out.datasets[0].data;

        const n =
          period === "7일"  ? 7  :
          period === "14일" ? 14 :
          period === "30일" ? 30 :
          labelsAll.length;               // 전체

        const lab = labelsAll.slice(-n);
        const dat = dataAll.slice(-n);
        const cut = Math.max(0, lab.length - 14);      // 최근 14일은 예측

        const real = dat.map((v, i) => (i <  cut ? v : null));
        const pred = dat.map((v, i) => (i >= cut ? v : null));

        out = {
          labels: lab,
          datasets: [
            {
              label: "실제 가격",
              data: real,
              borderColor: "#3b82f6",
              backgroundColor: "#93c5fd",
              tension: 0.3,
            },
            {
              label: "예측 가격",
              data: pred,
              borderColor: "#22c55e",
              backgroundColor: "#bbf7d0",
              borderDash: [5, 5],
              tension: 0.3,
            },
          ],
        };
      } else {
      out = applyPeriod(out.labels, out.datasets);      // 나머지 탭
    }

    /* 🔹 ISO 라벨(2024-09-02T15:00:00.000Z) → 2024-09-02 으로 통일 */
    if (Array.isArray(out.labels)) {
      out.labels = out.labels.map(l =>
        typeof l === "string" && l.includes("T") ? l.slice(0, 10) : l
      );
    }
      /* ─────────────────────────────────── */

      setChartData(out);
    })
    .finally(() => setLoading(false));
}, [activeTab, selectedRegion, selectedCrop, period]);
  const handleAddTransaction = async () => {
  if (!selectedFarm) {
    alert("농장을 먼저 선택해주세요.");
    return;
  }

  try {
    const payload = {
      farmName: selectedFarm, // 또는 farm의 고유 id
      ...newTx,
    };
    console.log(payload);

    await customAxios.post("/api/transactions", payload);
    fetchTransactions(selectedFarm);

    alert("거래가 성공적으로 추가되었습니다!");
    setShowTxForm(false);
    setNewTx({ product: "", date: "", amount: "", status: "Completed" });

    // TODO: 거래 내역 재조회 함수 호출 필요 시 여기에 추가
  } catch (err) {
    console.error("거래 추가 실패:", err);
    alert("거래 추가 중 오류 발생");
  }
};
  /* 카드 */
  const keyToTab={avg:"평균 가격",pred:"예측",chg:"일일 가격 증감율",dist:"가격 분포",ma:"이동 평균"};
  /* 카드 정의 */
const cards = [
  { key: "avg",  title: "평균 가격",   value: summary.avg,  delta: summary.avgDelta },
  { key: "pred", title: "예측 가격",   value: summary.pred, delta: summary.preddel },
  { key: "chg",  title: "증감률(%)",   value: summary.chg, delta: summary.chgdel},
  { key: "dist", title: "가격 분포", value: summary.dist },
  { key: "ma",   title: "이동 평균",   value: summary.ma, delta: summary.maDelta },
];

const handleDeleteTransaction = async (txNo) => {
  if (!window.confirm("정말 삭제하시겠습니까?")) return;

  try {
    await customAxios.delete("/api/transactions", {
      params: { farmName: selectedFarm, txNo },
    });
    // 삭제 후 최신 목록 다시 조회
    fetchTransactions(selectedFarm);
  } catch (err) {
    console.error("📛 거래 삭제 실패:", err);
    alert("삭제 중 오류가 발생했습니다.");
  }
};


  /* render */
  return(
    <Layout>
<Sidebar>
  <MenuTitle>농장 분석</MenuTitle>

  {/* 대시보드 */}
  <MenuItem
    active={currentMenu === "dashboard"}
    onClick={() => {
      setCurrentMenu("dashboard");
      setSelectedFarm(null);        // 리스트로 돌아가기
      setActiveTab("평균 가격");
    }}
  >
    대시보드
  </MenuItem>

  {/* 전체 가격 분석 */}
  <MenuItem
    active={currentMenu === "analysis"}
    onClick={() => setCurrentMenu("analysis")}
  >
    전체 가격 분석
  </MenuItem>

  {/* 거래 내역 */}
  <MenuItem
    active={currentMenu === "transactions"}
    onClick={() => setCurrentMenu("transactions")}
  >
    거래 내역
  </MenuItem>

  {/* 설정 */}
  <MenuItem
    active={currentMenu === "settings"}
    onClick={() => setCurrentMenu("settings")}
  >
    설정
  </MenuItem>
</Sidebar>

      <Container>
        {!selectedFarm?(
          <FarmInfoContainer>
  <h2>농장 정보</h2>

  {/* 농장 카드 리스트 */}
  <div className="farm-list">
    {farms.length > 0 ? (
      farms.map((farm) => (
        <div
          key={farm.name}
          className="farm-item"
          onClick={() => {setSelectedFarm(farm.name);
  setChartData(null);
  setActiveTab("평균 가격");}}   // 카드 전체 클릭
        >
          <div className="farm-header">
            <div className="farm-name">{farm.name}</div>
          </div>

          <div className="farm-info-line">
            📍 <span>주소:</span> {farm.address}
          </div>
          <div className="farm-info-line">
            🌱 <span>작물:</span> {farm.crop}
          </div>
          <div className="farm-info-line">
            📐 <span>규모:</span> {farm.size}
          </div>
          <div className="farm-info-line">
            🛠 <span>방식:</span> {farm.method}
          </div>
        </div>
      ))
    ) : (
      <p>등록된 농장이 없습니다.</p>
    )}
  </div>

  {/* ✦  새 농장 추가 모달을 계속 쓰고 싶다면 아래 두 줄과 showAddFarm 모달을 유지 */}
  {/* <button className="add-button" onClick={() => setShowAddModal(true)}>+ 새 농장 추가</button>
  {showAddModal && <AddFarmModal onClose={()=>setShowAddModal(false)} />} */}
</FarmInfoContainer>
        ):(
          <>
            <Title>{selectedFarm} 대시보드</Title>

            {/* 기간 버튼 */}
            <div style={{display:"flex",gap:"1rem",flexWrap:"wrap",marginBottom:"1rem"}}>
              {periods.map(p=>(
                <button key={p} style={{
                  padding:".4rem 1rem",border:"none",borderRadius:"8px",cursor:"pointer",
                  background:p===period?"#28a745":"#f1f5f9",color:p===period?"#fff":"#333"}}
                  onClick={()=>setPeriod(p)}>{p}</button>
              ))}
            </div>

            {/* Summary 카드 */}
<SummaryGrid style={{ gridTemplateColumns: "repeat(5,1fr)" }}>
  {cards.map(c => (
    <SummaryCard
      key={c.key}
      onClick={() => setActiveTab(keyToTab[c.key])}
      style={{
        cursor: "pointer",
        outline: keyToTab[c.key] === activeTab ? "3px solid #28a745" : "none",
      }}
    >
      <h3>{c.title}</h3>
      <h2>
  {c.value == null
    ? "-"                              // 값이 없으면 대시
    : c.key === "chg"                  // 증감률(%) 카드 → "12.3%"
      ? `${c.value}%`
      : typeof c.value === "number"    // 그 외 숫자 카드 → "$12,345"
        ? `${Number(c.value).toLocaleString()+"원"}`
        : c.value}                
</h2>

      {/* 전월 대비 ▲▼ 표시 */}
      {c.delta && (
        <ProfitBadge down={Number(c.delta) < 0}>
          {Number(c.delta) < 0 ? (
            <FiArrowDownRight />
          ) : (
            <FiArrowDownRight style={{ transform: "scaleY(-1)" }} />
          )}
          &nbsp;{Math.abs(c.delta)}%
        </ProfitBadge>
      )}
    </SummaryCard>
  ))}
</SummaryGrid>

            {/* 차트 */}
            {loading && <ChartPlaceholder>⏳ 로딩 중…</ChartPlaceholder>}
            {!loading && chartData && (
              <ChartWrapper>
                {activeTab==="가격 분포"
                  ? <SafeBarChart data={chartData} options={{responsive:true,maintainAspectRatio:false}} />
                  : <SafeLineChart data={chartData} options={{responsive:true,maintainAspectRatio:false}} />}
              </ChartWrapper>
            )}
            {!loading && !chartData && (
              <ChartPlaceholder>📈 카드/기간을 선택하세요.</ChartPlaceholder>
            )}

            {/* 거래내역 (더미) */}
                <TransactionList>
  <h4>거래 내역</h4>
  <Table>
    <thead>
      <tr>
        <th>거래 번호</th>
        <th>날짜</th>
        <th>판매 가격(100g)</th>
        <th>판매 수량</th>
        <th>총 중량(kg)</th>
        <th>총 가격</th>
        <th>메모</th>
        <th />               {/* 🔥 Action 컬럼 */} 
      </tr>
    </thead>

    <tbody>
      {transactions.length ? (
        transactions.map((tx) => (
          <tr key={tx.txNo}>
            <td>{tx.txNo}</td>
            <td>{tx.date}</td>
            <td>{Number(tx.amount).toLocaleString()+"원"}</td>
            <td>{tx.size}</td>
            <td>{(tx.size* 100)/1000}</td>
            <td>{(tx.size * tx.amount)}</td>
            <td>{tx.memo}</td>

            {/* 🔥 삭제 버튼 */}
            <td>
              <button
                style={{
                  padding: "4px 8px",
                  background: "#e74c3c",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() => handleDeleteTransaction(tx.txNo)}
              >
                삭제
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={6} style={{ textAlign: "center", padding: "1rem" }}>
            거래 내역이 없습니다.
          </td>
        </tr>
      )}
    </tbody>
  </Table>
</TransactionList>

            {/* 거래내역 추가 버튼 */}
      <button
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
        onClick={() => setShowTxForm(true)}
      >
        + 거래 내역 추가
      </button>

{/* 거래 입력 폼 */}
{showTxForm && (
        <ModalOverlay>
          <ModalContent>
            <h3>📥 거래 내역 추가</h3>

            <div className="form-group">
              <label>거래 날짜</label>
              <input
                type="date"
                value={newTx.date}
                onChange={(e) => setNewTx({ ...newTx, date: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>100g 당 금액 (원)</label>
              <input
                type="number"
                value={newTx.amount}
                onChange={(e) =>
                  setNewTx({ ...newTx, amount: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>수량 (100g 갯수)</label>
              <input
                type="number"
                value={newTx.size}
                onChange={(e) =>
                  setNewTx({ ...newTx, size: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>메모</label>
              <textarea
                rows={3}
                value={newTx.memo}
                onChange={(e) =>
                  setNewTx({ ...newTx, memo: e.target.value })
                }
                placeholder="예: 거래 완료, 반품 처리 등"
              />
            </div>

            

            <div className="button-group">
              <button className="cancel" onClick={() => setShowTxForm(false)}>
                취소
              </button>
              <button className="save" onClick={handleAddTransaction}>
                저장
              </button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
          </>
        )}
      </Container>
    </Layout>
  );
}