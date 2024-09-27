import { PDFLib } from 'pdf-lib';

export const mergePDFs = async (pdfFiles) => {
  const merger = new PDFLib.PDFDocument();
  for (const pdfFile of pdfFiles) {
    const pdfDoc = await PDFLib.PDFDocument.load(await pdfFile.arrayBuffer());
    const pages = pdfDoc.getPages();
    pages.forEach((page) => {
      merger.addPage(page);
    });
  }
  return await merger.save();
};

export const splitPDF = async (pdfFile) => {
  const pdfDoc = await PDFLib.PDFDocument.load(await pdfFile.arrayBuffer());
  const pages = pdfDoc.getPages();
  return pages.map((page) => page);
};
