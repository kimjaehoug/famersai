import styled from "styled-components";
import mapImg from "../img/map.png";
import pinImg from "../img/pin.png";

const StyledMap = styled.div`
  background-image: url(${(props) => props.img});
  height: 610px;
  width: 460px;
  position: relative;

  img {
    position: absolute;
    height: 70px;
    width: 30px;
    object-fit: cover;
  }
`;

const pins = [
  { name: "서울", loc: [60, 133] },
  { name: "충남", loc: [180, 100] },
  { name: "강원", loc: [45, 275] },
  { name: "세종", loc: [183, 153] },
  { name: "충북", loc: [145, 203] },
  { name: "대전", loc: [212, 170] },
  { name: "전북", loc: [280, 133] },
  { name: "광주", loc: [350, 103] },
  { name: "전남", loc: [383, 103] },
  { name: "제주", loc: [520, 53] },
  { name: "경북", loc: [210, 303] },
  { name: "대구", loc: [280, 290] },
  { name: "경남", loc: [330, 243] },
  { name: "부산", loc: [360, 350] },
  { name: "울산", loc: [320, 370] },
];

const Map = ({ handleLocationChange, locations }) => {
  return (
    <StyledMap img={mapImg}>
      {locations ? (
        <>
          {(() => {
            return locations.map((location) => {
              const pin = pins.find((pin) => pin.name == location);
              return (
                <img
                  key={pin.name}
                  id={pin.name}
                  src={pinImg}
                  style={{ top: `${pin.loc[0]}px`, left: `${pin.loc[1]}px` }}
                  onClick={handleLocationChange}
                />
              );
            });
          })()}
        </>
      ) : (
        <>
          {pins.map((pin) => (
            <img
              key={pin.name}
              id={pin.name}
              src={pinImg}
              style={{ top: `${pin.loc[0]}px`, left: `${pin.loc[1]}px` }}
              onClick={handleLocationChange}
            />
          ))}
        </>
      )}
    </StyledMap>
  );
};

export default Map;
