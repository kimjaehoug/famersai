import styled from "styled-components";
import { useState } from "react";
import Chart from "react-apexcharts";
import { customAxios } from "../customAxios";
import { useAuth } from "../AuthContext";
import industryList from "../data/industryList";
import Map from "../home/Map";
import dropDownImg from "../img/drop_down.png";
import regulatoryZoneData from "../data/regulatoryZoneData";

// ✅ 반응형 둥근 패널 스타일 적용
const PanelContainer = styled.div`
  background-color: #d9e5ff;
  border-radius: 50px;
  padding: 30px;
  margin: 20px 0;
  max-width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  /* 📌 반응형 스타일 */
  @media (max-width: 1024px) {
    padding: 20px;
    border-radius: 40px;
  }

  @media (max-width: 768px) {
    padding: 15px;
    border-radius: 30px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    border-radius: 20px;
  }
`;

const MapContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-around;
  width: 80vw;
  flex-direction: column;
  max-width: 700px;
  margin: auto;
  gap: 50px;
  align-items: center;
  margin-bottom: 50px;

  @media screen and (min-width: 1000px) {
    flex-direction: row;
    align-items: center;
    max-width: 1200px;
  }

  .details {
    border: 1px solid;
    max-width: 450px;

    h2,
    p {
      margin: 0;
      box-sizing: border-box;
      border: 1px solid;
      padding: 20px;
    }

    h2 {
      background: rgb(16, 8, 154);
      background: linear-gradient(
        90deg,
        rgba(16, 8, 154, 1) 0%,
        rgba(114, 9, 121, 1) 58%,
        rgba(164, 12, 148, 1) 100%
      );
    }
  }
`;

const StyledConsulting = styled.div`
  .boardContainer {
    border: none;
    margin: 20px auto;
    padding: 0px;
    max-width: 900px;
    background: #f3f7ff;
    padding-top: 50px;
    box-shadow: none;
    color: #2c2c2c;
    font-family: "IBM Plex Sans KR";
    font-size: 16px;
    line-height: 1.6;
    border-radius: 10px;

    .editTitle {
      font-family: "IBM Plex Sans KR";
      font-size: 16px;
      font-weight: normal;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 10px;
      margin-bottom: 10px;
      margin-left: 40px;
      width: 93%;
      outline: none;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .editContent {
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 10px;
      margin-left: 40px;
      width: 93%;
      height: 200px;
      resize: vertical;
      font-family: "IBM Plex Sans KR";
      font-size: 14px;
      margin-bottom: 20px;
      outline: none;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    h1,
    h3 {
      font-size: 27px;
      font-weight: bold;
      color: #787878;
      margin-bottom: 30px;
      margin-left: 30px;
      text-align: center;
    }

    p {
      margin-top: 50px;
      margin-bottom: 20px;
      margin-left: 30px;
      color: #6e6e6e;
    }

    .buttonContainer {
      display: flex;
      gap: 10px;
      justify-content: center;
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${({ theme }) => theme.colors.MAIN};
      color: #00106c;
      border: none;
      border-radius: 12px;
      padding: 8px 15px;
      font-family: "Noto Sans KR";
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s ease;
      box-shadow: 0 5px 4px rgba(0, 0, 0, 0.1);
    }

    button:hover {
      background-color: ${({ theme }) => theme.colors.SIDE};
    }

    button:active {
      background-color: ${({ theme }) => theme.colors.BACK};
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset;
    }

    .listButton {
      background-color: white;
      color: ${({ theme }) => theme.colors.MAIN};
      border: 2px solid ${({ theme }) => theme.colors.MAIN};
    }

    .listButton:hover {
      background-color: white;
      color: ${({ theme }) => theme.colors.SIDE};
      border: 2px solid ${({ theme }) => theme.colors.SIDE};
    }

    .listButton:active {
      color: ${({ theme }) => theme.colors.BACK};
      border: 2px solid ${({ theme }) => theme.colors.BACK};
    }

    .radio {
      display: flex;
      flex-direction: row;
      justify-content: left;
      width: 100%;
      margin: 0 20px;
      label {
        display: flex;
        align-items: center;
        margin: 0 5px;
        input {
          max-width: 15px;
          box-shadow: none !important;
          margin: 0 !important;
        }
        p {
          margin: 10px;
        }
      }
    }

    .skillSets {
      display: flex;
      flex-direction: row;
      gap: 10px;
      width: 100%;
      flex-wrap: wrap;
      margin: 0 20px 20px 40px;
      button {
        height: 40px;
      }
    }
  }
`;

const Consulting = () => {
  const [companyName, setCompanyName] = useState();
  const [industry, setIndustry] = useState([]);
  const [infras, setInfras] = useState([]);
  const [investmentScale, setInvestmentScale] = useState();
  const [explanation, setExplanation] = useState();
  const [corpTax, setCorpTax] = useState();
  const [propertyTax, setPropertyTax] = useState();
  const [landSize, setLandSize] = useState();
  const [rent, setRent] = useState();
  const { user } = useAuth();
  const [locations, setLocations] = useState(["충남", "충북", "강원"]);
  const [data, setData] = useState([
    {
      기업명: "B기업",
      산업군: "바이오",
      "추천 지역": "충남",
      "추천 거리": "규제특구 추천에 따른 거리 추천 없음",
      "추천 규제특구": {
        지역명: "충남",
        특구명: "그린 암모니아 활용 수소발전",
        "현행 규제내용": "암모니아 연료전지 설치 규제",
        "완화된 규제내용": "암모니아 직공급 연료전지 설치 허용",
        "유사도 점수": 0.6604,
      },
      "투자 규모": 5,
      "유사도 점수": 0.6604,
      주거점수: 418783.024,
      교통점수: 59676.479999999996,
      문화시설점수: 58.29995,
      최종점수: 31.601315772857998,
    },
    {
      기업명: "B기업",
      산업군: "바이오",
      "추천 지역": "충북",
      "추천 거리": "규제특구 추천에 따른 거리 추천 없음",
      "추천 규제특구": {
        지역명: "충북",
        특구명: "그린수소",
        "현행 규제내용": "수소 생산원료 제한",
        "완화된 규제내용": "바이오가스·암모니아 기반 수소 생산 특례",
        "유사도 점수": 0.7334,
      },
      "투자 규모": 5,
      "유사도 점수": 0.7334,
      주거점수: 273724.374,
      교통점수: 46013.7,
      문화시설점수: 50.61101,
      최종점수: 23.453302158633402,
    },
    {
      기업명: "B기업",
      산업군: "바이오",
      "추천 지역": "강원",
      "추천 거리": "규제특구 추천에 따른 거리 추천 없음",
      "추천 규제특구": {
        지역명: "강원",
        특구명: "액화수소산업",
        "현행 규제내용": "액화수소 인프라 구축 제한",
        "완화된 규제내용": "액화수소 생산·저장·충전 인프라 구축 특례",
        "유사도 점수": 0.6408,
      },
      "투자 규모": 5,
      "유사도 점수": 0.6408,
      주거점수: 245439.47400000002,
      교통점수: 44136.0,
      문화시설점수: 62.90396,
      최종점수: 18.560027259676804,
    },
  ]);

  const handleRequestConsulting = () => {
    customAxios
      .post("/consulting", {
        companyName,
        industry,
        infras,
        investmentScale,
        explanation,
        corpTax,
        propertyTax,
        landSize,
        rent,
        author: user(),
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleEditCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleIndustryChange = (e) => {
    setIndustry(e.target.value);
  };

  const handleInfraChange = (e) => {
    if (infras.includes(e.target.value)) {
      const newInfras = infras.filter((infra) => infra !== e.target.value);
      setInfras(newInfras);
    } else {
      setInfras([...infras, e.target.value]);
    }
    console.log(infras);
  };

  const handleInvestmentScaleChange = (e) => {
    setInvestmentScale(e.target.value);
  };

  const handleCorpTaxChange = (e) => {
    setCorpTax(e.target.checked);
  };

  const handlePropertyTaxChange = (e) => {
    setPropertyTax(e.target.checked);
  };

  const handleLandSizeChange = (e) => {
    setLandSize(e.target.value);
  };

  const handleRentChange = (e) => {
    setRent(e.target.value);
  };

  const handleExplanationChange = (e) => {
    setExplanation(e.target.value);
  };

  return (
    <StyledConsulting>
      <div className="boardContainer">
        <h1>기업 특구 확장 및 이전 컨설팅 신청</h1>
        <p>1. 기업명을 작성해주세요.</p>
        <input
          className="editTitle"
          placeholder="기업명을 입력하세요."
          onChange={handleEditCompanyNameChange}
        />
        <p>2. 기업의 산업종을 선택해주세요.</p>
        <div className="skillSets">
          {industryList.map((item, idx) => {
            return (
              <button
                key={idx + 1}
                className="skillSet"
                value={item}
                style={{
                  backgroundColor: industry === item ? "#00106c" : "white",
                  color: industry === item ? "white" : "#00106c",
                  borderRadius: "20px",
                  padding: "10px 20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  boxShadow: "0px 5px 6px rgba(0, 0, 0, 0.1)", // 그림자 효과
                  transition: "all 0.3s ease",
                }}
                onClick={handleIndustryChange}
              >
                {item}
              </button>
            );
          })}
        </div>
        <p>3. 추천받을 지역에서의 고려하고 싶은 인프라를 선택해주세요.</p>
        <div className="skillSets">
          {["교통 현황", "주거 현황", "문화시설"].map((infra, idx) => {
            return (
              <button
                key={idx + 1}
                className="skillSet"
                value={infra}
                style={{
                  backgroundColor: infras.includes(infra) ? "#00106c" : "white",
                  color: infras.includes(infra) ? "white" : "",
                  borderRadius: "20px",
                  padding: "10px 20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  boxShadow: "0px 5px 6px rgba(0, 0, 0, 0.1)", // 그림자 효과
                  transition: "all 0.3s ease",
                }}
                onClick={handleInfraChange}
              >
                {infra}
              </button>
            );
          })}
        </div>
        <p>4. 투자 규모를 작성해주세요. (단위: 억원)</p>
        <input
          className="editTitle"
          placeholder="투자 규모를 입력해주세요. (단위: 억원)"
          onChange={handleInvestmentScaleChange}
          style={{ fontSize: "16px" }}
        />
        <p>5. 법인세를 작성해주세요. (단위: 억원)</p>
        <input
          className="editTitle"
          placeholder="법인세를 작성해주세요. (단위: 억원)"
          onChange={handleCorpTaxChange}
          style={{ fontSize: "16px" }}
        />
        <p>6. 제산세를 작성해주세요. (단위: 억원)</p>
        <input
          className="editTitle"
          placeholder="제산세를 작성해주세요. (단위: 억원)"
          onChange={handleCorpTaxChange}
          style={{ fontSize: "16px" }}
        />
        <p>7. 부지크기를 입력해주세요. (단위: 평)</p>
        <input
          className="editTitle"
          placeholder="부지크기를 입력해주세요. (단위: 평)"
          onChange={handleLandSizeChange}
          style={{ fontSize: "16px" }}
        />
        <p>8. 임대료를 입력해주세요. (단위: 천만원)</p>
        <input
          className="editTitle"
          placeholder="임대료를 입력해주세요. (단위: 천만원)"
          onChange={handleRentChange}
          style={{ fontSize: "16px" }}
        />
        <p>9. 기업에 대한 설명을 작성해주세요.</p>
        <textarea
          className="editContent"
          defaultValue={explanation}
          rows={20}
          onChange={handleExplanationChange}
          placeholder="기업에 대한 설명을 작성해주세요."
          style={{ fontSize: "16px" }}
        />
        <h3>기업 지역특구 추천 컨설팅 결과 확인하기</h3>
        <h3 style={{ textAlign: "center" }}></h3>
        <img
          src={dropDownImg}
          alt="Dropdown Icon"
          style={{ display: "block", margin: "0 auto", width: "100px" }}
        />
      </div>
      <PanelContainer>
        <h2 style={{ color: "#00106c", fontSize: "24px", fontWeight: "bold" }}>
          추천 특구는{" "}
          <span
            style={{
              backgroundColor: "#00106c",
              color: "white",
              padding: "0px 5px",
              borderRadius: "1px",
            }}
          >
            {locations[0]}
          </span>
          ·{locations[1]}·{locations[2]} 입니다.
        </h2>
      </PanelContainer>
      <MapContainer>
        <div>
          <Map locations={locations} />
        </div>
        {locations.length && (
          <>
            {(() => {
              const el = regulatoryZoneData.find(
                (el) => el["지역"] == locations[0]
              );
              return (
                <div className="details">
                  <h2>
                    <text style={{ color: "yellow" }}>{el["지역"]} </text>
                    <text style={{ color: "white" }}>{el["혜택요약"]}</text>
                  </h2>
                  <p>그림이름: {el["그림"]}</p>
                  <p>
                    {el["혜택"].map((el) => (
                      <li>{`${el} `}</li>
                    ))}
                  </p>
                  <p>세부사업: {el["세부사업"]}</p>
                </div>
              );
            })()}
          </>
        )}
      </MapContainer>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "50px",
          }}
        >
          <Chart
            options={{
              chart: {
                id: "basic-bar",
              },
              xaxis: {
                categories: [
                  data[0]["기업명"],
                  data[1]["기업명"],
                  data[2]["기업명"],
                ],
              },
            }}
            series={[
              {
                name: "최종 점수",
                data: [
                  Math.floor(data[0]["최종점수"]),
                  Math.floor(data[1]["최종점수"]),
                  Math.floor(data[2]["최종점수"]),
                ],
              },
            ]}
            type="bar"
            width="500"
            height="400"
          />
          <p style={{ width: "400px" }}>
            이 그래프는 각 기업의 주거점수, 교통점수, 문화시설점수를 반영한
            인프라점수를 나타내고 있습니다. 1위는 {data[0]["기업명"]}이며, 2위는{" "}
            {data[0]["기업명"]}, 3위는 {data[0]["기업명"]}입니다.
          </p>
        </div>
      </div>
    </StyledConsulting>
  );
};

export default Consulting;
