import React, { useState, useEffect } from "react";
import "./index.css";

const TextAnalysis = () => {
  const [text, setText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [highlightedText, setHighlightedText] = useState("");

  useEffect(() => {
    setHighlightedText(text);
  }, [text]);

  const countUniqueWords = (inputText) => {
    const words = inputText.toLowerCase().match(/\b\w+\b/g) || [];
    const uniqueWords = new Set(words);
    return uniqueWords.size;
  };

  const countCharacters = (inputText) => {
    const characters = inputText.replace(/[^\w]/g, "");
    return characters.length;
  };

  const handleReplace = () => {
    const regex = new RegExp(searchText, "g");
    const replacedText = text.replace(regex, replaceText);
    setText(replacedText);

    const highlighted = replacedText.replace(
      new RegExp(replaceText, "g"),
      `<mark>${replaceText}</mark>`
    );
    setHighlightedText(highlighted);
  };

  return (
    <div className="text-analysis-container">
      <h1>Real-Time Text Analysis</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your text here..."
      />

      <div className="statistics">
        <p>Unique Words: {countUniqueWords(text)}</p>
        <p>
          Character Count (Excluding Spaces & Punctuation):{" "}
          {countCharacters(text)}
        </p>
      </div>

      <div className="replacement-container">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Text to replace"
        />
        <input
          type="text"
          value={replaceText}
          onChange={(e) => setReplaceText(e.target.value)}
          placeholder="Replacement text"
        />
        <button onClick={handleReplace}>Replace All</button>
      </div>

      <div
        className="highlighted-output"
        dangerouslySetInnerHTML={{ __html: highlightedText }}
      ></div>
    </div>
  );
};

export default TextAnalysis;
