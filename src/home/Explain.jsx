// EmploymentHome.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiLogIn, FiChevronRight } from "react-icons/fi";
import eventimg from "../img/bbbbbb.png";
import {useAuth} from "../AuthContext";
import {customAxios} from "../customAxios";
import searchBg from "../img/image.png";
import {
  MdOutlineWork,
  MdOutlineComputer,
  MdOutlineAttachMoney,
  MdOutlineInfo,
} from "react-icons/md";

import { FiDollarSign } from "react-icons/fi";




/* ───────── 이용가이드 전용 스타일 ───────── */
import {
  FiUser,           // 아이콘용
  FiClipboard,
  FiSettings,
  FiTrendingUp,
} from "react-icons/fi";


// ――― 상단 팔레트 밑에 추가 ―――
const CONTENT_MAX = "1200px";

/* ───── 컬러 팔레트 ───── */
const green = "#38b24c";
const grayBg = "#f7f9fb";
const border = "#e0e0e0";
const white = '#ffffff';

/* ───── 공통 래퍼 ───── */
const Wrapper = styled.div`
  font-family: "Pretendard", sans-serif;
  color: #222;
`;

/* ====== SectionHeader 등 공통 스타일 ====== */
const SectionHeader = styled.div`
  max-width: ${CONTENT_MAX};
  margin: 0 auto 24px;
  text-align: left;
  h2 {
    font-size: 24px;
    font-weight: 700;
    margin: 0;
  }
  p {
    margin: 6px 0 0;
    font-size: 14px;
    color: #555;
    line-height: 1.5;
  }
`;

/* ① 래퍼 */
const GuideWrap = styled.section`
  padding: 64px 16px;
  background: #fff;
`;

/* ② 헤더(제목 + ‘더보기’ 링크) */
const GuideHeader = styled.div`
  max-width: ${CONTENT_MAX};
  margin: 0 auto 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2  { font-size: 32px; font-weight: 700; margin: 0; }
  a   { font-size: 14px; color: #777; text-decoration: none;
        display: flex; align-items: center; gap: 4px; }

  a:hover { color: #000; }
`;

/* ③ 카드 그리드 */
const GuideGrid = styled.div`
  max-width: ${CONTENT_MAX};
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
`;

/* ④ 단일 카드 */
const GuideCard = styled.div`
  background: #f5f6f7;
  border-radius: 12px;
  padding: 24px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background .18s;

  &:hover { background: #eceff1; }

  /* 왼쪽 – 아이콘+텍스트 */
  .left   { display: flex; align-items: flex-start; gap: 16px; }
  .icon   {
    width: 40px; height: 40px;
    border: 1.5px solid #d0d3d6;
    border-radius: 50%;
    display: grid; place-items: center;
    svg { font-size: 20px; color: #454545; }
  }
  h4      { margin: 0; font-size: 17px; font-weight: 700; }
  p       { margin: 6px 0 0; font-size: 13px; color: #666; }

  /* 오른쪽 – 화살표 */
  .arrow  { font-size: 18px; color: #999; }
`;


/* ─────────── ❶ 농업 소식 전용 스타일 ─────────── */

const BulletinSection = styled.section`
  padding: 64px 16px;
  background: #fff;
`;

const BulletinHeader = styled.div`
  max-width: ${CONTENT_MAX};
  margin: 0 auto 28px;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;   /* 제목은 위, 탭은 아래에 맞춰 정렬 */

  h2 { font-size: 32px; font-weight: 700; margin: 0; }
`;

const BulletinTabs = styled.div`
  display: flex;
  gap: 12px;

  button{
    font-size: 15px;
    padding: 6px 20px;
    border-radius: 22px;
    border: 1px solid ${border};
    background: #fff;
    cursor: pointer;
    transition:.15s;

    &.active{
      background: ${green};
      color:#fff;
      border-color:${green};
      font-weight:600;
    }
  }
`;

/* ── 카드 슬라이더 ───────────────────────────── */
const BulletinSlider = styled.div`
  max-width: ${CONTENT_MAX};
  margin: 0 auto;
  overflow: hidden;
  position: relative;
`;

const SliderTrack = styled.div`
  display: flex;
  transition: transform .45s;
`;

/* 단일 카드 (반응형 min-width: 300px → 스크린샷과 동일 4열) */
const BulletinCard = styled.article`
  flex: 0 0 calc(25% - 24px);   /* 4-col 기준, gap 보정 */
  margin-right: 24px;           /* flex gap 대신 margin */
  background: #fff;
  border: 1px solid ${border};
  border-radius: 12px;
  padding: 24px 22px;

  .label{
    display:inline-block;
    font-size:13px;
    font-weight:700;
    color:${green};
    margin-bottom:14px;
  }
  h4{
    font-size:17px;
    font-weight:700;
    margin:0 0 10px;
    line-height:1.4;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .date{
    font-size:13px;
    color:#999;
    margin-bottom:14px;
    display:block;
  }
  p{
    font-size:13px;
    color:#555;
    line-height:1.45;
    height: 52px;                  /* 두 줄 높이 고정 */
    overflow:hidden;
  }

  /* 모바일 2열 */
  @media(max-width: 799px){
    flex: 0 0 calc(50% - 18px);
  }
`;

/* ── 페이지 Dots ─────────────────────────────── */
const DotsWrap = styled.div`
  margin-top: 26px;
  display: flex;
  justify-content: center;
  gap: 8px;
  span{
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #d0d0d0;
    cursor:pointer;
    &.active{ background:${green}; }
  }
`;
/* ========== ① 검색 + 로그인 ======== */
/* ========== ① 검색 + 로그인 영역 ========== */
const SearchWrap = styled.section`
  position: relative;
  padding: 40px 16px 48px;
  margin-bottom: 0px;

  /* ▽ 가상 요소에 배경만 깔기 ▽ */
  &::before{
    content: "";
    position: absolute;
    inset: 0;                /* top/right/bottom/left = 0 */
    background: url(${searchBg}) left top / 65% auto no-repeat;
    opacity: 2.5;            /* **그림만** 살짝 흐리게 */
    pointer-events: none;    /* 클릭 막힘 방지 */
    z-index: -1;             /* 본문 뒤로 */
  }
`;
const SearchRow = styled.div`
  max-width: ${CONTENT_MAX};     /* 🔹 조금 넉넉하게 */
  margin: 0 auto;
  display: flex;
  gap: 32px;

  /* 데스크톱 : 가로 배치 */
  @media (min-width: 900px) {
    flex-direction: row;
    align-items: center;        /* 위쪽 정렬 */
  }

  /* 모바일 : 세로 배치 */
  @media (max-width: 899px) {
    flex-direction: column;
  }
`;

/* ─── 검색 탭(통합·일자리·직업훈련) ─── */
const SearchTabs = styled.div`
  display: flex;
  gap: 18px;
  margin-bottom: 16px;

  button {
    background: none;
    border: none;
    font-size: 16px;
    font-weight: 600;
    color: #666;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;

    &::before {
      content: "";
      width: 20px; height: 20px;
      border-radius: 50%;
      border: 2px solid #ccc;
      display: inline-block;
    }

    &.active {
      color: ${green};
      &::before {
        background: ${green};
        border-color: ${green};
        box-shadow: inset 0 0 0 4px #fff;
      }
    }
  }
`;

/* ─── 검색 Select + Input 박스 ─── */

/* ─── 로그인 혜택 박스 ─── */
/* ─── 로그인 혜택 박스 ─── */
const BenefitCard = styled.div`
  flex: 0 0 320px;                 /* 고정 폭 */
  border: 2px solid ${green};
  border-radius: 12px;
  padding: 28px 26px;
  line-height: 1.45;

  h4{
    font-size: 17px;
    font-weight: 700;
    margin: 0 0 20px;
    span{ color:${green}; }
  }

  /* ● 2열 그리드 목록 */
  ul{
    margin: 0 0 24px;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);   /* 2열 */
    row-gap: 6px;
    column-gap: 4px;
    list-style: disc inside;
  }
  li{ font-size: 14px; }

  button{
    width: 100%;
    padding: 14px 0;
    background: ${green};
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    cursor: pointer;
  }
`;
const SearchArea = styled.div`
  flex: 1 1 0;            /* 남는 공간만 차지 */
  min-width: 0;           /* flex 아이템 줄바꿈 허용 */
  display: flex;
  flex-direction: column;
`;
/* ─── 검색 바 래퍼 ─── */
const SearchBox = styled.form`
  width: 100%;
  height: 48px;                     /* ✔ 고정 높이 */
  display: flex;
  border: 2px solid ${green};
  border-radius: 999px;
  overflow: hidden;
  background: #fff;
`;

/* 드롭다운 */
const Select = styled.select`
  width: 110px;
  border: none;
  background: transparent;
  font-size: 15px;
  padding-left: 20px;
  cursor: pointer;
  appearance: none;

  /* ▼ 드롭다운 화살표 (SVG) */
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23999' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;

  /* 👉 option 스타일을 중첩으로 */
  option {
    font-size: 15px;
  }
`;
/* 검색 입력창 */
const SearchInput = styled.input`
  flex: 1 1 0;
  border: none;
  font-size: 15px;
  padding: 0 16px;
  outline: none;
`;

/* 돋보기 버튼 */
const SearchBtn = styled.button`
  width: 56px;
  height: 100%;
  background: ${white};
  border: none;
  display: grid;
  place-items: center;
  cursor: pointer;
  svg { color: ${green}; font-size: 20px; }
`;
const HashTags = styled.div`
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  span {
    background: #e0f7e9;
    color: ${green};
    font-size: 12px;
    padding: 6px 12px;
    border-radius: 24px;
    cursor: pointer;
    &:hover {
      background: #c9edd5;
    }
  }
`;


/* ===== 농업 행사 카드 ===== */
/* ===== 농업 행사 카드 ===== */
const EventWrap = styled.section`
  padding: 64px 16px;
  position: relative;

  /* ▽ 가상 요소에 배경만 깔기 ▽ */
  &::before{
    content: "";
    position: absolute;
    inset: 0;                /* top/right/bottom/left = 0 */
    background: url(${eventimg}) left top / 100% auto no-repeat;
    opacity: 2.5;            /* **그림만** 살짝 흐리게 */
    pointer-events: none;    /* 클릭 막힘 방지 */
    z-index: -1;             /* 본문 뒤로 */
  }
`;

const EventHeader = styled.div`
  max-width: ${CONTENT_MAX};
  margin: 0 auto 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 { font-size: 24px; font-weight: 700; margin: 0; }
  a  { font-size: 14px; color: #666; text-decoration: none; }
`;

const EventGrid = styled.div`
  max-width: ${CONTENT_MAX};;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px,1fr));
  gap: 24px;
`;

const EventCard = styled.div`
  background: #fff;
  border: 1px solid ${border};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  min-height: 360px;          /* 카드 높이 고정(선택) */

  /* 본문 */
  .body {
    flex: 1 1 auto;
    padding: 24px 26px;
  }
  h3 {
    font-size: 17px;
    font-weight: 700;
    margin: 0 0 16px;
    line-height: 1.35;
  }
  p  { margin: 0 0 12px; font-size: 14px; color:#555; }
  ul {
    margin: 0; padding-left: 18px;
    li { font-size: 13px; line-height: 1.4; margin-bottom: 6px; }
  }

  /* 하단 날짜 바 */
  .foot {
    border-top: 1px solid ${border};
    padding: 14px 20px;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    svg { font-size: 18px; }
  }
`;
/* ========== ② 자주 찾는 서비스 ======== */
const Section = styled.section`
  padding: 48px 16px;
  background: ${({ bg }) => bg || "transparent"};
`;
const SectionTitle = styled.h2`
  max-width: ${CONTENT_MAX};
  margin: 0 auto 28px;
  font-size: 24px;
  font-weight: 700;
`;
const QuickGrid = styled.div`
  max-width: ${CONTENT_MAX};
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 32px;
  text-align: center;
  div {
    background: #fff;
    border: 1px solid ${border};
    border-radius: 14px;
    padding: 26px 0 20px;
    cursor: pointer;
    transition: 0.2s;
    svg {
      font-size: 34px;
      color: ${green};
      margin-bottom: 14px;
    }
    p {
      font-size: 14px;
      margin: 0;
    }
    &:hover {
      transform: translateY(-4px);
    }
  }
`;

/* ===== 농업 뉴스 전용 스타일 ===== */
const NewsWrap = styled.section`
  padding: 48px 16px;
`;
/* 기존 TabBar → 교체 */
const TabBar = styled.div`
  /* ✅ 섹션 공통 폭 + 중앙 정렬 */
  max-width: ${CONTENT_MAX};
  margin: 0 auto 20px;

  display: flex;
  gap: 12px;
  align-items: center;      /* 높이 중앙 */

  button {
    padding: 8px 20px;
    border-radius: 24px;
    border: 1px solid ${border};
    background: #fff;
    font-size: 14px;
    cursor: pointer;

    &.active {
      background: ${green};
      color: #fff;
      border-color: ${green};
      font-weight: 600;
    }
  }
`;
const NewsGrid = styled.div`
  max-width: ${CONTENT_MAX};
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
`;
const NewsCard = styled.div`
  background: ${({ bg }) => bg};
  border-radius: 10px;
  padding: 22px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  h4 {
    margin: 0;
    font-size: 15px;
    font-weight: 700;
    line-height: 1.4;
  }
  p {
    margin: 0;
    font-size: 13px;
    color: #555;
    line-height: 1.45;
  }
`;

/* ========== ④ 농업 행사 슬라이더 ========== */
const RecruitWrap = styled.section`
  background: ${grayBg};
  padding: 48px 16px;
`;
/* 1️⃣ SlideBox */
const SlideBox = styled.div`
  max-width: ${CONTENT_MAX};
  margin: 0 auto;
  position: relative;

  /* ✔ 카드가 영역 밖으로 못 튀도록 */
  overflow: hidden;

  /* ✔ 화살표와 카드가 안 겹치도록 좌·우 여백 */
  padding: 0 60px;
`;

/* 2️⃣ SlideTrack (gap 18px이면 그대로) */
const SlideTrack = styled.div`
  display: flex;
  gap: 18px;
  transition: transform 0.6s;
`;

/* 3️⃣ RecruitCard – 고정폭(240px)으로 맞추기 */
const cardWidth = 240;             // 아래 계산에도 사용
const cardGap   = 18;

const RecruitCard = styled.div`
  flex: 0 0 ${cardWidth}px;
  background: #fff;
  border: 1px solid ${border};
  border-radius: 12px;
  padding: 18px;
  font-size: 13px;
  line-height: 1.4;
`;

/* 4️⃣ 화살표 버튼 위치 조정 */
const RightArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);     /* ✔ 항상 세로 중앙 */
  right: 12px;                     /* ✔ 카드와 12px 간격 */

  width: 60px;
  height: 60px;
  border: 1px solid ${border};
  border-radius: 50%;
  background: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;
  svg { font-size: 24px; }
`;

/* ========== ⑤ 이용 가이드 & 소식 카드 ========== */
const CardGrid = styled.div`
  max-width: ${CONTENT_MAX};
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
`;
const InfoCard = styled.div`
  background: #fff;
  border: 1px solid ${border};
  border-radius: 12px;
  padding: 18px 16px;
  font-size: 13px;
  line-height: 1.45;
`;

/* ───── 메인 컴포넌트 ───── */
export default function EmploymentHome() {
    const {user,logout} = useAuth();
    const userId = user()?.id;
    const currentUser = user();
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
  /* Quick 메뉴 */
  const quickMenus = [
    { icon: <MdOutlineWork />, label: "농업뉴스",link: "/board?tab=news" },
    { icon: <MdOutlineComputer />, label: "AI농업추천",link: "/myfarm" },
    { icon: <MdOutlineAttachMoney />, label: "예측서비스", link: "/Selling"},
    { icon: <MdOutlineInfo />, label: "안내",link: "/info"},
  ];

  const events = [
  {
    title: "2025 스마트팜 코리아 (KINTEX)",
    desc: "스마트농업 전시·컨퍼런스",
    bullets: ["경기 고양시", "선착순 무료 관람"],
    deadline: "2025-07-15 (D-55)",
  },
  {
    title: "강원 고랭지채소 재배기술 세미나",
    desc: "고랭지 신품종·병해충 관리",
    bullets: ["강원 평창", "현장 참관 3만원"],
    deadline: "2025-08-03 (D-74)",
  },
  {
    title: "전주 농생명 융복합 축제",
    desc: "푸드·농생명 체험 박람회",
    bullets: ["전북 전주", "입장권 5,000원"],
    deadline: "2025-08-20 (D-91)",
  },
  {
    title: "AI 정밀농업 국제 컨퍼런스",
    desc: "데이터·로봇 융합 기술 공유",
    bullets: ["대전 컨벤션센터", "사전 등록 필수"],
    deadline: "2025-09-05 (D-107)",
  },
];
  /* 국내/해외 농업 뉴스 */
  const agriNews = {
    국내: [
      {
        title: "스마트팜 온실 CO₂ 제어 기술 개발",
        desc: "에너지 절감·수확량 향상 기대",
        bg: "#e6f4ff",
      },
      {
        title: "AI 기반 병해충 조기 진단 서비스 출시",
        desc: "스마트폰으로 즉시 감염 예측",
        bg: "#e9f9ec",
      },
      {
        title: "탄소중립형 작물 재배 연구 현황",
        desc: "친환경 비료·토양 개선 기술",
        bg: "#fffbe5",
      },
      {
        title: "드론 방제·정밀 농업 실증 지원 확대",
        desc: "무인기 규제 샌드박스 추진",
        bg: "#fff2e5",
      },
      {
        title: "농업용 데이터 플랫폼 ‘AgriData’ 오픈",
        desc: "공개 API로 작물 생육 데이터 제공",
        bg: "#fdeefa",
      },
      {
        title: "청년 농부 대상 스마트농업 창업 박람회",
        desc: "7월 23~25일, 대전 컨벤션센터",
        bg: "#ede9ff",
      },
    ],
    해외: [
      {
        title: "日, 로봇수확기 상용화… 인력난 해소",
        desc: "딸기 수확 효율 3배↑",
        bg: "#e6f4ff",
      },
      {
        title: "네덜란드, 물 절감형 수직농장 대규모 투자",
        desc: "연간 95% 용수 절약",
        bg: "#e9f9ec",
      },
      {
        title: "美, 위성기반 토양 수분 모니터링 플랫폼",
        desc: "가뭄 예측 정확도 개선",
        bg: "#fffbe5",
      },
    ],
  };

  const [newsTab, setNewsTab] = useState("국내"); // ✅ 타입제네릭 제거
  /* 농업 행사 */
  const recruits = [
    { title: "2025 스마트팜 코리아 (KINTEX)", date: "~25.07.15" },
    { title: "강원 고랭지채소 재배기술 세미나", date: "~25.08.03" },
    { title: "전주 농생명 융복합 축제", date: "~25.08.20" },
    { title: "AI 정밀농업 국제 컨퍼런스", date: "~25.09.05" },
    { title: "농업 드론 방제 실습 워크숍", date: "~25.09.22" },
  ];
  const [idx, setIdx] = useState(0);
  const visible = 4;
  const max = Math.max(0, recruits.length - visible);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i >= max ? 0 : i + 1)), 5000);
    return () => clearInterval(t);
  }, [max]);

  /* ---------- Farmers Bulletin (농업 소식) ---------- */

/* 1) 분류(탭) - 전체·뉴스·공지·서식자료실 */
const bulletinTabs   = ["전체","뉴스","공지사항","서식자료실"];

/* 2) 카드 데이터 */
const bulletinData = [
  {
    kind: "공지",
    title: "2025년 스마트팜 장비 구축 지원사업 공고",
    date: "2025-03-15",
    desc: "시설원예·축산 스마트팜 도입 농가를 대상으로 장비 구입비의 최대 50 %를 지원합니다."
  },
  {
    kind: "뉴스",
    title: "AI 병해충 예측 서비스 베타 오픈",
    date: "2025-03-08",
    desc: "Farmers 플랫폼이 기상·생육 데이터를 활용한 병해충 조기 경보 서비스를 시범 운영합니다."
  },
  {
    kind: "자료",
    title: "‘농업 데이터 API’ 기술 문서 v1.0 배포",
    date: "2025-02-28",
    desc: "작물 생육·시장 거래량 등 12종 데이터를 외부 시스템에서 활용할 수 있는 개발자 가이드입니다."
  },
  {
    kind: "공지",
    title: "정밀농업 국제 포럼 참가자 모집 (5/22·서울)",
    date: "2025-02-20",
    desc: "위성·드론·센서 데이터를 활용한 정밀농업 최신 동향을 공유하는 무료 포럼에 여러분을 초대합니다."
  }
];

/* 3) 상태값 */
const [bulletinCat,  setBulletinCat ] = useState("전체");
const [bulletinPage, setBulletinPage] = useState(0);

/* 4) 계산식 */
const perCard   = 8;
const filtered  = bulletinData.filter(b => bulletinCat==="전체" || b.kind===bulletinCat);
const totalPage = Math.ceil(filtered.length/perCard);
const pageSlice = filtered.slice(bulletinPage*perCard, bulletinPage*perCard+perCard);

const guides = [
  {
    icon: <FiUser />,
    title: "회원가입 방법",
    desc: "회원 유형 선택, 14세 이상·미만 가입 방법을 알려드려요.",
  },
  {
    icon: <FiClipboard />,
    title: "농장 등록 방법",
    desc: "보다 쉽고 간편해진 농장 서비스를 만나요.",
  },
  {
    icon: <FiSearch />,
    title: "검색 방법",
    desc: "농업, 거래, 병충해 등 다양한 정보를 검색해 보세요.",
  },
  {
    icon: <FiTrendingUp />,
    title: "예측 활용 방법",
    desc: "가격 정보부터 거래량, 유통량까지 한 번에 해결해 보세요.",
  },
  {
    icon: <FiSettings />,
    title: "맞춤서비스 설정 방법",
    desc: "원하는 조건을 설정하면 나에게 맞는 정보를 소개해 드려요.",
  },
  {
    icon: <MdOutlineComputer />,
    title: "농업 추천",
    desc: "구직급여, 모성보호 수급 시 받을 수 있는 금액을 계산해 보세요.",
  },
];
  const news = [
    "법률시대, 임금피크제의 새 쟁점",
    "전환연금, 금리 인하에도 10만 명 돌파",
    "고용청(제주) 직업훈련 대폭 개선…",
    "산업부, 스마트제조 인재 양성 정책 발표",
    "현대차 기술교육, 직업훈련 여건 개선 위한 공동 과제",
    "고용부, 근로시간 제도 개선 방향 공개",
  ];

  return (
    <Wrapper>
      {/* ▽ 검색/로그인 */}
      {/* ---------- 검색 탭 + 바 ---------- */}
<SearchWrap>            {/* ← 여기가 빠져 있었음 */}
  <SearchRow>
    <SearchArea>
      {/* ① 탭 */}
      <SearchTabs>
        {["통합검색", "농작물 검색", "농업 검색"].map((t, i) => (
          <button key={t} className={i === 0 ? "active" : ""}>{t}</button>
        ))}
      </SearchTabs>

      {/* ② 검색창 */}
      <SearchBox 
      onSubmit={e=>e.preventDefault()}>
        <Select defaultValue="all">
          <option value="all">전체</option>
          <option value="news">뉴스</option>
          <option value="data">데이터</option>
        </Select>
        <SearchInput placeholder="필요한 서비스를 찾아보세요"
        value={query}
  onChange={(e) => setQuery(e.target.value)}
        />
        <SearchBtn onClick={() => navigate(`/myfarm?query=${encodeURIComponent(query)}`)}><FiSearch/>
        </SearchBtn>
      </SearchBox>

      {/* ③ 추천 키워드 */}
      <HashTags style={{marginTop:"16px"}}>
        {["농업정책","스마트팜","농산물 가격","귀농지원","기후·병해충"].map(k =>
          <span key={k}>{k}</span>
        )}
      </HashTags>
    </SearchArea>

    {/* ▶ 로그인 혜택 박스 */}
    {currentUser ? (
  <BenefitCard>
    <h4><span>{currentUser.name}</span>님 환영합니다!</h4>
    <ul>
      <li>예측 서비스 이용 가능</li>
      <li>AI 추천 정보 제공</li>
      <li>개인화된 농장 정보 제공</li>
      <li>커뮤니티 참여 가능</li>
    </ul>
    <button type="button" onClick={() => {
    logout();                // 1. 로그아웃 처리 (토큰 삭제 등)
    window.location.reload(); // 2. 페이지 강제 새로고침
  }}>
      로그아웃
    </button>
  </BenefitCard>
) : (
  <BenefitCard>
    <h4><span>Farmers에 로그인</span> 하시면<br />아래 서비스를 이용할 수 있어요.</h4>
    <ul>
      <li>농작물 챗봇</li>
      <li>농업 활동 추천</li>
      <li>농작물 예측 서비스</li>
      <li>커뮤니티 서비스</li>
    </ul>
    <button type="button" onClick={() => navigate("/login")}>
      <FiLogIn /> 로그인
    </button>
  </BenefitCard>
)}
  </SearchRow>
</SearchWrap>


      {/* ▽ 자주 찾는 서비스 */}
      <Section bg={grayBg}>
        <SectionTitle>자주찾는 서비스</SectionTitle>
        <QuickGrid>
          {quickMenus.map((m, i) => (
            <a href={m.link} style = {{textDecoration: 'none', color: 'inherit'}}>
            <div key={i}>
              {m.icon}
              <p>{m.label}</p>
            </div>
            </a>
          ))}
        </QuickGrid>
      </Section>

      {/* ▽ 농업 뉴스 */}
      <NewsWrap>
        <SectionHeader>
          <h2>농업 뉴스</h2>
          <p>농업과 관련된 소식을 가장 빠르게 접해보세요.</p>
        </SectionHeader>

        <TabBar>
          {["국내", "해외"].map((t) => (
            <button
              key={t}
              className={newsTab === t ? "active" : ""}
              onClick={() => setNewsTab(t)}
            >
              {t}
            </button>
          ))}
        </TabBar>

        <NewsGrid>
          {agriNews[newsTab].map((n, i) => (
            <NewsCard key={i} bg={n.bg}>
              <h4>{n.title}</h4>
              <p>{n.desc}</p>
            </NewsCard>
          ))}
        </NewsGrid>
      </NewsWrap>

      {/* ▽ 농업 행사 슬라이더 */}
      {/* ▽ 농업 행사 (카드형) */}
<EventWrap>
  <EventHeader>
    <h2>농업 행사</h2>
    <a href="#more">더보기 &gt;</a>
  </EventHeader>

  <EventGrid>
    {events.map((ev, i) => (
      <EventCard key={i}>
        <div className="body">
          <h3>{ev.title}</h3>
          <p>{ev.desc}</p>
          <ul>
            {ev.bullets.map((b, j) => <li key={j}>{b}</li>)}
          </ul>
        </div>

        <div className="foot">
          <FiSearch />  {/* 캘린더 아이콘 대신 간단히 사용, 필요시 react-icons의 FiCalendar 등으로 교체 */}
          {ev.deadline}
        </div>
      </EventCard>
    ))}
  </EventGrid>
</EventWrap>

      {/* ▽ 이용 가이드 & 소식 */}
      <GuideWrap>
  <GuideHeader>
    <h2>이용가이드</h2>
    <a href="#guideMore">
      더보기 <FiChevronRight />
    </a>
  </GuideHeader>

  <GuideGrid>
    {guides.map((g, i) => (
      <GuideCard key={i}>
        <div className="left">
          <div className="icon">{g.icon}</div>
          <div>
            <h4>{g.title}</h4>
            <p>{g.desc}</p>
          </div>
        </div>
        <FiChevronRight className="arrow" />
      </GuideCard>
    ))}
  </GuideGrid>
</GuideWrap>
<BulletinSection>
  {/* ⓐ 타이틀 & 카테고리 탭  */}
  <BulletinHeader>
    <h2>Famers 소식</h2>
    <BulletinTabs>
      {bulletinTabs.map(t => (
        <button  key={t}
                 className={bulletinCat===t ? "active":""}
                 onClick={()=>{ setBulletinCat(t); setBulletinPage(0);} }>
          {t}
        </button>
      ))}
    </BulletinTabs>
  </BulletinHeader>

  {/* ⓑ 카드 슬라이드 영역 */}
  <BulletinSlider>
    <SliderTrack style={{transform:`translateX(-${bulletinPage * 100}%)`,
                         width:`${totalPage * 100}%`}}>
      {filtered.map((b,i)=>(
        <BulletinCard key={i}>
          <span className="label">{b.kind}</span>
          <h4>{b.title}</h4>
          <span className="date">{b.date}</span>
          {b.desc && <p>{b.desc}</p>}
        </BulletinCard>
      ))}
    </SliderTrack>
  </BulletinSlider>

  {/* ⓒ 페이지 Dot 네비게이터 */}
  <DotsWrap>
    {Array.from({length:totalPage}).map((_,i)=>(
      <span key={i}
            className={bulletinPage===i ? "active":""}
            onClick={()=>setBulletinPage(i)}/>
    ))}
  </DotsWrap>
</BulletinSection>
    </Wrapper>
  );
}