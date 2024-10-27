import "./styles.css";
import React, { useState, useRef} from "react";
import InputContent from "./components/InputContent";
import Button from "./components/Button";
import OutputResult from "./components/OutputResult";
import logo from "./constants/edicom-logo.png";
import BaseButtons from "./components/BaseButtons";
import HighlightedXMLDisplay from "./functions/HighlightedXMLDisplay";

export default function App() {
  const [firstContent, setFirstContent] = useState("");
  const [secondContent, setSecondContent] = useState("");
  const [fisrtFileName, setFirstFileName] = useState(""); 
  const [secondFileName, setSecondFileName] = useState("");
  const [output, setOutput] = useState("");
  const firstFileInputRef = useRef(null);
  const secondFileInputRef = useRef(null);
  const [action, setAction] = useState("encode");
  const [activeInput, setActiveInput] = useState("1"); // Default focus on first input
  const [showDiv, setShowDiv] = useState(false);
  const [firstComparedOutput, setfirstComparedOutput] = useState("");
  const [secondComparedOutput, setsecondComparedOutput] = useState("");

  const getContent = () => {
    return activeInput === "1" ? firstContent : secondContent;
  };

  const handleCompare = () => {
    if (firstContent === secondContent) {
      setOutput("The contents are identical.");
    } else {
      compareContents("/diffFormatter/compare");
    }
  };

  const handleClear = () => {
    setFirstContent("");
    setSecondContent("");
    setFirstFileName("");
    setSecondFileName("");
    setOutput("");
    setShowDiv(false);
    setfirstComparedOutput("");
    setsecondComparedOutput("");
    if (firstFileInputRef.current) {
      firstFileInputRef.current.value = "";
    }
    if (secondFileInputRef.current) {
      secondFileInputRef.current.value = "";
    }
  };

const compareContents = async () => {
  try{
    if (firstContent === "" || secondContent === ""){
      setOutput("Contents cannot be emtpy.");
      return;
    }
  const response = await fetch(
    "http://localhost:8080/diffFormatter/compare",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstContent: firstContent,
        secondContent: secondContent,
      }),
    }
  );
  if (response.ok) {
    const data = await response.json();
    if(data.firstContent !== '' && data.secondContent !== ''){
    setfirstComparedOutput(data.firstContent);
    setsecondComparedOutput(data.secondContent);
    setShowDiv(true);
  }
    setOutput(data.output);
  } else {
    const error = await response.text(); 
    setOutput("Error occurred while fetching the response. " + error);
  }
} catch (error) {
  setOutput(`Fetch error: ${error.message}`);
}
};

const handleViewPdf = (pdfString) => {
  try {
    const byteCharacters = atob(pdfString);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank'); 
  } catch (error){
    alert('Make sure the content is PDF in base64');
  }
};


const handleGlobal = async (action, isAlert) => {
  setOutput("");
  try {
    if (getContent() === ""){
      if(isAlert) {
        alert('Content cannot be emtpy.');
      } else {
      setOutput("Content cannot be emtpy.");
    }
    return;
    }

    if(action === "showPdf"){
      handleViewPdf(getContent());
      return;
    }

  const response = await fetch(
    "http://localhost:8080/diffFormatter/" + action,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: getContent()
    }
  );
  if (response.ok) {
    const data = await response.text(); 
    if(isAlert){
      alert(data);
    } else if(activeInput === "1"){
      setFirstContent(data);
    } else if (activeInput === "2"){
      setSecondContent(data);
    } else {
      setOutput(data);
    }
  } else {
    const error = await response.text(); 
    setOutput("Error occurred while fetching the response. " + error);
  }
} catch (error) {
  setOutput(`Fetch error: ${error.message}`);
}
};

const downloadOutput = (filename, content) => {
  if (!content.trim()) {
    alert('Output is empty, nothing to download.');
    return;
  }
  const blob = new Blob([content], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};


  return (
    <div className="App">
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="title-container">
        <h1 className="title">XML - JSON - EDI Formatter & Comparator</h1>
      </div>
    </header>
      <InputContent firstContent={firstContent} secondContent={secondContent} firstFileInputRef={firstFileInputRef} secondFileInputRef={secondFileInputRef} setFirstContent={setFirstContent} 
      setSecondContent={setSecondContent} setFirstFileName={setFirstFileName} setSecondFileName={setSecondFileName} setActiveInput={setActiveInput}/>
      <BaseButtons handleGlobal={handleGlobal}/>
      <Button handleClear={handleClear} handleCompare={handleCompare} firstContent={firstContent} handleGlobal={handleGlobal}/>
      <OutputResult output={output} downloadOutput={downloadOutput}/>
      {showDiv && (
            <div className="container">
            <HighlightedXMLDisplay firstComparedOutput={firstComparedOutput} secondComparedOutput={secondComparedOutput} />
            </div>
    )}
    </div>
  );
}
