import React,{useState, useEffect,useRef} from "react";
import styled,{keyframes} from "styled-components";
import desgin1 from '../img/Design1.png';
import desgin2 from '../img/Design2.png';

const slideDown = keyframes`
    0% {
        transform: translateY(-50%);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
`;

const slideUp = keyframes`
    0% {
        transform: translateY(-20%);
        opacity: 0;
    }
    100% {
        transform: translateY(0%);
        opacity: 1;
    }
`;


const ContentWrapper = styled.div`
    margin: 0 25px;
    padding: 0;
    @media screen and (min-width : 768px) {
        margin: 0 170px;
    }
`

const MainAnimdation = styled.div`
    animation: ${({inView}) => inView ? slideDown: 'none'} 1s ease-out;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media screen and (min-width : 768px) {
        flex-direction: row;
    }
`

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 0.5px solid #8e8d8d;
    @media screen and (min-width : 768px) {
        flex-direction: row;
        border: none;
    }
`

const MainTitle = styled.p`
    font: 400 35px 'arial';
    color: #2b2b2b;
    margin: 0;
    padding: 0;
    margin: 60px 0 30px 0;
    @media screen and (min-width : 768px) {
        margin: 150px 0;
        flex:1
    }
`

const Content = styled.p`
    font: 500 13px 'arial';
    margin-bottom: 40px;
    @media screen and (min-width : 768px) {
        margin: 0;
        padding: 0;
        flex:1
    }
`

const SubContainer = styled.div`
    display: flex;
    flex-direction: column;
    @media screen and (min-width : 768px) {
        flex-direction: row;
        & > div:nth-child(1){
            margin-right: 10px;
        }
        & > div:nth-child(2){
            margin-left: 10px;
        }
    }
`

const SubWrapper = styled.div`
    animation: ${({inView}) => inView ? slideDown: 'none'} 1s ease-out;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    border-bottom: 0.5px solid #8e8d8d;
    @media screen and (min-width : 768px) {
        border-bottom: none;
        border-top: 0.5px solid #8e8d8d;
    }
`

const SubTitle = styled.p`
    font: bold 23px 'arial';
    color: #2b2b2b;
    margin: 40px 0 5px 0;
    padding: 0;
    @media screen and (min-width : 768px) {

        padding: 0;
    }
`

const SubContent = styled.p`
    font: 500 13px 'arial';
    margin-bottom: 40px;
    @media screen and (min-width : 768px) {
        margin: 20px 0 50px 0;
        padding: 0;
    }
`

const Img = styled.img`
    margin: 0;
    padding: 0;
    margin-bottom: 30px;
    @media screen and (min-width : 768px) {
        width: 100%;
        height: 300px;
    }
`

const SubWrapper2 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    animation: ${({inView}) => inView ? slideUp: 'none'} 1s ease-out;
`

const SubWrapper3 = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    & > div:nth-child(1){
        margin-right: 10px;
        margin-left: 20px;
    }
    & > div:nth-child(2){
        margin-left: 10px;
        margin-right: 20px;
    }
`

const SubWrapper4 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    animation: ${({inView}) => inView ? slideUp: 'none'} 1s ease-out;
`
const SubContent2 = styled.p`
    font: 500 13px 'arial';
    margin: 0;
    padding: 0;
    margin-top: 30px;
    @media screen and (min-width : 768px) {
        padding-bottom: 70px;
        margin: 0 auto;
    }
`

const LastContainer = styled.div`
    width: 100%;
    height: 350px;
    background: #4a4a4a;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
`

const LastWrapper = styled.div`
    width: calc(90%);
    height: 40px;
    margin: 80px 0 0 0;
    padding: 0;
    padding-bottom: 50px;
    border-bottom: 1px solid white;
    @media screen and (min-width : 768px) {
        width: calc(70%);
    }
`

const LastContent = styled.p`
    font: bold 32px 'arial';
    color: white;
    margin: 0;
    padding: 0;
    @media screen and (min-width : 768px) {
        width: calc(47%);
    }
`

const Design = () => {
    const [inView, setInView] = useState({});
    const refs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setInView((prev) => ({ ...prev, [entry.target.dataset.index]: true }));
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        refs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            if (refs.current) refs.current.forEach((ref) => ref && observer.unobserve(ref));
        };
    }, []);

    return(
        <>
            <ContentWrapper>
                <MainContainer>
                    <MainAnimdation ref={(el) => refs.current[0] = el} data-index={0} inView={inView[0]}>
                        <MainTitle>문자 그대로 고정관념에서 벗어나세요.</MainTitle>
                        <Content>뛰어난 창의력과 혁신적 상상력의 산물인 ebii는 가능성이 무한한, 세계 최고의 모듈식 전기 자전거 아키텍처를 기반으로 제작되었습니다.</Content>
                    </MainAnimdation>
                </MainContainer>
                <SubContainer>
                    <SubWrapper ref={(el) => refs.current[1] = el} data-index={1} inView={inView[1]}>
                        <SubTitle>ebii Box</SubTitle>
                        <SubContent>지능형 차량 제어 상자에는 배터리 팩과 제어 상자를 비롯하여 라이딩을 수월하게 해주는 모든 것이 들어 있습니다.</SubContent>
                        <Img src={desgin1} alt="" />
                    </SubWrapper> 
                    <SubWrapper style={{borderBottom:'none'}} ref={(el) => refs.current[2] = el} data-index={2} inView={inView[2]}>
                        <SubTitle>가벼울수록 좋습니다.</SubTitle>
                        <SubContent>싱글 사이드 포크는 더 가벼울 뿐 아니라 더 원활하고 제어되는 라이딩을 가능하게 합니다.</SubContent>
                        <Img src={desgin2} alt="" />
                    </SubWrapper> 
                </SubContainer>
                <SubContainer>
                    <SubWrapper2 ref={(el) => refs.current[3] = el} data-index={3} inView={inView[3]}>
                        <SubContent2>어디든 가야 할 곳으로 데려가도록 설계된 ebii의 경량 폼 팩터가 도시 이동을 식은 죽 먹기로 만듭니다.</SubContent2>
                    </SubWrapper2>
                    <SubWrapper3>
                        <SubWrapper4 ref={(el) => refs.current[4] = el} data-index={4} inView={inView[4]}>
                            <SubTitle>합금 프레임</SubTitle>
                            <SubContent>알루미늄 합금 프레임으로 제작된 ebii는 튼튼하면서 가볍습니다.</SubContent>
                        </SubWrapper4>
                        <SubWrapper4 ref={(el) => refs.current[5] = el} data-index={5} inView={inView[5]}>
                            <SubTitle>싱글 사이드 모터</SubTitle>
                            <SubContent>ebii는 싱글 사이드 허브 모터로 작동되어 콤팩트한 패키지에서 효율이 높습니다.</SubContent>
                        </SubWrapper4>
                    </SubWrapper3>
                </SubContainer>
            </ContentWrapper>
            <LastContainer>
                <LastWrapper>
                    <LastContent>모든 라이딩을 진정으로 나만의 것으로 만드는 스마트 기능.</LastContent>
                </LastWrapper>
            </LastContainer>
        </>
    );
};

export default Design;