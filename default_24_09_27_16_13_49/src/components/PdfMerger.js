import React, { useState } from 'react';
import PdfUploader from './PdfUploader';
import LoadingSpinner from './LoadingSpinner';
import { PDFMerger } from 'pdf-merger-js';
import './PdfMerger.css';

function PdfMerger() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mergedFile, setMergedFile] = useState(null);

  const onUpload = async (file) => {
    setFiles((prevFiles) => [...prevFiles, file]);
  };

  const handleMerge = async () => {
    setLoading(true);
    setError('');
    const merger = new PDFMerger();
    try {
      for (const file of files) {
        await merger.add(file);
      }
      const mergedBlob = await merger.saveAsBlob();
      const url = URL.createObjectURL(mergedBlob);
      setMergedFile(url);
    } catch (err) {
      setError('Merge failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pdf-merger">
      <h2>Merge PDFs</h2>
      <PdfUploader onUpload={onUpload} />
      <button onClick={handleMerge} disabled={loading || files.length === 0}>
        {loading ? 'Merging...' : 'Merge PDFs'}
      </button>
      {loading && <LoadingSpinner />}
      {error && <div className="error">{error}</div>}
      {mergedFile && (
        <a href={mergedFile} download="merged.pdf">Download Merged PDF</a>
      )}
      <ul>
        {files.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PdfMerger;
