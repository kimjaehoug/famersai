import styled, { keyframes } from "styled-components";
import img from "../img/gallery.png";

const slideIn = keyframes`
    0% {
        transform: translateX(-100%);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
`;

const ImgWrapper = styled.div`
  width: 100%;
  height: auto;
  overflow-x: hidden;
`;

const Img = styled.img`
  max-width: 100%;
  animation: ${slideIn} 2s ease-out;
`;

const Gallery = () => {
  return (
    <ImgWrapper>
      <Img src={img} alt="" />
    </ImgWrapper>
  );
};

export default Gallery;
