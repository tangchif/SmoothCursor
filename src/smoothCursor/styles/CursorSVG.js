import React from "react";
import styled from "styled-components";
import baseStyles from "./BaseStyles";

const CircleA = styled.div`
  ${baseStyles}
  background-image: url(${({ background }) => background});
`;
const CircleB = styled(CircleA)`
  z-index: 99993;
  mix-blend-mode: saturation;
`;

const CursorSVG = ({ Icon }) => {
  return (
    <>
      <CircleA background={Icon} />
      <CircleB background={Icon} />
    </>
  );
};

export default CursorSVG;
