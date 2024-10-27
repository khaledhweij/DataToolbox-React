import "./styles.css";

function inputContent({firstContent, secondContent, firstFileInputRef, secondFileInputRef, setFirstContent, setSecondContent, setFirstFileName, setSecondFileName, setActiveInput}) {


  // Function to auto-resize textarea
  const handleResize = (e) => {
    e.target.style.height = "auto"; // Reset height to auto to shrink if needed
    e.target.style.height = '${e.target.scrollHeight}px'; // Set height to scrollHeight
  };

  const handleFileUpload = (e, order) => {
    const file = e.target.files[0];
    if (file ) {
      const reader = new FileReader();
      
      if(order ==="1"){
      reader.onload = (event) => {
        setFirstFileName(file.name); // Set the file name in state
        setFirstContent(event.target.result); 
      };
    } else {
      reader.onload = (event) => {
        setSecondFileName(file.name); // Set the file name in state
        setSecondContent(event.target.result); 
      };
    }
      reader.readAsText(file);
    } else {
      alert("Please upload a valid file");
    }
  };

  return (
    <div className="container">
      <div className="input-group">
        <div className="input-container">
          <label className="input-text">Enter First Content</label>
          <input type="file" onChange={(e) => handleFileUpload(e, "1")} onFocus={() => setActiveInput("1")} className="input-text" ref={firstFileInputRef}></input>
          <textarea
            id="first-content"
            value={firstContent}
            onChange={(e) => {
              setFirstContent(e.target.value);
              handleResize(e);
            }}
            placeholder="Enter first content"
            onFocus={() => setActiveInput("1")}
          />
        </div>
        <div className="input-container">
          <div></div>
          <label className="input-text">Enter Second Content</label>
          <input type="file" onChange={(e) => handleFileUpload(e, "2")} onFocus={() => setActiveInput("2")} className="input-text" ref={secondFileInputRef}></input>
          <textarea
            id="second-content"
            value={secondContent}
            onChange={(e) => {
              setSecondContent(e.target.value);
              handleResize(e);
            }}
            placeholder="Enter second content"
            onFocus={() => setActiveInput("2")}
          />
        </div>
      </div>
    </div>
  );
}

export default inputContent;
