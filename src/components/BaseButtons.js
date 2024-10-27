import React, { useState } from "react";
import "./styles.css";

const BaseButtons = ({handleGlobal}) => {
    const [content, setContent] = useState(""); // State for the content to be encoded/decoded
    const [action, setAction] = useState("encode"); // Default action

  return (
    <div className="base-button-group">

    <div className="base-button-subgroup">
      <button className="base-button" onClick={() => handleGlobal("decode", false)}>
        Decode
      </button>
      <button className="base-button" onClick={() => handleGlobal("encode", false)}>
        Encode
      </button>
      <button className="base-button"  onClick={() => handleGlobal("beautify", false)}>
        Beautify
      </button>
      <button className="base-button"  onClick={() => handleGlobal("validate", true)}>
        Validate
      </button>
      <button  className="base-button" onClick={() => handleGlobal("showPdf", true)}>
        View PDF</button>
      </div>
    </div>
  );
};

export default BaseButtons;
