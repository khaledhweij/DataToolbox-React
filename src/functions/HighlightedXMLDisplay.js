import React, { useState, useEffect } from 'react';
import "../components/styles.css";

const HighlightedXMLDisplay = ({ firstComparedOutput, secondComparedOutput }) => {
  const [highlightedFirstXml, setHighlightedFirstXml] = useState('');
  const [highlightedSecondXml, setHighlightedSecondXml] = useState('');


  const highlightXml = (xml) => {
    return xml
    .replace(/</g, '&lt;')  // Escape opening angle brackets
    .replace(/>/g, '&gt;')
    .replace(/&lt;Highlight&gt;([\s\S]*?)&lt;\/Highlight&gt;/g, (match, p1) => {
        return `<span style="background-color: yellow; font-weight: bold;">${p1}</span>`;
      })
  };

  useEffect(() => {
    setHighlightedFirstXml(highlightXml(firstComparedOutput));
  }, [firstComparedOutput]);

  useEffect(() => {
    setHighlightedSecondXml(highlightXml(secondComparedOutput));
  }, [secondComparedOutput]);

  return (
    <div className='compare-group'>
      <div className='compare-container'>
        <div className="compare-html"
          dangerouslySetInnerHTML={{ __html: highlightedFirstXml }}
        ></div>
      </div>
      <div className='compare-container'>
        <div className="compare-html"
          dangerouslySetInnerHTML={{ __html: highlightedSecondXml }}
        ></div>
      </div>
    </div>
  );
};

export default HighlightedXMLDisplay;