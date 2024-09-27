import React, { useState } from 'react';
import PdfUploader from './PdfUploader';
import LoadingSpinner from './LoadingSpinner';
import './PdfConverter.css';

function PdfConverter() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloadLink, setDownloadLink] = useState('');
  const [format, setFormat] = useState('docx');

  const onUpload = async (uploadedFile) => {
    setFile(uploadedFile);
    setDownloadLink('');
  };

  const handleConvert = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      // Simulate PDF conversion
      const convertedFile = new Blob([file], { type: format === 'docx' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : 'image/jpeg' });
      const url = URL.createObjectURL(convertedFile);
      setDownloadLink(url);
    } catch (err) {
      setError('Conversion failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pdf-converter">
      <h2>Convert PDF</h2>
      <PdfUploader onUpload={onUpload} />
      <select value={format} onChange={(e) => setFormat(e.target.value)}>
        <option value="docx">Word (.docx)</option>
        <option value="jpeg">JPEG</option>
      </select>
      <button onClick={handleConvert} disabled={loading || !file}>
        {loading ? 'Converting...' : 'Convert PDF'}
      </button>
      {loading && <LoadingSpinner />}
      {error && <div className="error">{error}</div>}
      {downloadLink && <a href={downloadLink} download={`converted.${format}`}>Download Converted File</a>}
    </div>
  );
}

export default PdfConverter;
