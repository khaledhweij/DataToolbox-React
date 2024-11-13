import React from "react";
import "./styles.css";

function InputDocument({
  fileNames,
  setFileNames,
  fileInputRef,
  setFiles,
  files,
}) {

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    const names = uploadedFiles.map((file) => file.name);
    setFileNames([...fileNames, ...names]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles])
  };

  const handleRemoveFile = (nameToRemove) => {
    setFileNames((prevNames) => prevNames.filter((name) => name !== nameToRemove));
    
    setFiles((prevFiles) => 
      prevFiles.filter((file) => file.name !== nameToRemove)
    );
  };

  return (
    <div className="container">
      <input
        className="input-file-button"
        type="file"
        multiple
        onChange={handleFileUpload}
        ref={fileInputRef}
      />
      <div className="file-display-box">
        {fileNames.length === 0 ? (
          <div className="placeholder-text">No files selected</div>) : fileNames.map((name, index) => (
          <div className="file-name" key={index}>
            {name}
            <span
              onClick={() => handleRemoveFile(name)}
              role="button"
              aria-label="Remove file"
              style={{
                cursor: "pointer",
                marginLeft: "10px",
                fontSize: "15px", 
              }}
            >
              ❌ 
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}


export default InputDocument;