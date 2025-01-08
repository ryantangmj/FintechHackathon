import React, { useState } from "react";

function SmartContract() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const handleButtonClick = () => {
    alert("Will add functionality later");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Smart Contract Page</h1>
      <textarea
        placeholder="Enter text here"
        value={inputValue}
        onChange={handleInputChange}
        style={{
          marginBottom: "20px",
          width: "500px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          resize: "none",
          overflow: "hidden",
        }}
      />
      <br />
      <button
        onClick={handleButtonClick}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Verify
      </button>
    </div>
  );
}

export default SmartContract;
