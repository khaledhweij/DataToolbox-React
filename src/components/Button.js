import React from "react";
import "./styles.css";

const Buttons = ({ handleCompare, handleClear, handleGlobal }) => {
  return (
    <div className="button-group">
      <button className="compare-button" onClick={handleCompare}>
        Compare
      </button>
      <button className="convert-button" onClick={() => handleGlobal("convert", false)}>
        Convert
      </button>
      <button className="clear-button" onClick={handleClear}>
        Clear
      </button>
    </div>
  );
};

export default Buttons;
