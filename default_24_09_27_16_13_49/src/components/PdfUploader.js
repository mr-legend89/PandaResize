import React, { useState } from 'react';
import './PdfUploader.css';
import LoadingSpinner from './LoadingSpinner';

function PdfUploader({ onUpload }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.type === 'application/pdf') {
      setFile(uploadedFile);
      setError('');
    } else {
      setError('Please upload a valid PDF file');
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      await onUpload(file);
      setFile(null);
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pdf-uploader">
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>Upload</button>
      {loading && <LoadingSpinner />}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default PdfUploader;
