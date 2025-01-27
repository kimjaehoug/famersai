import React from "react";
import Explain from "../home/Explain";
import Gallery from "../home/Gallery";
import Design from "../home/Design";
import Smarts from "../home/Smarts";
import Convenience from "../home/Convenience";
import Safety from "../home/Safety";
import Specs from "../home/Specs";

const Home = () => {
  return (
    <>
      <Explain></Explain>
      <Gallery></Gallery>
      <Design></Design>
      <Smarts></Smarts>
      <Convenience></Convenience>
      <Safety></Safety>
      <Specs></Specs>
    </>
  );
};

export default Home;