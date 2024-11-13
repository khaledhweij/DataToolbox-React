import "./styles.css";
import React, { useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import InputContent from "./components/InputContent";
import Button from "./components/Button";
import OutputResult from "./components/OutputResult";
import logo from "./constants/header-logo.png";
import BaseButtons from "./components/BaseButtons";
import HighlightedXMLDisplay from "./functions/HighlightedXMLDisplay";

export default function MainPage() {
  const [firstContent, setFirstContent] = useState("");
  const [secondContent, setSecondContent] = useState("");
  const [fisrtFileName, setFirstFileName] = useState(""); 
  const [secondFileName, setSecondFileName] = useState("");
  const [output, setOutput] = useState("");
  const firstFileInputRef = useRef(null);
  const secondFileInputRef = useRef(null);
  const [activeInput, setActiveInput] = useState("1");
  const [showDiv, setShowDiv] = useState(false);
  const [firstComparedOutput, setFirstComparedOutput] = useState("");
  const [secondComparedOutput, setSecondComparedOutput] = useState("");
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/DocumentsPage"); 
  };

  const getContent = () => {
    return activeInput === "1" ? firstContent : secondContent;
  };

  const handleCompare = () => {
    if (firstContent === secondContent) {
      setOutput("The contents are identical.");
    } else {
      compareContents();
    }
  };

  const handleClear = () => {
    setFirstContent("");
    setSecondContent("");
    setFirstFileName("");
    setSecondFileName("");
    setOutput("");
    setShowDiv(false);
    setFirstComparedOutput("");
    setSecondComparedOutput("");
    if (firstFileInputRef.current) {
      firstFileInputRef.current.value = "";
    }
    if (secondFileInputRef.current) {
      secondFileInputRef.current.value = "";
    }
  };

  const compareContents = async () => {
    try {
      if (firstContent === "" || secondContent === ""){
        setOutput("Contents cannot be empty.");
        return;
      }
      const response = await fetch("http://localhost:8080/DataToolbox/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstContent, secondContent }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.firstContent !== '' && data.secondContent !== '') {
          setFirstComparedOutput(data.firstContent);
          setSecondComparedOutput(data.secondContent);
          setShowDiv(true);
        }
        setOutput(data.output);
      } else {
        const error = await response.text(); 
        alert(error);
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

  const handleGlobal = async (action, isAlert) => {
    setOutput("");
    try {
      if (getContent() === ""){
        alert('Content cannot be empty.');
        return;
      }

      if (action === "showPdf") {
        handleViewPdf(getContent());
        return;
      }

      const response = await fetch("http://localhost:8080/DataToolbox/" + action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: getContent()
      });

      if (response.ok) {
        const data = await response.text(); 
        if (isAlert) {
          alert(data);
        } else if (activeInput === "1") {
          setFirstContent(data);
        } else if (activeInput === "2") {
          setSecondContent(data);
        } else {
          setOutput(data);
        }
      } else {
        const error = await response.text(); 
        alert(error);
      }
    } catch (error) {
      setOutput(`Fetch error: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <div className="main-content">
      <header className="header">
      {logo !=null && (
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>     
       )}
        <div className="title-container">
          <h1 className="title">Data Workflow Assistant (JSON - XML - EDI - PDF)</h1>
          <button className="new-page-button" onClick={handleButtonClick}>PDF - DOCX Handler</button>
        </div>
      </header>
      <InputContent
        firstContent={firstContent}
        secondContent={secondContent}
        firstFileInputRef={firstFileInputRef}
        secondFileInputRef={secondFileInputRef}
        setFirstContent={setFirstContent} 
        setSecondContent={setSecondContent} 
        setFirstFileName={setFirstFileName} 
        setSecondFileName={setSecondFileName} 
        setActiveInput={setActiveInput}
      />
      <BaseButtons handleGlobal={handleGlobal} />
      <Button 
        handleClear={handleClear} 
        handleCompare={handleCompare}  
        handleGlobal={handleGlobal} 
      />
      <OutputResult output={output} downloadOutput={downloadOutput} />
      {showDiv && (
        <div className="container">
          <HighlightedXMLDisplay 
            firstComparedOutput={firstComparedOutput} 
            secondComparedOutput={secondComparedOutput} 
          />
        </div>
      )}
      </div>
      <div className="footer-text">
        Internally Developed - For Internal Use - Version 1.0
      </div>
    </div>
  );
}

