import { css } from "styled-components";

const baseStyles = css`
  --x: calc(var(--mx) * 1px - 49px);
  --y: calc(var(--my) * 1px - 49px);
  --z: var(--mz, 1); //inherit with fallback 1 try 0??
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100px;
  height: 100px;
  mix-blend-mode: exclusion;
  pointer-events: none;
  z-index: 99994;
  transform: translate3d(var(--x), var(--y), 0)
    scale3d(var(--z), var(--z), var(--z));
  /* will-change: transform; */
`;
export default baseStyles;
