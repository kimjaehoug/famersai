import React,{useState} from "react";
import styled from "styled-components";
import img from '../img/productbanner.png';
import { FaAngleUp } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";

const Container = styled.div`
    margin: 0 50px;
    padding: 0;
    display: flex;
    flex-direction: column;
    @media screen and (min-width : 768px) {
        margin: 0 200px;
    }
`

const Img = styled.img`
    width: 100%;
    height: 300px;
    margin: 0;
    padding: 0;
    margin-top: 30px;
    @media screen and (min-width : 768px) {
        width : calc(80%);
        height: 500px;
        margin: 40px auto;
    }
`

const Wrapper = styled.div`
    margin: 0;
    padding:0;
    margin-top: 30px;
    @media screen and (min-width : 768px) {
        margin-inline: 50px;
        display: grid;
        grid-template-columns: repeat(3, 1fr); /* 2개의 열 */
        grid-template-rows: repeat(2, auto);   /* 3개의 행 */
        gap: 20px; /* 요소 사이의 간격을 추가할 수 있습니다 */
    }
`

const ContentWrapper= styled.div`
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
`

const MainTitle = styled.p`
    font: bold 35px 'arial';
    color: #514f4f;
    border-bottom: 1px solid #514f4f;
    margin: 0;
    padding: 0;
    padding-bottom: 15px;
    margin-top: 30px;
`

const ContentTitle = styled.p`
    margin: 0;
    padding: 0;
    font: bold 15px 'arial';
    @media screen and (min-width : 768px) {
        font-size: 23px;
    }
`

const Content = styled.p`
    margin: 0;
    padding: 0;
    font: 500 13px 'arial';
    margin-top: 20px;
    margin-bottom: 40px;
`

const SubTitle = styled.div`
    border-top: 1px solid #514f4f;
    font: 500 20px 'arial';
    margin: 0;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    color: #514f4f;
    &:hover{
        cursor: pointer;
    }
`

const SubContentWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 0.5px solid #514f4f;
`

const SubContentContainer = styled.div`
    margin: 0;
    padding: 0;
    & > :first-child {
        margin-top: 20px;
        @media screen and (min-width : 768px) {
            margin-top: 0;
        }
    }

    & > :last-child {
        margin-bottom: 40px;
        @media screen and (min-width : 768px) {
            margin-bottom: 0;
        }
    }
    @media screen and (min-width : 768px) {
        margin-inline: 50px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-auto-rows: auto;
        column-gap: 40px;
        margin-bottom: 40px;
    }
`

const SubContentName = styled.p`
    font: 500 13px 'arial';
    color:black;
`

const SubContent = styled.p`
    font: 500 13px 'arial';
    color:  black;
`

const Down = styled(FaAngleDown)`
    color: #514f4f;

`

const Up = styled(FaAngleUp)`
    color: #514f4f;

`

const BannerWrapper = styled.div`
    width: 100%;
    height: 250px;
    margin: 0;
    padding: 0;
    position: relative;
    overflow-x: hidden;   
    margin-top: 50px;
    background: #4e4d4d;
`

const BannerTitle = styled.p`
    font: bold 32px 'arial';
    color: white;
    border-bottom: 1px solid white;
    margin: 0 20px;
    padding: 0;
    padding-bottom: 10px;
    margin-top: 80px;
    @media screen and (min-width : 768px) {
        margin: 0 200px;
        padding-bottom: 10px;
        margin-top: 60px;
    }
`

const BannerContent = styled.p`
    font: 500 20px 'arial';
    color:  white;
    margin: 0 20px;
    padding: 0 20px;
    margin-top: 20px;
    float: right;
    padding-bottom: 10px;
    border-bottom: 1px solid white;
    text-align: center;
    @media screen and (min-width : 768px) {
        margin-right: 200px;
    }
    &:hover{
        cursor: pointer;
        color: #a1a0a0;
        border-bottom: 1px solid #a1a0a0;
    }
`

const Right = styled(FaChevronRight)`
    padding: 0;
    margin: 0;
    margin-left: 10px;
    position: relative;
    top: 3px;
`

const Quadstar = () => {
    const [show, setShow] = useState([false, false, false, false, false]);

    const handleClick = (index) => {
        setShow((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    return(
       <>
        <Container>
                <Img src={img}/>
                <MainTitle>숫자로 보는 Quadstar</MainTitle>
                <Wrapper>
                    <ContentWrapper>
                        <ContentTitle>23.5kg</ContentTitle>
                        <Content>Quadstar는 무게가 23.5kg에 불과하여, 도시를 돌아다니는 데 완벽한 동반자가 됩니다.</Content>
                    </ContentWrapper>
                    <ContentWrapper>
                        <ContentTitle>145 ~ 185cm</ContentTitle>
                        <Content>접근성을 염두에 두고 설게된 Quadstar는 다양한 키, 몸집, 숙련도의 라이더들에게 적합합니다.</Content>
                    </ContentWrapper>
                    <ContentWrapper>
                        <ContentTitle>160mm 브레이크</ContentTitle>
                        <Content>유압 디스크 브레이크는 어떠한 기상 조건에서도 효율적인 성능과 제어력을 발휘합니다.</Content>
                    </ContentWrapper>
                    <ContentWrapper>
                        <ContentTitle>25km/h</ContentTitle>
                        <Content>최대 지원 속도가 시간당 25km인 Quadstar는 스트레스 없이 라이딩을 즐길 수 있도록 해줍니다.</Content>
                    </ContentWrapper>
                    <ContentWrapper>
                        <ContentTitle>110km</ContentTitle>
                        <Content>곳곳에 데려다 줄 수 있는 Quadstar는 한 번 충전에 110km까지 도달 가능합니다.</Content>
                    </ContentWrapper>
                    <ContentWrapper>
                        <ContentTitle>2.5시간</ContentTitle>
                        <Content>단 2.5시간을 들이면 Quadstar가 0에서 100으로 충전되어, 이동에 문제 없습니다!.</Content>
                    </ContentWrapper>
                </Wrapper>
                <SubTitle onClick={() => handleClick(0)}>사양{show[0]?<Up/>:<Down/>}</SubTitle>
                {show[0] ? 
                    <SubContentContainer>
                        <SubContentWrapper><SubContentName>크기</SubContentName><SubContent>1578mm(L) x 552mm(W) x 1024mm(H)</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>컨트롤러</SubContentName><SubContent>48V CAN 버스-자동 지원 컨트롤</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>라이더의 키</SubContentName><SubContent>145~185cm - 단일 프레임 사이즈</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>HMI</SubContentName><SubContent>8x8 LED 도트 메트릭스</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>핸들 바</SubContentName><SubContent>평면</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>프레임</SubContentName><SubContent>알루미늄 합금</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>핸들 너비</SubContentName><SubContent>55cm</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>드라이브</SubContentName><SubContent>단일 속도</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>자전거 총 무게</SubContentName><SubContent>23.5kg - 배터리 및 머드가드 포함</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>바퀴</SubContentName><SubContent>20 x 2.2" 펑크 방지 타이어</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>브레이크</SubContentName><SubContent>160mm 유압 디스크 브레이크</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>모터</SubContentName><SubContent>250W 허브 모터</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>조명등</SubContentName><SubContent>전면/후면/측면 조명등</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>배터리</SubContentName><SubContent>460W 리튬 이온</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>연결</SubContentName><SubContent>BLE/LTE</SubContent></SubContentWrapper>
                    </SubContentContainer>: null
                }
                <SubTitle onClick={() => handleClick(1)}>성능{show[1]?<Up/>:<Down/>}</SubTitle>
                {show[1] ? 
                    <SubContentContainer>
                        <SubContentWrapper><SubContentName>지원 속도</SubContentName><SubContent>25km/h(20mph)</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>범위</SubContentName><SubContent>최대 110km</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>지원 모드</SubContentName><SubContent>자동</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>충전 시간</SubContentName><SubContent>0에서 100%까지 2.5시간 소요</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>배터리</SubContentName><SubContent>탈착식 리튬 이온 배터리</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>모터 토크</SubContentName><SubContent>40Nm</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>최대 허용 중량(ISO 4210 인증)</SubContentName><SubContent>120kg - 자전거 포함</SubContent></SubContentWrapper>
                    </SubContentContainer>: null
                }
                <SubTitle onClick={() => handleClick(2)}>안전{show[2]?<Up/>:<Down/>}</SubTitle>
                {show[2] ? 
                    <SubContentContainer>
                        <SubContentWrapper><SubContentName>타이어 너비</SubContentName><SubContent>55mm</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>안전등</SubContentName><SubContent>있음</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>통합 조명등</SubContentName><SubContent>있음</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>후면 레이더</SubContentName><SubContent>있음</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>전자 잠금</SubContentName><SubContent>있음</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>내 자전거 찾기</SubContentName><SubContent>있음</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>도난 경보</SubContentName><SubContent>있음</SubContent></SubContentWrapper>
                    </SubContentContainer>: null
                }
                <SubTitle onClick={() => handleClick(3)}>앱 기능{show[3]?<Up/>:<Down/>}</SubTitle>
                {show[3] ? 
                    <SubContentContainer>
                        <SubContentWrapper><SubContentName>디지털 키 및 자동 잠금 해제</SubContentName><SubContent>있음</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>QuadstarSecure</SubContentName><SubContent>있음</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>라이딩 대시보드 및 내비게이션</SubContentName><SubContent>있음</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>QuadstarRide</SubContentName><SubContent>있음</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>활동 추적 및 달성</SubContentName><SubContent>있음</SubContent></SubContentWrapper>
                    </SubContentContainer>: null
                }
                <SubTitle onClick={() => handleClick(4)}>액세서리{show[4]?<Up/>:<Down/>}</SubTitle>
                {show[4] ? 
                    <SubContentContainer>
                        <SubContentWrapper><SubContentName>머드가드</SubContentName><SubContent>선택 사양</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>받침다리</SubContentName><SubContent>포함됨</SubContent></SubContentWrapper>
                        <SubContentWrapper><SubContentName>리어 랙</SubContentName><SubContent>선택 사양</SubContent></SubContentWrapper>
                    </SubContentContainer>: null
                }
        </Container>
        <BannerWrapper><BannerTitle>자세히 알아보고 싶으신가요?</BannerTitle><BannerContent>문의하기<Right/></BannerContent></BannerWrapper>
       </>
    );
};

export default Quadstar;