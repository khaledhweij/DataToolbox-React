export const getContent = (activeInput, firstContent, secondContent) => {
    return activeInput === "1" ? firstContent : secondContent;
  };
  
  export const handleClear = (
    setFirstContent,
    setSecondContent,
    setFirstFileName,
    setSecondFileName,
    setOutput,
    firstFileInputRef,
    secondFileInputRef
  ) => {
    setFirstContent("");
    setSecondContent("");
    setFirstFileName("");
    setSecondFileName("");
    setOutput("");
    if (firstFileInputRef.current) firstFileInputRef.current.value = "";
    if (secondFileInputRef.current) secondFileInputRef.current.value = "";
  };