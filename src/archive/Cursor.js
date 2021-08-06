import { useEffect, useState } from "react";

const style = {
  circle: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "black",
    position: "fixed",
    top: "0",
    left: "0"
  },
  background: {
    height: "100%",
    minHeight: "100vh",
    backgroundColor: "bisque",
    position: "fixed",
    zIndex: "-1",
  },
};

function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const setFromEvent = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", setFromEvent);
    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, []);

  return (
    <>
      <div className="background" style={style.background}>
        {position.x}:{position.y}
      </div>
      {/* <Pointer style={`transform: translate3d(${position.x}, 600px, 0)`}/> */}
      <div style={style.circle}/>
    </>
  );
}
export default Cursor;
