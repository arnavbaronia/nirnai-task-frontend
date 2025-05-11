import React, { useState, useRef } from 'react';
import { useTransactions } from '@/hooks/useTransactions';
import Button from '../common/Button';
import Spinner from '../common/Spinner';

const PdfUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadPdf, isLoading, error } = useTransactions();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      setFile(null);
      // You could add error handling or notifications here
      alert('Please select a valid PDF file.');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
    } else {
      alert('Please drop a valid PDF file.');
    }
  };

  const handleUpload = async () => {
    if (file) {
      await uploadPdf(file);
      // Reset the file after upload
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Upload Property Document</h2>
      
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
          isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileSelector}
      >
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
        />
        
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        
        <p className="mt-2 text-sm text-gray-600">
          {file ? file.name : 'Drag & drop a PDF file here, or click to select'}
        </p>
        <p className="mt-1 text-xs text-gray-500">PDF files only (max. 50MB)</p>
      </div>

      {file && (
        <div className="mt-4 flex justify-between items-center p-3 bg-gray-50 rounded-md">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-gray-400 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-gray-700">{file.name}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFile(null);
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
          <p className="text-sm">{error.message}</p>
        </div>
      )}

      <div className="mt-6">
        <Button
          type="button"
          variant="primary"
          onClick={handleUpload}
          disabled={!file || isLoading}
          loading={isLoading}
          fullWidth
        >
          {isLoading ? 'Processing...' : 'Upload and Process PDF'}
        </Button>
      </div>
    </div>
  );
};

export default PdfUploader;