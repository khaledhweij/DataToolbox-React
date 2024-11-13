import React from "react";
import "./styles.css";

const DocumentsButtons = ({ handleConvert, handleClear, handleMerge, handlePdfGlobal, splitFirstPage, setSplitFirstPage, splitLastPage, setSplitLastPage}) => {
  return (
    <div className="button-group">
      <button className="compare-button" onClick={handleConvert}>
        Convert
      </button>
      <button className="convert-button" onClick={handleMerge}>
        Merge
      </button>
      <button className="convert-button" onClick={() => handlePdfGlobal("splitPdf", "File has been splitted.")}>
        Split
      </button>
      <button className="convert-button" onClick={() => handlePdfGlobal("removePdfPages", "File has been updated.")}>
        Extract
      </button>
      <button className="clear-button" onClick={handleClear}>
        Clear
      </button>
      <div className="page-inputs">
        <div>
          <label>From Page:</label>
          <input
            type="number"
            value={splitFirstPage}
            onChange={(e) => setSplitFirstPage(Number(e.target.value))}
            min="1"
          />
        </div>

        <div>
          <label>To Page:</label>
          <input
            type="number"
            value={splitLastPage}
            onChange={(e) => setSplitLastPage(Number(e.target.value))}
            min="1"
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentsButtons;
