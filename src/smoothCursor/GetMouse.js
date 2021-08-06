import React from "react";

import CursorSVG from "./styles/CursorSVG";

// SVGs - have to be; 100px x 100px, white
import SVGCircle from "./assets/cursorCircleFill.svg";
import MenuOpen from "./assets/cursorMenuOpenFill.svg";
import MenuClose from "./assets/cursorMenuCloseFill.svg";
import ReadMore from "./assets/cursorReadMoreFill.svg";

const GetMouse = ({ shapeName }) => {
  return (
    <>
      {
        {
          circle: <CursorSVG Icon={SVGCircle} />,
          menuopen: <CursorSVG Icon={MenuOpen} />,
          menuclose: <CursorSVG Icon={MenuClose} />,
          readmore: <CursorSVG Icon={ReadMore} />,
        }[shapeName]
      }
    </>
  );
};

export default GetMouse;
