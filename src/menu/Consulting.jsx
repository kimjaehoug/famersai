import styled from "styled-components";
import { useState } from "react";
import Chart from "react-apexcharts";
import { customAxios } from "../customAxios";
import { useAuth } from "../AuthContext";
import industryList from "../data/industryList";
import Map from "../home/Map";
import regulatoryZoneData from "../data/regulatoryZoneData";

const MapContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 80vw;
  max-width: 700px;
  margin: auto;
  gap: 30px;
  align-items: center;
  @media screen and (min-width: 1000px) {
    flex-direction: row;
    align-items: center;
    max-width: 1200px;
  }

  .details {
    border: 1px solid;

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
    border: 1px solid #e0e0e0;
    margin: 20px auto;
    padding: 25px;
    max-width: 900px;
    background: #ffffff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    color: #2c2c2c;
    font-size: 16px;
    line-height: 1.6;

    .editTitle {
      font-size: 24px;
      font-weight: bold;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 10px;
      margin-top: 10px;
      margin-left: 20px;
      width: 93%;
      margin-bottom: 20px;
      outline: none;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .editContent {
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 10px;
      margin-left: 20px;
      width: 93%;
      height: 200px;
      resize: vertical;
      font-size: 14px;
      margin-bottom: 20px;
      outline: none;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    h1 {
      font-size: 27px;
      font-weight: bold;
      color: #2c2c2c;
      margin-bottom: 30px;
      margin-left: 30px;
    }

    p {
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
      color: white;
      border: none;
      border-radius: 12px;
      padding: 8px 15px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
      margin: 0 20px 20px 20px;
      button {
        height: 40px;
      }
    }
  }
`;

const Consulting = () => {
  const [companyName, setCompanyName] = useState();
  const [districtType, setDistrictType] = useState();
  const [industry, setIndustry] = useState([]);
  const [infras, setInfras] = useState([]);
  const [investmentScale, setInvestmentScale] = useState();
  const [explanation, setExplanation] = useState();
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
        districtType,
        industry,
        infras,
        investmentScale,
        explanation,
        author: user(),
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleEditCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleDistrictChange = (e) => {
    setDistrictType(e.target.value);
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
        <p>2. 특구 타입을 정해주세요.</p>
        <div className="skillSets">
          {["규제자유특구", "경제기획특구", "기회발전특구"].map(
            (district, idx) => {
              return (
                <button
                  key={idx + 1}
                  className="skillSet"
                  value={district}
                  style={{
                    backgroundColor:
                      districtType == district ? "" : "lightgrey",
                  }}
                  onClick={handleDistrictChange}
                >
                  {district}
                </button>
              );
            }
          )}
        </div>
        <p>3. 기업의 산업종을 선택해주세요.</p>
        <div className="skillSets">
          {industryList.map((item, idx) => {
            return (
              <button
                key={idx + 1}
                className="skillSet"
                value={item}
                style={{
                  backgroundColor: industry == item ? "" : "lightgrey",
                }}
                onClick={handleIndustryChange}
              >
                {item}
              </button>
            );
          })}
        </div>
        <p>4. 추천받을 지역에서의 고려하고 싶은 인프라를 선택해주세요.</p>
        <div className="skillSets">
          {["교통 현황", "주거 현황", "문화시설"].map((infra, idx) => {
            return (
              <button
                key={idx + 1}
                className="skillSet"
                value={infra}
                style={{
                  backgroundColor: infras.includes(infra) ? "" : "lightgrey",
                }}
                onClick={handleInfraChange}
              >
                {infra}
              </button>
            );
          })}
        </div>
        <p>5. 투자 규모를 입력해주세요. (단위: 억원)</p>
        <input
          className="editTitle"
          placeholder="투자 규모를 입력해주세요. (단위: 억원)"
          onChange={handleEditCompanyNameChange}
          style={{ fontSize: "20px" }}
        />
        <p>6. 기업에 대한 설명을 작성해주세요.</p>
        <textarea
          className="editContent"
          defaultValue={explanation}
          rows={20}
          onChange={handleExplanationChange}
          placeholder="기업에 대한 설명을 작성해주세요."
        />
        <div className="buttonContainer">
          <button onClick={handleRequestConsulting}>컨설팅 요청</button>
        </div>
        <h3>기업 지역특구 추천 컨설팅 결과 확인하기</h3>
      </div>
      <MapContainer>
        <div>
          <h1>
            추천 특구는 <text style={{ color: "red" }}>{locations[0]}</text>,{" "}
            {locations[1]}, {locations[2]}입니다.
          </h1>
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
            })()}{" "}
          </>
        )}
      </MapContainer>
      <div>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          width="500"
        />
      </div>
    </StyledConsulting>
  );
};

export default Consulting;
