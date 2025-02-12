import React,{useState} from "react";
import styled from "styled-components";
import { FaAngleUp } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";


const Container = styled.div`
    margin: 0 50px;
    padding: 0;
    display: flex;
    flex-direction: column;
    @media screen and (min-width : 768px) {
        margin: 0 170px;
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

const Specs = () => {
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
        <BannerWrapper><BannerTitle>자세히 알아보고 싶으신가요?</BannerTitle><BannerContent>문의하기<Right/></BannerContent></BannerWrapper>
       </>
    );
};

export default Specs;