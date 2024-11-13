import React from "react";
import "./styles.css";

function InputContent({
  firstContent,
  secondContent,
  firstFileInputRef,
  secondFileInputRef,
  setFirstContent,
  setSecondContent,
  setFirstFileName,
  setSecondFileName,
  setActiveInput,
}) {
  const handleResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleFileUpload = (e, order) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (order === "1") {
          setFirstFileName(file.name);
          setFirstContent(event.target.result);
        } else {
          setSecondFileName(file.name);
          setSecondContent(event.target.result);
        }
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid file");
    }
  };

  const handleFileDrop = (e, order) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (order === "1") {
          setFirstFileName(file.name);
          setFirstContent(event.target.result);
        } else {
          setSecondFileName(file.name);
          setSecondContent(event.target.result);
        }
      };
      reader.readAsText(file);
    } else {
      alert("Please drop a text file (.txt)");
    }
  };

  return (
    <div className="container">
      <div className="input-group">
        <div className="input-container">
          <input
            type="file"
            onChange={(e) => handleFileUpload(e, "1")}
            onFocus={() => setActiveInput("1")}
            className="input-text"
            ref={firstFileInputRef}
          />
          <textarea
            id="first-content"
            value={firstContent}
            onChange={(e) => {
              setFirstContent(e.target.value);
              handleResize(e);
            }}
            placeholder="Enter first content"
            onFocus={() => setActiveInput("1")}
            onDrop={(e) => handleFileDrop(e, "1")}
            onDragOver={(e) => e.preventDefault()}
          />
        </div>
        <div className="input-container">
          <input
            type="file"
            onChange={(e) => handleFileUpload(e, "2")}
            onFocus={() => setActiveInput("2")}
            className="input-text"
            ref={secondFileInputRef}
          />
          <textarea
            id="second-content"
            value={secondContent}
            onChange={(e) => {
              setSecondContent(e.target.value);
              handleResize(e);
            }}
            placeholder="Enter second content"
            onFocus={() => setActiveInput("2")}
            onDrop={(e) => handleFileDrop(e, "2")}
            onDragOver={(e) => e.preventDefault()}
          />
        </div>
      </div>
    </div>
  );
}

export default InputContent;