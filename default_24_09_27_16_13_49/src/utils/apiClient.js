import axios from 'axios';

export const compressPDF = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/compress`, formData);
  return response.data;
};

export const convertPDF = async (file, format) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('format', format);
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/convert`, formData);
  return response.data;
};
