// src/components/LandingPage.jsx
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadFile } from '../utils/Api'; // Replace with your actual API function
import LoadingOverlay from './LoadingOverlay'; // Make sure this component is correctly set up

const LandingPage = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-focus the text input on component mount if needed
    if (fileInputRef.current) {
      fileInputRef.current.focus();
    }
  }, []);

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log('Selected file:', selectedFile.name);
    }
  };

  const handleUpload = async () => {
    if (file) {
      setLoading(true);
      try {
        // Call your API function to upload the file
        const response = await uploadFile(file); 
        const { extracted_text, output_pdf_url } = response; // Assuming the backend response contains these fields

        // Navigate to ResultsPage and pass the response data
        navigate('/results', { state: { data: { extracted_text, output_pdf_url } } });
        
        setLoading(false);
        setFile(null); // Clear file after upload
      } catch (error) {
        console.error('Error uploading file:', error);
        setLoading(false);
      }
    }
  };
// const handleUpload = async () => {
//     if (file) {
//       setLoading(true);
//       try {
//         // Mock API response if backend is unavailable
//         const response = process.env.REACT_APP_USE_MOCK === "true"
//           ? { extracted_text: "Mocked extracted text.", output_pdf_url: "https://example.com/sample.pdf" }
//           : await uploadFile(file);
  
//         navigate('/results', { state: { data: response } });
//         setLoading(false);
//         setFile(null); // Clear file after upload
//       } catch (error) {
//         console.error('Error uploading file:', error);
//         setLoading(false);
//       }
//     }
//   };
  

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleUpload();
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Upload File</h1>

      {loading && <LoadingOverlay message="Uploading..." />}

      {file && (
        <div style={styles.filePreview}>
          <span style={styles.fileIcon}>📄</span>
          <div style={styles.fileInfo}>
            <p style={styles.fileName}>{file.name}</p>
            <p style={styles.fileType}>{file.type || 'PDF'}</p>
          </div>
          <button onClick={handleRemoveFile} style={styles.removeButton}>❌</button>
        </div>
      )}

      <div style={styles.inputContainer}>
        <button onClick={handleFileButtonClick} style={styles.iconButton}>📎</button>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        
        <input
          type="text"
          placeholder="Enter doctor's notes"
          style={styles.input}
          onKeyDown={handleKeyPress}
        />
        
        <button onClick={handleUpload} style={styles.sendButton}>⬆️</button>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: '20px',
    boxSizing: 'border-box',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
    textAlign: 'center',
  },
  filePreview: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: '10px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '600px',
    marginBottom: '10px',
  },
  fileIcon: {
    fontSize: '1.5rem',
    marginRight: '10px',
    color: '#FF6D6D',
  },
  fileInfo: {
    flexGrow: 1,
  },
  fileName: {
    margin: 0,
    color: '#fff',
    fontSize: '0.9rem',
  },
  fileType: {
    margin: 0,
    color: '#888',
    fontSize: '0.75rem',
  },
  removeButton: {
    background: 'none',
    border: 'none',
    color: '#FF6D6D',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '90%',
    maxWidth: '600px',
    padding: '15px',
    borderRadius: '50px',
    backgroundColor: '#333',
    boxSizing: 'border-box',
  },
  iconButton: {
    fontSize: '1.5rem',
    marginRight: '10px',
    background: 'none',
    border: 'none',
    color: '#888',
    cursor: 'pointer',
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: '1rem',
    padding: '10px',
  },
  sendButton: {
    fontSize: '1.5rem',
    background: 'none',
    border: 'none',
    color: '#888',
    cursor: 'pointer',
  },
};

export default LandingPage;
