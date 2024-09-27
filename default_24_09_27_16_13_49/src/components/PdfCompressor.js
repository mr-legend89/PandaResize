import React, { useState } from 'react';
import PdfUploader from './PdfUploader';
import LoadingSpinner from './LoadingSpinner';
import './PdfCompressor.css';

function PdfCompressor() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloadLink, setDownloadLink] = useState('');

  const onUpload = async (uploadedFile) => {
    setFile(uploadedFile);
    setDownloadLink('');
  };

  const handleCompress = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      // Simulate PDF compression
      const compressedFile = new Blob([file], { type: 'application/pdf' });
      const url = URL.createObjectURL(compressedFile);
      setDownloadLink(url);
    } catch (err) {
      setError('Compression failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pdf-compressor">
      <h2>Compress PDF</h2>
      <PdfUploader onUpload={onUpload} />
      <button onClick={handleCompress} disabled={loading || !file}>
        {loading ? 'Compressing...' : 'Compress PDF'}
      </button>
      {loading && <LoadingSpinner />}
      {error && <div className="error">{error}</div>}
      {downloadLink && <a href={downloadLink} download="compressed.pdf">Download Compressed PDF</a>}
    </div>
  );
}

export default PdfCompressor;
