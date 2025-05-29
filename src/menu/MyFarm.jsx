// 전체 기능이 포함된 MyFarm 컴포넌트 (채팅 + 팝업 + 탭 전환)
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../AuthContext";
import axios from "axios";
import styled from "styled-components";
import userEvent from "@testing-library/user-event";
import { customAxios } from "../customAxios";
import Calendar from 'react-calendar';
import {useSearchParams} from "react-router-dom";
import 'react-calendar/dist/Calendar.css'; // 캘린더 기본 스타일

// 파일 상단에 선언해두면 전체에서 재사용 가능!
const sanitizeAIResponse = (text) => {
  if (!text) return "";

  let cleaned = text;

  // 1. thought:로 시작하는 줄 제거
  cleaned = cleaned.replace(/^thought:.*$/gim, "");

  // 2. <thought> ... </thought> 태그 제거
  cleaned = cleaned.replace(/<thought[^>]*>[\s\S]*?<\/thought>/gi, "");

  // 3. <think> ... </think> 태그 제거
  cleaned = cleaned.replace(/<think[^>]*>[\s\S]*?<\/think>/gi, "");

  // 4. <tool> 태그 제거
  cleaned = cleaned.replace(/<tool[^>]*>[\s\S]*?<\/tool>/gi, "");

  // 5. 기타 HTML/XML 태그 제거
  cleaned = cleaned.replace(/<[^>]+>/g, "");

  // 6. JSON 블럭 제거 (단순 대응)
  cleaned = cleaned.replace(/\{[^}]+\}/g, "");

  // 7. 양쪽 공백 및 빈 줄 제거
  cleaned = cleaned
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "")
    .join("\n");

  return cleaned.trim();
};

const MyFarmWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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
const ChatMessagesWrapper = styled.div`
  flex: 1;
  overflow-y: auto;  // ✅ 스크롤은 여기만!
  margin-bottom: 10px;
`;

const FarmJournalContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 40px 20px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  z-index: 10;  /* 추가 */
`;
const JournalLeft = styled.div`
  flex: 1.2;
  margin-right: 20px;
`;
const JournalRight = styled.div`
  flex: 1;
  position: sticky;
  top: 20px;
  align-self: flex-start;
  height: fit-content;
  min-height: 600px;         // ✅ 최소 높이 지정
  max-height: 800px;         // ✅ 너무 커지지 않도록 제한
  border-left: 1px solid #ddd;
  padding-left: 20px;
  z-index: 5;
  background: white;
  display: flex;
  flex-direction: column;
`;
const ChatbotContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height:100vh;
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
  white-space: pre-wrap; /* ✅ 줄바꿈 문자 처리 */

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

const ScrollableChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 600px;
  max-height: 800px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 12px;
`;

const textareaStyle = {
  width: "100%",
  height: "100px",
  borderRadius: "10px",
  padding: "10px",
  border: "1px solid #ccc",
  fontSize: "14px",
  resize: "vertical",
};

const saveButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const cancelButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#ccc",
  color: "black",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

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
  const userId = user()?.id;
  const [farmJournalMessages, setFarmJournalMessages] = useState([]);
  const [farmJournalInput, setFarmJournalInput] = useState("");
  const farmJournalEndRef = useRef(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [selectedFarm_m, setSelectedFarm_m] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // 수정모드 여부
  const [messages, setMessages] = useState([
    { text: "안녕하세요! 질문이 있으면 말씀해 주세요.", sender: "ai" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const [queryParams] = useSearchParams();

  // 추가할 상태
const [selectedDate, setSelectedDate] = useState(new Date());
const [dailyNotes, setDailyNotes] = useState({}); // 날짜별 일지 저장
const [note, setNote] = useState("");
const [pestNote, setPestNote] = useState("");
const [recommendation, setRecommendation] = useState("");

useEffect(() => {
  const query = queryParams.get("query");
  setInputValue(query);

}, [queryParams]);

const handleDateChange = async (date) => {
  setSelectedDate(date);
  const key = formatDateKST(date); 
  console.log("날짜데이터:", key); 

  try {
    const res = await customAxios.get(`/farmJournal`, {
      params: {
        userId: userId,
        farmName: selectedFarmId,
        date: key
      }
    });
    const { note: serverNote, pestNote: serverPestNote, recommendation: recommendations } = res.data || {};
    setNote(serverNote || "");
    setPestNote(serverPestNote || "");
    setRecommendation(recommendations || "");
  } catch (err) {
    console.error("📛 일지 정보 가져오기 실패:", err);
    setNote(""); setPestNote(""); setRecommendation("");
  }
};


const handleFarmJournalSendMessage = async () => {
  if (!farmJournalInput.trim()) return;

  const newUserMsg = { text: farmJournalInput, sender: "user" };
  setFarmJournalMessages((prev) => [...prev, newUserMsg]);
  setFarmJournalInput("");

  try {
    const res = await customAxios.post("/aichat/journalAsk", {
      userId,
      farmName: selectedFarmId,
      date: formatDateKST(selectedDate),
      question: farmJournalInput,
    });
    const aiMsg = { text: res.data.answer, sender: "ai" };
    setFarmJournalMessages((prev) => [...prev, aiMsg]);
  } catch (err) {
    console.error("농장 일지용 채팅 실패:", err);
    setFarmJournalMessages((prev) => [
      ...prev,
      { text: "⚠️ AI 응답 실패", sender: "ai" }
    ]);
  }
};



const formatDateKST = (dateObj) => {
  const offsetMs = dateObj.getTime() + (9 * 60 * 60 * 1000); // KST +9시간 적용
  const kst = new Date(offsetMs);
  return kst.toISOString().split("T")[0]; // YYYY-MM-DD
};

const getCleanRecommendation = (text) => {
  if (!text) return "";

  const closingTag = "</thought>";
  const idx = text.indexOf(closingTag);

  // </thought>가 포함되어 있으면 그 뒤의 내용만 반환
  if (idx !== -1) {
    return text.slice(idx + closingTag.length).trim();
  }

  // 없으면 원본 그대로
  return text;
};
// 저장 버튼
const handleSaveNote = () => {
  console.log("💾 저장 버튼 클릭됨");

  try {
    const dateStr = formatDateKST(selectedDate);
    const selectedFarmObj = farmList.find((f) => f.name === selectedFarmId);
    const crop = selectedFarmObj?.crop || "";
    const payload = {
      userId: userId,
      farmName: selectedFarmId,
      crop, 
      date: dateStr,
      note,
      pestNote,
    };

    console.log("📦 payload:", payload);

    customAxios.post("/farmJournal/commitData", payload)
      .then((res) => {
        console.log("✅ 저장 성공", res);
        setIsEditing(false)
      })
      .catch((err) => {
        console.error("❌ 저장 실패", err);
      });

    console.log("📌 axios.post 호출 완료");
  } catch (e) {
    console.error("💥 try-catch에서 예외 발생:", e);
  }
};



  const fetchFarms = () =>{
    customAxios
  .get(`/farm/farms?userId=${userId}`)
  .then((res) => {
    setFarmList(res.data);
    console.log("📦 농장 리스트 갱신:", res.data);
  })
  .catch((err) =>
    console.error("[오류] 농장 데이터 불러오기 실패:", err)
  );
  }

  useEffect(() => {
    if (!userId) return;
  
    customAxios
      .get(`/aichat/getChat?userId=${userId}`)
      .then((res) => {
        const history = res.data.history || [];
  
        const loadedMessages = history.flatMap(chat => [
          { text: chat.question, sender: "user" },
          { text: chat.answer, sender: "ai" }
        ]);
  
        setMessages((prev) => [...prev, ...loadedMessages]);
      })
      .catch((err) => {
        console.error("📛 채팅 기록 불러오기 실패:", err);
      });
  }, [userId]);

  console.log(user);
   // 로그인된 사용자 ID (가정)
   useEffect(() => {
    customAxios
      .get(`/farm/farms?userId=${userId}`)
      .then((res) => {setFarmList(res.data)
        console.log("서버에서 받은 농장 리스트:", res.data);
      })
      .catch((err) => console.error("[오류] 농장 데이터 불러오기 실패:", err));
  }, []);
  useEffect(() => {
    if (!userId) return;
  
    customAxios
      .get(`/aichat/getChat?userId=${userId}`)
      .then((res) => {
        let history = res.data.history || [];
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth"});
        // ✅ created_at 기준 오름차순 정렬 (가장 오래된 → 최신 순)
        history.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  
        // ✅ 중복 없이 메시지 초기화 (prev 제거!)
        const loadedMessages = history.flatMap(chat => [
          { text: chat.question, sender: "user", created_at: chat.created_at },
          { text: chat.answer, sender: "ai", created_at: chat.created_at }
        ]);
  
        setMessages(loadedMessages);  // 💡 prev 제거!
      })
      .catch((err) => {
        console.error("📛 채팅 기록 불러오기 실패:", err);
      });
  }, [userId]);
  const handleDeleteFarm = (farm) => {
    setSelectedFarm_m(farm);
    setRemoveModalVisible(true);
  }
  const handleRemove = (farm) => {
    console.log("삭제팜 이름:",farm);
    if (window.confirm(`${farm} 농장을 삭제하시겠습니까?`)) {
      customAxios
        .delete(`/farm/delete?userId=${userId}&name=${encodeURIComponent(farm)}`)
        .then(() => fetchFarms()) // 삭제 후 갱신
        .catch((err) => console.error("삭제 실패:", err));
    }
    setRemoveModalVisible(false);
  };
  const handleEditFarm = (farm) => {
    setSelectedFarm_m(farm);         // 어떤 농장을 수정할지 지정
    setEditModalVisible(true);     // 모달 열기
  };

  const handleCloseModal = () => {
    setEditModalVisible(false);    // 모달 닫기
    setSelectedFarm_m(null);
    setRemoveModalVisible(false);
  };


const handleSaveEdit = () => {
  customAxios
    .put(`/farm/update`, selectedFarm_m)
    .then(() => {
      fetchFarms();
      handleCloseModal();
    })
    .catch((err) => console.error("수정 실패:", err));
};
  
  const handleAddFarm = () => {
    if (newFarmName.trim()) {
      const newFarm = {
        author: user(),
        id: userId,
        name: newFarmName,
        address: newFarmAddress,
        crop: newCrop,
        size: newFarmSize,
        method: newFarmMethod,
      };
      customAxios
        .post("/farm/newFarm",newFarm)
        .then((res) =>{
          fetchFarms();
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

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
  
    const userMessage = { text: inputValue, sender: "user" };
    setMessages((prev) => [...prev, userMessage]); // 유저 메시지 추가
    setInputValue("");
  
    try {
      const res = await customAxios.post("/aichat/ask", {
        question: inputValue,
        userId: user()?.id // 사용자 질문
      });
      const cleaned = sanitizeAIResponse(res.data.answer);
      const aiMessage = {
        text: res.data.answer, // AI 응답
        sender: "ai",
      };
  
      setMessages((prev) => [...prev, aiMessage]); // AI 메시지 추가
    } catch (err) {
      console.error("AI 응답 실패:", err);
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ AI 응답에 실패했습니다. 다시 시도해주세요.", sender: "ai" },
      ]);
    }
  };

  const handleSelectFarm = (farmId) => {
    console.log("팜 id",farmId);
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
      key={farm.name}
      className="farm-item"
      onClick={() => handleSelectFarm(farm.name)} // ✅ 카드 전체 클릭
    >
      <div className="farm-header">
        <div className="farm-name">{farm.name}</div>

        <div className="farm-actions">
          <button
            onClick={(e) => {
              e.stopPropagation(); // ✅ 카드 클릭 이벤트 막음
              handleEditFarm(farm);
            }}
          >
            수정
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation(); // ✅ 카드 클릭 이벤트 막음
              handleDeleteFarm(farm.name);
            }}
          >
            삭제
          </button>
        </div>
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
{removeModalVisible && selectedFarm_m && (
  <ModalOverlay>
    <ModalContent>
      <h3>농장 삭제</h3>
      <h2> 정말 삭제하시겠습니까?</h2>
      <div className="button-group">
      <button onClick={() => handleRemove(selectedFarm_m)}>삭제</button>
        <button onClick={handleCloseModal}>취소</button>
      </div>
    </ModalContent>
  </ModalOverlay>
)}
{editModalVisible && selectedFarm_m && (
  <ModalOverlay>
    <ModalContent>
      <h3>농장 정보 수정</h3>
      <div className="form-group">
      <label>농장 이름</label>
      <input
        value={selectedFarm_m.name}
        onChange={(e) =>
          setSelectedFarm_m({ ...selectedFarm_m, name: e.target.value })
        }/>
      </div>
      <div className="form-group">
      <label>주소</label>
      <input
        value={selectedFarm_m.address}
        onChange={(e) =>
          setSelectedFarm_m({ ...selectedFarm_m, address: e.target.value })
        }
      />
      </div>
      <div className="form-group">
      <label>작물</label>
      <input
        value={selectedFarm_m.crop}
        onChange={(e) =>
          setSelectedFarm_m({ ...selectedFarm_m, crop: e.target.value })
        }
      />
      </div>
      <div className="form-group">
      <label>규모</label>
      <input
        value={selectedFarm_m.size}
        onChange={(e) =>
          setSelectedFarm_m({ ...selectedFarm_m, size: e.target.value })
        }
      />
      </div>
      <div className="form-group">
      <label>방식</label>
      <input
        value={selectedFarm_m.method}
        onChange={(e) =>
          setSelectedFarm_m({ ...selectedFarm_m, method: e.target.value })
        }
      />
      </div>
      <div className="button-group">
        <button onClick={handleSaveEdit}>저장</button>
        <button onClick={handleCloseModal}>취소</button>
      </div>
    </ModalContent>
  </ModalOverlay>
)}
          </FarmInfoContainer>
        );
      case "farmJournal":
        const selectedFarm = farmList.find(farm => farm.name === selectedFarmId);
        console.log(selectedFarm);
        return (
          <FarmJournalContainer>
        <JournalLeft>
  <h2>{selectedFarm ? `${selectedFarm.name}의 농장 일지` : "농장 일지"}</h2>

  {/* 📅 달력 (상단 고정) */}
  <div style={{ maxWidth: "500px", margin: "0 auto", marginTop: "10px" }}>
    <Calendar
      onChange={handleDateChange}
      value={selectedDate}
      calendarType="gregory"
    />
  </div>

  {/* 📝 선택된 날짜가 있을 때만 일지 표시 */}
  {selectedDate && (
    <div style={{ marginTop: "10px", maxWidth: "800px", margin: "0 auto", width: "100%"}}>
      <h3 style={{ marginBottom: "20px" }}>
        {selectedDate.toLocaleDateString()} 일지
      </h3>

      {!isEditing ? (
        <>
          {/* 조회 모드 */}
          <div style={{ marginBottom: "20px" }}>
            <h4>🌱 생육활동</h4>
            <p style={{ 
              padding: "10px", 
              background: "#f9f9f9", 
              borderRadius: "8px", 
              minHeight: "60px", 
              border: "1px solid #ddd",
            }}>
              {note || "작성된 메모가 없습니다."}
            </p>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <h4>🛡 병충해 방지 활동</h4>
            <p style={{ 
              padding: "10px", 
              background: "#f9f9f9", 
              borderRadius: "8px", 
              minHeight: "60px", 
              border: "1px solid #ddd" 
            }}>
              {pestNote || "작성된 메모가 없습니다."}
            </p>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <h4>🤖 Ai 추천 활동</h4>
            <p style={{ 
              padding: "10px", 
              background: "#f9f9f9", 
              borderRadius: "8px", 
              minHeight: "60px", 
              border: "1px solid #ddd" 
            }}>
              {getCleanRecommendation(recommendation) || "AI 추천이 없습니다."}
            </p>
          </div>
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={() => setIsEditing(true)}
          >
            수정
          </button>
        </>
      ) : (
        <>
          {/* 수정 모드 */}
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="growthNote">🌱 생육활동</label>
            <textarea
              id="growthNote"
              style={{
                width: "100%",
                height: "100px",
                borderRadius: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                fontSize: "14px",
                resize: "vertical",
              }}
              placeholder="오늘 생육활동에 대한 메모를 적어보세요!"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="pestNote">🛡 병충해 방지 활동</label>
            <textarea
              id="pestNote"
              style={{
                width: "100%",
                height: "100px",
                borderRadius: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                fontSize: "14px",
                resize: "vertical",
              }}
              placeholder="오늘 병충해 방지 활동에 대한 메모를 적어보세요!"
              value={pestNote}
              onChange={(e) => setPestNote(e.target.value)}
            />
          </div>

          <div style={{   display: "flex",
  gap: "10px",
  position: "relative",
  zIndex: 20,              // 더 높게
  pointerEvents: "auto", }}>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              type="button"
              onClick={() => {
                console.log("💾 저장 버튼 클릭됨");
                handleSaveNote();
              }}
            >
              저장
            </button>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#ccc",
                color: "black",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={() => setIsEditing(false)}
            >
              취소
            </button>
          </div>
        </>
      )}
    </div>
  )}
  </JournalLeft>
  <JournalRight>
    <h3 style={{ marginBottom: "10px", paddingLeft: "10px" }}>
    📅 {formatDateKST(selectedDate)} - AI 일자별 채팅
  </h3>
   <ScrollableChatContainer>
  <ChatMessagesWrapper>
    <ChatMessages>
      {farmJournalMessages.map((msg, idx) => (
        <Message key={idx} className={msg.sender}>
          {msg.text}
        </Message>
      ))}
      <div ref={farmJournalEndRef} />
    </ChatMessages>
  </ChatMessagesWrapper>
  
  <ChatInput>
    <input
      type="text"
      value={farmJournalInput}
      onChange={(e) => setFarmJournalInput(e.target.value)}
      placeholder="AI에게 질문해보세요!"
      onKeyPress={(e) => e.key === "Enter" && handleFarmJournalSendMessage()}
    />
    <button onClick={handleFarmJournalSendMessage}>전송</button>
  </ChatInput>
</ScrollableChatContainer>
  </JournalRight>
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
          <div className={`tab ${activeTab === "farmJournal" ? "active" : ""}`}  >농장 일지</div>
        </Sidebar>
        {renderContent()}
      </Content>
    </MyFarmWrapper>
  );
};

export default MyFarm;