import "./styles.css";
const OutputResult = ({output, downloadOutput}) => {
  return (
    <div className="output-container">
      <h3 className="output-text">Output</h3>
      <div className="output-field">
      <textarea className="output-textarea"
        readOnly
        value={output}
        />   
      </div>
      <div>
    </div>
      <button className="download-button"  onClick={() => downloadOutput('output.txt', output)}>
        Download
      </button>
    </div>
  );
};

export default OutputResult;
