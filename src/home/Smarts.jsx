import React,{useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import styled,{keyframes} from 'styled-components';
import smart1 from '../img/smart1.png';
import smart2 from '../img/smart2.png';
import { FaAngleRight } from "react-icons/fa6";

const slideUp = keyframes`
    0% {
        transform: translateY(50%);
        opacity: 0;
    }
    100% {
        transform: translateY(0%);
        opacity: 1;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 25px;
    padding: 0;
    @media screen and (min-width : 768px) {
        flex-direction: row;
        margin: 0 170px;
        & > div:nth-child(1){
            margin-right: 10px;
        }
        & > div:nth-child(2){
            margin-left: 10px;
        }
    }
`

const Wrapper = styled.div`
    animation: ${({ inView }) => inView ? slideUp : "none"} 1s ease-out;
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

const Title = styled.p`
    font: bold 23px 'arial';
    color: #2b2b2b;
    margin: 40px 0 5px 0;
    padding: 0;
    @media screen and (min-width : 768px) {

        padding: 0;
    }
`

const Content = styled.p`
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

const BannerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 230px;
    margin: 20px 25px 30px 25px;
    padding: 0;
    background: linear-gradient(135deg, #d3d3d3 0%, #474646 20%,#474646 80%, #d3d3d3 100%);
    @media screen and (min-width : 768px) {
        margin: 0 170px;
    }
`

const BannerTitle = styled.p`
    color: white;
    font: bold 25px 'arial';
    border-bottom: 1px solid white;
    margin: 50px 30px 0 30px;
    padding: 0;
    padding-bottom: 10px;
`

const BannerSubWrapper = styled.div`
    margin: 0;
    padding: 0;
`
const BannerContent = styled.p`
    color: white;
    font: 500 13px 'arial';
    margin: 10px 30px 20px 30px;
    padding: 0;
`

const ButtonWrapper = styled.div`
    display: flex;
    float: right;
    border-bottom: 1px solid white;
    margin: 0 30px 0 0;
    padding: 0;
    padding-bottom: 10px;
    &:hover{
        color: #a7a7a7;
        border-bottom: 1px solid #a7a7a7;
        cursor: pointer;
        p, svg{
            color: #a7a7a7;
        }
    }
`

const BannerButton = styled.p`
    color: white;
    font: 600 19px 'arial';
    margin: 0 15px 0 15px;
    padding: 0;
`
const Right = styled(FaAngleRight)`
    color: white;
    margin: 0;
    padding: 0;
    margin-top: 3px;
    margin-right: 15px;
`

const Smarts = () => {
    const [inView, setInView] = useState({});
    const refs = useRef([]);
    const navigate = useNavigate();

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

    const onClick = () =>{
        navigate('/');
        console.log('move');
    }

    return(
        <>
            <Container>
                <Wrapper  ref={(el) => refs.current[0] = el} data-index={0} inView={inView[0]}>
                    <Title>나,나 자신,AI</Title>
                    <Content>스마트 ebiiAssist는 라이더의 페달을 밟는 힘, 라이딩 여건, 선호하는 지원 수준에 적응하여, 시간이 지날수록 더 라이더에게 맞춤화된 경험을 학습힙니다.</Content>
                    <Img src={smart1}/>
                </Wrapper>
                <Wrapper  ref={(el) => refs.current[1] = el} data-index={1} inView={inView[1]}>
                    <Title>번거러움은 이젠 그만, 자유롭게 라이딩하세요.</Title>
                    <Content>기어 없이도, 문제없습니다. ebii 센서는 라이딩의 라이딩 여건, 페달을 밟는 힘을 감지한 후 필요한 힘을 전달하여, 이제껏 경험해보지 못한 부드러운 라이딩 경험을 선사합니다.</Content>
                    <Img src={smart2}/>
                </Wrapper>
            </Container>
            <BannerWrapper>
                <BannerTitle>Powered by ebiiGo</BannerTitle>
                <BannerSubWrapper>
                    <BannerContent>모바일 앱 ebiiGo에 연결하면 추런 경로, 배터리 수명, 주행 속도, 자동 잠금 설정을 비롯하여 도시를 둘러보는 동안 필요한 모든 정보가 제공됩니다.</BannerContent>
                    <ButtonWrapper onClick={onClick}>
                        <BannerButton>Explore ebiiGo</BannerButton>
                        <Right></Right>
                    </ButtonWrapper>
                </BannerSubWrapper>
            </BannerWrapper>
        </>
    );
};

export default Smarts;