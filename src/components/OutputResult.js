import React from "react";
import "./styles.css";

const OutputResult = ({ output, downloadOutput }) => {
  return (
    <div className="output-container">
      <div className="output-field">
        <textarea
          className="output-textarea"
          readOnly
          value={output}
          placeholder="No results to display."
        />   
      </div>
      <button
        className="download-button"
        onClick={() => downloadOutput("output.txt", output)}
      >
        Download 📥 
      </button>
    </div>
  );
};

export default OutputResult;
