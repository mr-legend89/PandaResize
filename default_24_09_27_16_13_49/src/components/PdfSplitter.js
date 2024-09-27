import React, { useState } from 'react';
import PdfUploader from './PdfUploader';
import LoadingSpinner from './LoadingSpinner';
import { PDFLib } from 'pdf-lib';
import './PdfSplitter.css';

function PdfSplitter() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloadLinks, setDownloadLinks] = useState([]);

  const onUpload = async (uploadedFile) => {
    setFile(uploadedFile);
    setDownloadLinks([]);
  };

  const handleSplit = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      const pdfBytes = await file.arrayBuffer();
      const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
      const pages = pdfDoc.getPages();

      const links = [];
      for (let i = 0; i < pages.length; i++) {
        const newPdfDoc = await PDFLib.PDFDocument.create();
        const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
        newPdfDoc.addPage(copiedPage);
        const pdfBytes = await newPdfDoc.save();
        const url = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
        links.push({ page: i + 1, url });
      }
      setDownloadLinks(links);
    } catch (err) {
      setError('Split failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pdf-splitter">
      <h2>Split PDF</h2>
      <PdfUploader onUpload={onUpload} />
      <button onClick={handleSplit} disabled={loading || !file}>
        {loading ? 'Splitting...' : 'Split PDF'}
      </button>
      {loading && <LoadingSpinner />}
      {error && <div className="error">{error}</div>}
      <ul>
        {downloadLinks.map(({ page, url }) => (
          <li key={page}>
            <a href={url} download={`page-${page}.pdf`}>Download Page {page}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PdfSplitter;
