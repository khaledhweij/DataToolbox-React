import React from "react";
import "./styles.css";

const OutputDocument = ({ output, downloadUrl, downloadFilename}) => {
  return (
    <div >
      <div className="file-display-box">
        {output ? (
          output
        ) : (
          <div className="placeholder-text">No results to display.</div>
        )}
      </div>
      {downloadUrl && (
        <button
        className="download-button"
        onClick={() => {
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = downloadFilename;
            link.click();
        }}
        >
        Download Result
        </button>
      )} 
      {downloadUrl && (
        <button
        className="download-button"
        onClick={() => {
            window.open(downloadUrl, '_blank'); 
        }}
        >
        Show Result
        </button>
      )}
    </div>
  );
};

export default OutputDocument;
