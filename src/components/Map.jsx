import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const { kakao } = window;

const StyledMap = styled.div`
  border-radius: 30px;
  overflow: hidden;
  border: 5px solid ${({ theme }) => theme.colors.MAIN};
  width: 80vw;
  height: 80vw;
  max-width: 700px;
  max-height: 700px;
  box-sizing: border-box;
  margin-top: 30px;

  .map {
    width: 100%;
    height: 100%;
  }
`;

export const Map = () => {
  const container = useRef(null);
  const options = {
    center: new kakao.maps.LatLng(37.56637787425258, 126.97827585270615),
    level: 5,
  };
  useEffect(() => {
    const map = new kakao.maps.Map(container.current, options);
    const location = [
      [37.56637787425258, 126.97827585270615],
      [37.56606939560325, 126.9826002893739],
      [37.56581495896049, 126.9752617019476],
    ];
    location.map((e) => {
      const markerPosition = new kakao.maps.LatLng(e[0], e[1]);
      new kakao.maps.Marker({ map, position: markerPosition });
    });
  }, []);

  return (
    <StyledMap>
      <div className="map" ref={container}></div>
    </StyledMap>
  );
};
