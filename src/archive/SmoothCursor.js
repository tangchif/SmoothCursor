import { useMemo, useEffect, useCallback } from "react";
import styled from "styled-components";

const big = 50;
const small = 12;
const os = (big - small) / 2;
const Circle = styled.div`
  --x: calc(var(--mouse-x) * 1px - 1px);
  --y: calc(var(--mouse-y) * 1px - 1px);
  /* --z: var(--mouse-z, 15px); //inherit with fallback */
  --z: calc(var(--mouse-z) * 1px);
  --offset: calc(var(--z) / -2.5);
  position: fixed;
  /* top: calc(var(--z) / -2.5);
  left: calc(var(--z) / -2.5); */
  top: 0px;
  left: 0px;
  width: var(--z);
  height: var(--z);
  border-radius: 999999px;
  background-color: white;
  mix-blend-mode: exclusion;
  pointer-events: none;
  z-index: 99994;
  will-change: transform;
  transform: translate3d(var(--x), var(--y), 0);
  transition: width 5s, height 5s;
  /* transform: scale3d(var(--z), var(--z), 0); */
`;
const Circle2 = styled(Circle)`
  z-index: 99993;
  /* mix-blend-mode: color-dodge; */
  mix-blend-mode: multiply;
`;
const rAF = () => {
  const state = {
    listener: () => {},
    animationFrameId: null,
  };

  const stop = () => {
    cancelAnimationFrame(state.animationFrameId);
  };

  const loop = (timeStamp) => {
    state.listener(timeStamp);
    state.animationFrameId = requestAnimationFrame((timeStamp) => {
      loop(timeStamp);
    });
  };

  const start = (listener) => {
    state.listener = listener;
    loop(performance.now());

    return { stop };
  };

  return { start };
};

const scan = (reducer, init) => {
  const state = {
    accumulator: init,
    reducer: reducer,
    listener: () => {},
  };

  const next = (v) => {
    state.accumulator = state.reducer(state.accumulator, v);
    state.listener(state.accumulator);
  };

  const start = (listener) => {
    state.listener = listener;
    return { next };
  };

  return { start };
};

const lerp = (accum, target, roundness) => {
  return (1 - roundness) * accum + roundness * target;
};

const pointLerp = (roundness) => (accum, target) => {
  return {
    x: lerp(accum.x, target.x, roundness),
    y: lerp(accum.y, target.y, roundness),
  };
};

const smooth = (init, { roundness = 0.1 } = {}) => {
  const state = {
    scan: null,
    loop: null,
    target: init,
  };

  const update = (v) => {
    state.target = v;
  };

  const stop = () => {
    state.loop.stop();
  };

  const start = (listener) => {
    state.scan = scan(pointLerp(roundness), init).start(listener);
    state.loop = rAF().start(() => {
      state.scan.next(state.target);
    });

    return { update, stop };
  };

  return { start };
};

const aboveLink = (x, y) => {
  if (x === 0 && y === 0) return;
  // returns an element
  const pos = document.elementFromPoint(x, y);
  if (pos === null) return;
  if (pos.tagName === "A" || pos.tagName === "BUTTON") {
    // true if element is <a/> or <button/>
    document.body.style.setProperty(`--mouse-z`, big);
  } else {
    document.body.style.setProperty(`--mouse-z`, small);
  }
};

const Cursor = () => {
  const smoothedMouse = useMemo(() => {
    return smooth({ x: 0, y: 0 }).start(({ x, y }) => {
      document.body.style.setProperty(`--mouse-x`, x);
      document.body.style.setProperty(`--mouse-y`, y);
      aboveLink(x, y);
    });
  }, []);

  const updateCursorPosition = useCallback(
    (e) => {
      smoothedMouse.update({
        x: e.clientX,
        y: e.clientY,
      });
    },
    [smoothedMouse]
  );

  useEffect(() => () => smoothedMouse.stop(), [smoothedMouse]);

  useEffect(() => {
    window.addEventListener("mousemove", updateCursorPosition);
    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
    };
  }, [updateCursorPosition]);

  return (
    <>
      <Circle />
      <Circle2 />
    </>
  );
};

export default Cursor;
