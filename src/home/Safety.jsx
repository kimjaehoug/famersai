import React,{useState, useEffect, useRef} from "react";
import styled,{keyframes} from "styled-components";
import img from '../img/mood.png'
import img2 from '../img/explore.png'
import { FaChevronRight } from "react-icons/fa";

const slideUp = keyframes`
    0% {
        transform: translateY(30%);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
`;

const ImgWrapper = styled.div`
    width: 100%;
    height: auto;
    margin: 0;
    padding: 0;
    position: relative;
    overflow-x: hidden;   
    margin-top: 100px;
`

const Img = styled.img`
    width: 100%;
    height: 500px;
`

const Comment = styled.div`
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    margin: 0 0;
    padding: 0;
    margin-top: 50px;
    @media screen and (min-width : 768px) {
        margin-top: 100px;
    }
`

const ImgTitle = styled.p`
    font: bold 30px 'arial';
    color: white;
    border-bottom: 1px solid white;
    margin: 0 20px;
    padding: 0;
    padding-bottom: 330px;
    @media screen and (min-width : 768px) {
        margin: 0 170px;
        padding-bottom: 10px;
    }
`

const ImgContent = styled.p`
    font: 500 13px 'arial';
    color:  white;
    margin: 0 20px;
    padding: 0;
    padding-top: 10px;
    @media screen and (min-width : 768px) {
        margin-right: 170px;
        width: calc(30%);
        float: right;
    }
`

const ContentWrapper = styled.div`
    margin: 0 25px;
    padding: 0;
    @media screen and (min-width : 768px) {
        margin: 0 170px;
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
    animation: ${({inView}) => inView ? slideUp: 'none'} 1s ease-out;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    border-bottom: 0.5px solid #8e8d8d;
    @media screen and (min-width : 768px) {
        border-bottom: none;
        border-top: 0.5px solid #8e8d8d;
        margin-top: 50px;
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

const SubImg = styled.img`
    width: 100%;
    height: 300px;
`

const SubWrapper2 = styled.div`
    animation: ${({inView}) => inView ? slideUp: 'none'} 1s ease-out;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    @media screen and (min-width : 768px) {
        border-bottom: none;
    }
`
const Button = styled.div`
    font: 500 20px 'arial';
    color: #6c6b6b;
    width: 250px;
    margin: 0;
    padding: 0;
    margin-top: 40px;
    border-bottom: 1px solid gray;
    display: flex;
    flex-direction: row;
    padding-bottom: 10px;
    &:hover{
        cursor: pointer;
        color: gray;
    }
`

const Right = styled(FaChevronRight)`
    margin: 0;
    padding: 0;
    padding-top: 1px;
`

const SubTitle2 = styled.p`
    font: bold 23px 'arial';
    color: #2b2b2b;
    margin: 40px 0 5px 0;
    padding: 0;
    @media screen and (min-width : 768px) {
        padding: 0;
        margin: 0;
    }
`

const SubContent2 = styled.p`
    font: 500 13px 'arial';
    margin-bottom: 40px;
    @media screen and (min-width : 768px) {
        margin-top: 85px;
        padding: 0;
    }
`

const BannerWrapper = styled.div`
    width: 100%;
    height: 250px;
    margin: 0;
    padding: 0;
    position: relative;
    overflow-x: hidden;   
    margin-top: 50px;
    background: #e2e2e2;
`

const BannerTitle = styled.p`
    font: bold 30px 'arial';
    color: black;
    border-bottom: 1px solid black;
    margin: 0 20px;
    padding: 0;
    padding-bottom: 10px;
    margin-top: 50px;
    @media screen and (min-width : 768px) {
        margin: 0 200px;
        padding-bottom: 10px;
        margin-top: 60px;
    }
`

const BannerContent = styled.p`
    font: 500 13px 'arial';
    color:  black;
    margin: 0 20px;
    padding: 0;
    padding-top: 10px;
    @media screen and (min-width : 768px) {
        margin-right: 200px;
        width: calc(30%);
        float: right;
    }
`

const BannerImgWrapper = styled.div`
    width: 100%;
    height: 500px;
    overflow-y: hidden;
    margin: 30px 0;
    padding: 0;
    position: relative;
`

const BannerImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const BannerImgContent = styled.p`
    position: absolute;
    color: white;
    font: bold 40px 'arial';
    text-align: center;
    margin: 0 30px;
    padding: 0;
    top: 40%;
    @media screen and (min-width : 768px) {
        font: bold 50px 'arial';
        margin-left: 100px;
    }
`

const Safety = () =>{
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
            <ImgWrapper>
                <Img src={img}/>
                <Comment>
                    <ImgTitle>첫째도 둘째도 안전.</ImgTitle>
                    <ImgContent>이동 중에는 늘 우선순위이므로, ebii에 모든 최신 안전 기능을 탑재했습니다. 다가오는 차량 감지부터 서라운드 조명등 시스템까지, ebii는 보다 안전한 라이딩을 보장합니다.</ImgContent>
                </Comment>
            </ImgWrapper>
            <ContentWrapper>
                <SubContainer>
                    <SubWrapper  ref={(el) => refs.current[0] = el} data-index={0} inView={inView[0]}>
                        <SubTitle>서라운드 조명등</SubTitle>
                        <SubContent>전면, 후면, 측면 조명등이 다음 움직임을 주변 차량에 알려 야간에 안전성을 높여 줍니다.</SubContent>
                        <SubImg src={img}/>
                    </SubWrapper>
                    <SubWrapper  ref={(el) => refs.current[1] = el} data-index={1} inView={inView[1]}>
                        <SubTitle>충돌 감지</SubTitle>
                        <SubContent>센서가 다가오는 차나 기타 물체를 감지하고 라이더에게 경보를 울려 충돌을 방지합니다.</SubContent>
                        <SubImg src={img}/>
                    </SubWrapper>
                </SubContainer>
                <SubContainer>
                    <SubWrapper2  ref={(el) => refs.current[2] = el} data-index={2} inView={inView[2]}>
                        <SubTitle2>특허받은 배터리 기술로 가장 최적화되고 안정적인 라이딩을 구현합니다.</SubTitle2>
                    </SubWrapper2>
                    <SubWrapper2  ref={(el) => refs.current[3] = el} data-index={3} inView={inView[3]}>
                        <SubContent2>ebii의 배터리는 충전 및 방전 보호, 최적의 전지 배열, 매우 안전한 설계로 인증받아 무결성과 안정성을 보장합니다.<Button>배터리 안전 보고서 읽어 보기<Right/></Button></SubContent2>
                    </SubWrapper2>
                </SubContainer>
            </ContentWrapper>
            <BannerWrapper>
                <BannerTitle>지켜봅니다. 건드릴 수 없습니다.</BannerTitle>
                <BannerContent>자동 잠금 시스템과 GPS 위치 지정 기능이 있어, 자전거를 어디에 주차했는지 다시는 걱정할 일이 없습니다. ebii는 또한 라이더가 없을 때 누군가 ebii를 이동시키려 할 때마다 즉시 경보를 울리도록 설계되었습니다.</BannerContent>
            </BannerWrapper>   
            <ContentWrapper>
             <SubContainer>
                    <SubWrapper2  ref={(el) => refs.current[4] = el} data-index={4} inView={inView[4]}>
                        <SubTitle>잃어버릴 일이 없습니다.</SubTitle>
                        <SubContent>자전거 도난 가능성이 감지되면 즉시 알림을 받습니다. GPS 위치 지정은 어떤 상황에서든 ebii를 찾는 데 도움을 줍니다.</SubContent>
                    </SubWrapper2>
                    <SubWrapper2  ref={(el) => refs.current[5] = el} data-index={5} inView={inView[5]}>
                        <SubTitle>항상 안전합니다</SubTitle>
                        <SubContent>ebii는 휴대폰이 연결 범위를 벗어났음을 감지하면 자동으로 잠깁니다..</SubContent>
                    </SubWrapper2>
                </SubContainer>
            </ContentWrapper>
            <BannerImgWrapper><BannerImg src={img2}/><BannerImgContent>세상을 보는 방식을 바꿔보세요.</BannerImgContent></BannerImgWrapper>
        </>
    );
};

export default Safety;