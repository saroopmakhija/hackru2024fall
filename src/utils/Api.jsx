// src/api/api.js
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://127.0.0.1:5000/pdf-analysis', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('File upload failed');
    }

    const data = await response.json();
    console.log('File upload successful:', data);
    return data; // Return the response data if needed in your component
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};
