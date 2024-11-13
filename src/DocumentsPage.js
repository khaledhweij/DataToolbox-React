import React, { useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import logo from "./constants/header-logo.png";
import InputDocument from "./components/InputDocuments.js";
import DocumentsButtons from "./components/DocumentsButtons";
import OutputDocument from "./components/OutputDocument.js"

const DocumentsPage = () => {
    const [output, setOutput] = useState("");
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);
    const [fileNames, setFileNames] = useState([]);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [splitFirstPage, setSplitFirstPage] = useState(1);
    const [splitLastPage, setSplitLastPage] = useState(1);  
    const [downloadFilename, setDownloadFilename] = useState("result.pdf");
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/"); 
      };

    const handleClear = () => {
      setFileNames([])
      setFiles([])
      setOutput("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setDownloadUrl(null);
      setSplitFirstPage(1);
      setSplitLastPage(1);
    };

    const handleConvert = async () => {
      alert("The option is under development, please use sharepoint to convert docx to PDF.");
      /*
      if (fileNames.length !== 1) {
        alert("Please upload only one file for conversion.");
        return;
      }
    
      const file = files[0];
      const fileType = file.type;
    
      if (
        fileType !== "application/pdf" &&
        fileType !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        alert("Please upload a PDF or DOCX file.");
        return;
      }
    
      const formData = new FormData();
      formData.append("file", file);
    
      try {
        const response = await fetch("http://localhost:8080/DataToolbox/convertFile", {
          method: "POST",
          body: formData,
        });
    
        if (!response.ok) {
          throw new Error("Conversion failed");
        }
    
        const blob = await response.blob(); // Get the response as a blob for download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
    
        
        link.href = url;
        link.setAttribute(
          "download",
          `converted_file.${fileType === "application/pdf" ? "docx" : "pdf"}`
        ); // Set filename and extension based on conversion type
        document.body.appendChild(link);
        link.click();
        link.remove();
    
      } catch (error) {
        alert("Conversion failed:", error);
      }
        */
    };    
    
    const handleMerge = async () => {
      if (files.length === 0) {
        alert("Please select at least one PDF to merge.");
        return;
      }
  
      const allFilesArePdfs = files.every((file) => {
        return file.name.endsWith(".pdf");
      });
    
      if (!allFilesArePdfs) {
        alert("Please select only PDF files.");
        return;
      }

      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
  
      try {
        const response =  await fetch("http://localhost:8080/DataToolbox/mergeFiles", {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          setDownloadUrl(url);
          setOutput("Files have been merged.");
          setDownloadFilename("Merged.pdf")
        } else {
          alert("Failed to merge PDFs");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const handlePdfGlobal = async (action, outputMessage) => {
      if (files.length !== 1) {
        alert("Please select one PDF.");
        return;
      }
  
      const allFilesArePdfs = files.every((file) => {
        return file.name.endsWith(".pdf");
      });
    
      if (!allFilesArePdfs) {
        alert("Please select only PDF file.");
        return;
      }
      const formData = new FormData();
      formData.append("file", files[0]); // Your file here
      formData.append("firstPage", splitFirstPage); // Set first page
      formData.append("lastPage", splitLastPage);  // Set last page
    
      try {
        const response = await fetch("http://localhost:8080/DataToolbox/" + action, {
          method: "POST",
          body: formData,
        });
    
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          setDownloadUrl(url);
          setOutput(outputMessage);
          setDownloadFilename("result.pdf")
        } else {
          alert("Failed to split PDFs");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };


    return (
    <div className="App">
      <div className="main-content">
        <header className="header">
        <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="title-container">
            <h1 className="title">Documents Handler (PDF - DOCX)</h1>
            <button className="new-page-button" onClick={handleButtonClick}>JSON - XML - EDI - PDF Handler</button>
        </div>
        </header>
        <InputDocument
        fileNames={fileNames}
        setFileNames={setFileNames}
        fileInputRef={fileInputRef} 
        setFiles={setFiles}
        files={files}
        />
        <DocumentsButtons 
        handleClear={handleClear} 
        handleConvert={handleConvert}  
        handleMerge={handleMerge} 
        handlePdfGlobal={handlePdfGlobal}
        splitFirstPage={splitFirstPage}
        setSplitFirstPage={setSplitFirstPage}
        splitLastPage={splitLastPage}
        setSplitLastPage={setSplitLastPage}
        />
        <OutputDocument downloadUrl={downloadUrl} output={output} downloadFilename={downloadFilename}/>
        </div>
        <div className="footer-text">
          Internally Developed - For Internal Use - Version 1.0
        </div>
    </div>
    );
    };

export default DocumentsPage;