// src/components/ResultsPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve data from state or use default mock data if none is provided
  const data = location.state?.data || {
    extracted_text: "Sample extracted text from PDF analysis.",
    output_pdf_url: "https://example.com/sample_report.pdf",
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Results</h1>

      <div style={styles.resultsContainer}>
        <h2 style={styles.subheading}>Extracted Text:</h2>
        <pre style={styles.textDisplay}>{data.extracted_text}</pre>
        
        <a href={data.output_pdf_url} style={styles.downloadLink} target="_blank" rel="noopener noreferrer">
          Download Report PDF
        </a>
        
        <button onClick={handleGoBack} style={styles.goBackButton}>
          Go Back
        </button>
      </div>
    </div>
  );
};

// Inline styling for the component
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    color: "#ffffff",
    backgroundColor: "#1a1a1a",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "20px",
  },
  resultsContainer: {
    maxWidth: "600px",
    width: "90%",
    backgroundColor: "#333",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "left",
  },
  subheading: {
    fontSize: "1.5rem",
    marginBottom: "10px",
    color: "#FF6D6D",
  },
  textDisplay: {
    backgroundColor: "#222",
    padding: "15px",
    borderRadius: "5px",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    fontSize: "1rem",
    color: "#ddd",
    marginBottom: "20px",
  },
  downloadLink: {
    display: "inline-block",
    backgroundColor: "#4CAF50",
    color: "#ffffff",
    padding: "10px 15px",
    borderRadius: "5px",
    textDecoration: "none",
    textAlign: "center",
    marginBottom: "20px",
  },
  goBackButton: {
    backgroundColor: "#FF6D6D",
    color: "#ffffff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "center",
  },
};

export default ResultsPage;
