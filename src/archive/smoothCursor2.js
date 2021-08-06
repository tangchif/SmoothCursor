//https://tympanus.net/codrops/2019/01/31/custom-cursor-effects/
import { useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import menuOIcon from "./assets/cursorMenuO.svg";

let mouseX = 0;
let mouseY = 0;
let distX = 0;
let distY = 0;
let ballX = 0;
let ballY = 0;
let targetBallS = 0;
let ballS = 12;

let speed = 0.1;

let inside = true;
// Ball Styling
const Circle = styled.div`
  --x: calc(var(--mouse-x) * 1px - 49px);
  --y: calc(var(--mouse-y) * 1px - 49px);
  --z: var(--mouse-z, 1); //inherit with fallback 1 try 0??
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100px;
  height: 100px;
  border-radius: 999999px;
  background-color: white;
  mix-blend-mode: exclusion;
  pointer-events: none;
  z-index: 99994;
  transform: translate3d(var(--x), var(--y), 0)
    scale3d(var(--z), var(--z), var(--z));
  /* will-change: transform; */
`;
const Circle2 = styled(Circle)`
  z-index: 99993;
  mix-blend-mode: multiply;
`;
// const baseCircle = css`
//   --x: calc(var(--mouse-x) * 1px - 49px);
//   --y: calc(var(--mouse-y) * 1px - 49px);
//   --z: var(--mouse-z, 1); //inherit with fallback 1 try 0??
//   //positioning
//   position: fixed;
//   top: 0px;
//   left: 0px;

//   //shape
//   width: 100px;
//   height: 100px;
//   border-radius: 999999px;
//   background-color: white;

//   pointer-events: none;
//   z-index: 99994;
//   //invert background
//   mix-blend-mode: exclusion;
//   transform: translate3d(var(--x), var(--y), 0)
//     scale3d(var(--z), var(--z), var(--z));
//   /* will-change: transform; */
// `;
// const CircleO = styled.div`
//   ${baseCircle}
//   &::after {
//     ${baseCircle}
//     z-index: 99993;
//     mix-blend-mode: multiply;
//   }
// `;

//

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    width: rect.width,
    midX: rect.left + rect.width / 2,
    midY: rect.top + rect.height / 2,
  };
}
const checkMousePos = (x, y) => {
  if (x === 0 && y === 0) return (targetBallS = 0);
  // returns an element
  const pos = document.elementFromPoint(x, y);

  if (pos === null) return;

  if (pos.dataset.ms) {
    //set cursor size
    targetBallS = pos.dataset.ms;
  }
  if (pos.tagName === "A" || pos.tagName === "BUTTON") {
    if (pos.className === "c-attract") {
      // read pos and set ballX, ballY if class="c-attract"
      // mouseX, mouseY is within element, set ball to center of element
      mouseX = getOffset(pos).midX;
      mouseY = getOffset(pos).midY;
    }
  } else {
    // set target ball size to small if in viewport
    targetBallS = inside ? 0.1 : 0;
  }
};

// Animation Loop
const useAnimationFrame = (callback) => {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = useRef();
  const animate = useCallback(() => {
    // get mouse pos and find out if it is above link
    checkMousePos(mouseX, mouseY);

    distX = mouseX - ballX;
    distY = mouseY - ballY;
    // maybe add another var here??
    ballX = ballX + distX * speed;
    ballY = ballY + distY * speed;

    let diffS = targetBallS - ballS;
    ballS = ballS + diffS * speed;

    document.body.style.setProperty(`--mouse-x`, ballX);
    document.body.style.setProperty(`--mouse-y`, ballY);
    document.body.style.setProperty(`--mouse-z`, ballS);

    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]); // Make sure the effect runs only once
};

const updateCursorPosition = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  inside = true;
};

const SmoothCursor = () => {
  useAnimationFrame();

  useEffect(() => {
    window.addEventListener("mousemove", updateCursorPosition);
    document.body.addEventListener("mouseout", function (e) {
      if (!e.relatedTarget && !e.toElement) {
        inside = false;
      }
    });
    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
    };
  }, []);

  return (
    <div id="cursor">
      <Circle />
      <Circle2 />
      {/* <img src={menuOIcon} alt="menuopen" /> */}
      {/* <CircleO /> */}
    </div>
  );
};

export default SmoothCursor;
