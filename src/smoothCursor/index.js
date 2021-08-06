import React from "react";
import { useEffect, useRef, useCallback, useState } from "react";
import GetMouse from "./GetMouse";

import { getOffset } from "./helpers";

let div = null;

let mouseX = 0;
let mouseY = 0;
let distX = 0;
let distY = 0;
let ballX = 0;
let ballY = 0;
let targetBallSize = 0;
let curBallSize = 0;

const speed = 0.1;
const growSpeed = 0.05;

let mouseShape = "circle";
let inside = true;

const checkMousePos = (x, y) => {
  // if element is in corner hide mouse
  if (x === 0 && y === 0) return (targetBallSize = 0);
  // returns an element
  const pos = document.elementFromPoint(x, y);
  if (pos === null) return;
  setMouseSize(pos);
  getShape(pos);
  // set mouse shape
};

const getShape = (element) => {
  if (element.classList.contains("cm")) {
    if (element.classList.contains("c-menuopen")) {
      return (mouseShape = "menuopen");
    }
    if (element.classList.contains("c-menuclose")) {
      return (mouseShape = "menuclose");
    }
    if (element.classList.contains("c-readmore")) {
      return (mouseShape = "readmore");
    }
  } else {
    return (mouseShape = "circle");
  }
};

const setMouseSize = (element) => {
  if (element.dataset.ms) {
    //set cursor size
    targetBallSize = element.dataset.ms;
  }
  // console.log(element.tagName);
  if (element.classList.contains("cm")) {
    if (element.classList.contains("c-attract")) {
      // read pos and set ballX, ballY if class="c-attract"
      // mouseX, mouseY is within element, set ball to center of element
      mouseX = getOffset(element).midX;
      mouseY = getOffset(element).midY;
    }
  } else {
    // set target ball size to small if in viewport
    targetBallSize = inside ? 0.1 : 0;
  }
};
// Animation Loop
const useAnimationFrame = (callback) => {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change

  const requestRef = useRef();
  const animate = useCallback(() => {
    if (!div) {
      div = document.getElementById("cursor");
    }

    // get mouse pos and find out if it is above link
    // and set mouse shape based on class
    checkMousePos(mouseX, mouseY);

    callback(mouseShape); // set mouse shape to state

    distX = mouseX - ballX;
    distY = mouseY - ballY;

    ballX = ballX + distX * speed;
    ballY = ballY + distY * speed;

    const diffS = targetBallSize - curBallSize;
    curBallSize = curBallSize + diffS * growSpeed;

    div.style.setProperty(`--mx`, ballX);
    div.style.setProperty(`--my`, ballY);
    div.style.setProperty(`--mz`, curBallSize);

    requestRef.current = requestAnimationFrame(animate);
  }, [callback]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);
};

// mouse is within viewport
const updateCursorPosition = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  inside = true;
};

const SmoothCursor = () => {
  const [cursorType, setCursorType] = useState("circle");
  useAnimationFrame(() => {
    setCursorType(mouseShape);
  });

  useEffect(() => {
    if (matchMedia("(pointer:fine)").matches) {
      // check to see if there is a mouse
      window.addEventListener("mousemove", updateCursorPosition);
      document.body.addEventListener("mouseout", function (e) {
        if (!e.relatedTarget && !e.toElement) {
          inside = false;
        }
      });
    }
    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
    };
  }, []);

  return (
    <div id="cursor">
      <GetMouse shapeName={cursorType} />
    </div>
  );
};

export default SmoothCursor;
