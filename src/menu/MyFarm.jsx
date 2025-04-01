// 전체 기능이 포함된 MyFarm 컴포넌트 (채팅 + 팝업 + 탭 전환)
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../AuthContext";
import styled from "styled-components";
import axios from "axios";
import userEvent from "@testing-library/user-event";

const MyFarmWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
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

      .farm-name {
        font-size: 18px;
        font-weight: bold;
        color: #2c3e50;
        margin-bottom: 6px;
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

    input {
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

const FarmJournalContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

const ChatbotContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
`;

const Chatbot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`;

const Message = styled.div`
  margin-bottom: 15px;
  padding: 10px 15px;
  border-radius: 15px;
  max-width: 70%;
  word-wrap: break-word;

  &.user {
    align-self: flex-end;
    background-color: #28a745;
    color: white;
  }

  &.ai {
    align-self: flex-start;
    background-color: #e9e9e9;
    color: black;
  }
`;

const ChatInput = styled.div`
  display: flex;
  padding: 15px;
  border-top: 1px solid #ccc;
  background-color: #ffffff;

  input {
    flex: 1;
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 20px;
    margin-right: 10px;
    font-size: 16px;
  }

  button {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
      background-color: #218838;
    }
  }
`;

const MyFarm = () => {
  const [activeTab, setActiveTab] = useState("chatbot");
  const [farmList, setFarmList] = useState([]);
  const [selectedFarmId, setSelectedFarmId] = useState(null);
  const [newFarmName, setNewFarmName] = useState("");
  const [newFarmAddress, setNewFarmAddress] = useState("");
  const [newCrop, setNewCrop] = useState("");
  const [newFarmSize, setNewFarmSize] = useState("");
  const [newFarmMethod, setNewFarmMethod] = useState("");
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [messages, setMessages] = useState([
    { text: "안녕하세요! 질문이 있으면 말씀해 주세요.", sender: "ai" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
   // 로그인된 사용자 ID (가정)
   const userId = 123;
   useEffect(() => {
    axios
      .get(`/farms?userId=${userId}`)
      .then((res) => setFarmList(res.data))
      .catch((err) => console.error("[오류] 농장 데이터 불러오기 실패:", err));
  }, []);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAddFarm = () => {
    if (newFarmName.trim()) {
      const newFarm = {
        author: user(),
        id: Date.now(),
        name: newFarmName,
        address: newFarmAddress,
        crop: newCrop,
        size: newFarmSize,
        method: newFarmMethod,
      };
      axios
        .post("/addFarm",newFarm)
        .then((res) =>{
      setFarmList((prev) => [...prev, res.data]);
      setNewFarmName("");
      setNewFarmAddress("");
      setNewCrop("");
      setNewFarmSize("");
      setNewFarmMethod("");
      setShowModal(false);
        })
        .catch((err) => {
          alert("저장 실패: 서버 오류");
        });
    } else {
      alert("농장 이름을 입력해주세요.");
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages((prev) => [...prev, { text: inputValue, sender: "user" }]);
      setInputValue("");
      setTimeout(() => {
        setMessages((prev) => [...prev, { text: `AI 응답: ${inputValue}`, sender: "ai" }]);
      }, 500);
    }
  };

  const handleSelectFarm = (farmId) => {
    setSelectedFarmId(farmId);
    setActiveTab("farmJournal");
  
  };
  if (!user()) {
    return <div style={{ padding: 20 }}>로그인이 필요합니다.</div>;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "farmInfo":
        return (
          <FarmInfoContainer>
            <h2>농장 정보</h2>
            <div className="farm-list">
              {farmList.length > 0 ? (
                farmList.map((farm) => (
                  <div
                    key={farm.id}
                    className="farm-item"
                    onClick={() => handleSelectFarm(farm.id)}
                  >
                    <div className="farm-name">{farm.name}</div>
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
            <button className="add-button" onClick={() => setShowModal(true)}>+ 새 농장 추가</button>
{showModal && (
  <ModalOverlay>
    <ModalContent>
      <h3>새 농장 추가</h3>
      <div className="form-group">
        <label>농장 이름</label>
        <input type="text" value={newFarmName} onChange={(e) => setNewFarmName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>농장 주소</label>
        <input type="text" value={newFarmAddress} onChange={(e) => setNewFarmAddress(e.target.value)} />
      </div>
      <div className="form-group">
        <label>작물 이름</label>
        <input type="text" value={newCrop} onChange={(e) => setNewCrop(e.target.value)} />
      </div>
      <div className="form-group">
        <label>농장 크기</label>
        <input type="text" value={newFarmSize} onChange={(e) => setNewFarmSize(e.target.value)} />
      </div>
      <div className="form-group">
        <label>재배 방식</label>
        <input type="text" value={newFarmMethod} onChange={(e) => setNewFarmMethod(e.target.value)} />
      </div>
      <div className="button-group">
        <button className="save" onClick={handleAddFarm}>저장</button>
        <button className="cancel" onClick={() => setShowModal(false)}>닫기</button>
      </div>
    </ModalContent>
  </ModalOverlay>
)}
          </FarmInfoContainer>
        );
      case "farmJournal":
        const selectedFarm = farmList.find(farm => farm.id === selectedFarmId);
        return (
          <FarmJournalContainer>
            <h2>{selectedFarm ? `${selectedFarm.name}의 농장 일지` : "농장 일지"}</h2>
            <p>여기에 {selectedFarm?.name}의 일지 내용이 표시됩니다.</p>
          </FarmJournalContainer>
        );
      case "chatbot":
        return (
          <ChatbotContainer>
            <Chatbot>
              <ChatMessages>
                {messages.map((msg, idx) => (
                  <Message key={idx} className={msg.sender}>
                    {msg.text}
                  </Message>
                ))}
                <div ref={messagesEndRef} />
              </ChatMessages>
              <ChatInput>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="메시지를 입력하세요..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button onClick={handleSendMessage}>전송</button>
              </ChatInput>
            </Chatbot>
          </ChatbotContainer>
        );
      default:
        return null;
    }
  };

  return (
    <MyFarmWrapper>
      <Content>
        <Sidebar>
          <div className={`tab ${activeTab === "chatbot" ? "active" : ""}`} onClick={() => setActiveTab("chatbot")}>AI 농업 도우미</div>
          <div className={`tab ${activeTab === "farmInfo" ? "active" : ""}`} onClick={() => setActiveTab("farmInfo")}>농장 정보</div>
          <div className={`tab ${activeTab === "farmJournal" ? "active" : ""}`} onClick={() => setActiveTab("farmJournal")}>농장 일지</div>
        </Sidebar>
        {renderContent()}
      </Content>
    </MyFarmWrapper>
  );
};

export default MyFarm;