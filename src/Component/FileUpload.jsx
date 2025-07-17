import React, { useRef, useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { GrView } from 'react-icons/gr';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { MdOutlineDriveFolderUpload } from "react-icons/md";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [tableData, setTableData] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);

    const totalSize = file.size;
    const chunkSize = 50 * 1024;
    let uploaded = 0;

    const interval = setInterval(() => {
      uploaded += chunkSize;
      const progress = Math.min((uploaded / totalSize) * 100, 100);
      setUploadProgress(progress.toFixed(0));

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => setUploading(false), 1000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [file]);

  const handleFileChange = (e) => {
    if (uploading) return;
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= 5 * 1024 * 1024) {
      setFile(selectedFile);
      setTableData(null);
    } else {
      alert('File must be less than 5 MB.');
      e.target.value = null;
    }
  };

  const handleClear = () => {
    if (uploading) return;
    setFile(null);
    setTableData(null);
    setUploadProgress(0);
    fileInputRef.current.value = null;
  };

  const handleView = () => {
    if (!file || uploading) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line !== '');
      const parsedData = rows.map((row) => row.split(',').map(cell => cell.trim()));
      setTableData(parsedData);
    };
    reader.readAsText(file);
  };

  const handleUpload = () => {
    if (!file || uploading) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const rows = text
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line !== '');
      const parsedData = rows.map((row) => row.split(',').map(cell => cell.trim()));

      const headers = parsedData[0];
      if (!headers || headers.length === 0) {
        alert("CSV file has no headers.");
        return;
      }

      const jsonData = parsedData.slice(1).map((row) => {
        const obj = {};
        headers.forEach((header, i) => {
          obj[header] = row[i] || '';
        });
        return obj;
      });

      try {
        const response = await fetch('https://localhost:7068/api/Contribution/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(jsonData),
        });

        if (response.ok) {
          const result = await response.json();
          alert('Upload successful!');
          console.log(result);
        } else {
          alert('Upload failed!');
          console.error(await response.text());
        }
      } catch (error) {
        alert('Upload error!');
        console.error('Error posting to backend:', error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl p-10 mx-auto mt-10 bg-white border-2 border-gray-400 border-dashed rounded-lg shadow-md">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".csv,text/csv"
      />

      <div
        onClick={() => !uploading && fileInputRef.current.click()}
        className={`flex flex-col items-center justify-center h-48 text-gray-400 cursor-pointer ${uploading ? 'pointer-events-none opacity-60' : ''}`}
      >
        <img
          src="https://png.pngtree.com/png-vector/20190501/ourmid/pngtree-folder-icon-design-png-image_1014932.jpg"
          alt="Upload icon"
          className="w-16 h-16 mb-2 opacity-60"
        />
        <p className="text-center">Choose a CSV file (Max 5 MB)</p>
        {file && (
          <p className="mt-2 text-sm text-gray-500">
            {file.name} ({(file.size / 1024).toFixed(2)} KB)
          </p>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-6 mb-6">
        <button
          onClick={() => !uploading && fileInputRef.current.click()}
          className="flex items-center gap-1 p-3 text-white border"
          style={{ backgroundColor: '#B0B0B0', borderColor: '#B0B0B0' }}
          disabled={uploading}
        >
          <FaPlus /> Choose
        </button>

        <button
          onClick={handleView}
          className="flex items-center gap-1 p-3 text-white"
          style={{ backgroundColor: '#B0B0B0', borderColor: '#B0B0B0' }}
          disabled={!file || uploading}
        >
          <GrView /> View File
        </button>

        <button
          onClick={handleUpload}
          className="flex items-center gap-1 p-3 text-white"
          style={{ backgroundColor: '#B0B0B0', borderColor: '#B0B0B0' }}
          disabled={!file || uploading}
        >
          <MdOutlineDriveFolderUpload /> Upload File
        </button>

        <button
          onClick={handleClear}
          className="flex items-center gap-1 p-3 text-white"
          style={{ backgroundColor: '#B0B0B0', borderColor: '#B0B0B0' }}
          disabled={!file || uploading}
        >
          <IoIosCloseCircleOutline className="text-lg" /> Clear
        </button>
      </div>

      {file && (
        <div className="mt-4">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 transition-all duration-300 bg-[#16056B] rounded-full"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {tableData && (
        <div className="mt-6 overflow-auto border border-gray-300 rounded-md">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-[#16056B] text-white">
              <tr>
                {tableData[0].map((header, idx) => (
                  <th key={idx} className="px-4 py-2 border-r">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.slice(1).map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? 'bg-gray-100' : ''}
                >
                  {row.map((cell, colIndex) => (
                    <td key={colIndex} className="px-4 py-2 border-r">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}




