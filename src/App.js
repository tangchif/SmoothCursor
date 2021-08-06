import { useState } from "react";
import "./App.css";
import Cursor from "./smoothCursor";

const Hero = () => {
  return (
    <div className="content">
      <h1>Styled-Components Smooth Mouse Cursor Demo</h1>
      <hr />
      <div style={{ marginBottom: "16px" }}>
        <code>import Cursor from "./smoothCursor";</code>
      </div>
      <div style={{ marginBottom: "16px" }}>
        <pre>
          <code>
            <div>{`
function Root() {
  return (
    <div id="root">
      ...

      <Cursor />
    </div>
  );
}

export default Root;
      `}</div>
          </code>
        </pre>
      </div>
      <div>
        <a
          href="https://github.com/cftang1/SmoothCursor"
          className="cm"
          data-ms="0.5"
        >
          Github Link
        </a>
      </div>
    </div>
  );
};

const RangeSlider = () => {
  const [rangeval, setRangeval] = useState(0);

  return (
    <div className="inputslidecontainer" style={{ fontSize: "1rem" }}>
      <pre>
        <code>{`<input `}</code>
        <br />
        <code>{`  type="range"`}</code>
        <br />
        <code>{`  min="0"`}</code>
        <br />
        <code>{`  max="5"`}</code>
        <br />
        <code>{`  step="0.1"`}</code>
        <br />
        <code>{`  defaultValue="0"`}</code>
        <br />
        <code>{`  className="slider cm"`}</code>
        <br />
        <code className="blue">{`  data-ms="`}</code>
        <code>{rangeval}</code>
        <code className="blue">{`"`}</code>
        <br />
        <code>{`/>`}</code>
      </pre>
      <input
        type="range"
        min="0"
        max="5"
        step="0.1"
        defaultValue="0"
        className="slider cm"
        data-ms={rangeval}
        onChange={(event) => setRangeval(event.target.value)}
      />
    </div>
  );
};

const VariableCursorSize = () => {
  return (
    <div className="content">
      <h5 className="title">Variable cursor size</h5>
      <hr />
      <RangeSlider />
    </div>
  );
};

const CursorAttractEl = () => {
  return (
    <div className="content">
      <h5 className="title">Cursor Attract To Element</h5>
      <hr />
      <div style={{ marginBottom: "16px" }}>
        <code>className="cm c-attract"</code>
      </div>
      {(() => {
        const rows = [];
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            rows.push(
              <button
                className="cm c-attract buttonSq"
                data-ms={j + i}
                key={j + " " + i}
              >
                data-ms="{j + i}"
              </button>
            );
          }
          rows.push(<br key={i + "br"} />);
        }
        return rows;
      })()}
    </div>
  );
};
const CursorHoverShape = () => {
  return (
    <div className="content">
      <h5 className="title">Cursor Hover Shape</h5>
      <hr />{" "}
      <button className="cm c-menuopen buttonSq" data-ms="2">
        Open menu
      </button>
      <button
        className="cm c-menuclose buttonSq"
        data-ms="2"
        style={{ marginLeft: "16px" }}
      >
        close menu
      </button>
      <br />
      <div className="card cm c-readmore" data-ms="2">
        <a href="/">
          <span>
            <div className="cardimgcontainer cm c-readmore" data-ms="2">
              <img
                data-ms="2"
                className="cm c-readmore"
                src="https://res.cloudinary.com/drfbjbnqj/image/upload/v1582048227/AL/AL2019_thumb_hdmoce.jpg"
                alt="flower"
              ></img>
            </div>
            <div className="cm c-readmore cardtextcontainer">
              <h5 className="cm c-readmore" data-ms="2">
                Card
              </h5>
              <p className="cm c-readmore" data-ms="2">
                This is a card with an image, Title and link
              </p>
            </div>
          </span>
        </a>
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <div className="container">
        <Hero />
        <VariableCursorSize />
        <CursorAttractEl />
        <CursorHoverShape />
      </div>
      <Cursor />
    </>
  );
}

export default App;
