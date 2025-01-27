import React, { useEffect, useState } from "react";
import { customAxios } from "../customAxios";
const { kakao } = window;

const MapView = (props) => {
  function createLatLngArray(maps, index) {
    return maps[index].map((coord) => new kakao.maps.LatLng(coord.x, coord.y));
  }
  const [maps, setMaps] = useState();

  useEffect(() => {
    console.log("AA");
    customAxios
      .get("/bikemap")
      .then((res) => {
        const titles = res.data.map((item) => item.title);
        const mapsXY = res.data.map((item) => item.coordinates);
        setMaps(mapsXY);
        props.propFunction(titles);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let lat = 126;
    let long = 126;
    let lines;
    if (maps) {
      lat = maps[props.index][0].x;
      long = maps[props.index][0].y;
      lines = createLatLngArray(maps, props.index);
    }
    const polyline = new kakao.maps.Polyline({
      path: lines, // 선을 구성하는 좌표배열 입니다
      strokeWeight: 5, // 선의 두께 입니다
      strokeColor: "#FF4500", // 선의 색깔입니다
      strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "solid", // 선의 스타일입니다
    });

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude;
        long = position.coords.longitude;
      });
    }
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(lat, long), //지도의 중심좌표.
      level: 10, //지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(container, options);
    polyline.setMap(map);
  }, [maps, props.index]);

  return (
    <>
      <div
        id="map"
        style={{
          width: "1000px",
          height: "800px",
        }}
      ></div>
    </>
  );
};

export default MapView;
