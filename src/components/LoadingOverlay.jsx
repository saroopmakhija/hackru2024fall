// src/components/LoadingOverlay.jsx
import React from 'react';

const LoadingOverlay = ({ message = "Loading..." }) => {
  return (
    <div style={overlayStyles.container}>
      <div style={overlayStyles.messageBox}>
        <p>{message}</p>
      </div>
    </div>
  );
};

const overlayStyles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  messageBox: {
    backgroundColor: '#333',
    padding: '20px',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '1.2rem',
    textAlign: 'center',
  },
};

export default LoadingOverlay;
