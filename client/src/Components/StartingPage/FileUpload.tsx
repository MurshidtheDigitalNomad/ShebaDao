import { useState } from 'react';
import { Upload, Check } from 'lucide-react';

const FileUpload = ({ file, setFile }: { file: File | null; setFile: (file: File | null) => void }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        border: `2px dashed ${isDragging ? '#E45A92' : 'rgba(93, 47, 119, 0.3)'}`,
        borderRadius: '1rem',
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: isDragging ? 'rgba(228, 90, 146, 0.05)' : 'rgba(255,255,255,0.03)',
        transition: 'all 0.3s',
        cursor: 'pointer',
        backdropFilter: 'blur(10px)',
        boxShadow: isDragging ? '0 0 30px rgba(228, 90, 146, 0.3)' : 'none'
      }}
      onClick={() => document.getElementById('file-input')?.click()}
    >
      <input
        id="file-input"
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      
      {file ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <Check size={24} color="#E45A92" />
          <span style={{ color: 'white', fontWeight: '500' }}>{file.name}</span>
        </div>
      ) : (
        <>
          <Upload size={48} color="#FFACAC" style={{ margin: '0 auto 1rem', display: 'block' }} />
          <p style={{ color: 'white', fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.5rem' }}>
            Drop your resume here
          </p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
            or click to browse (PDF only)
          </p>
        </>
      )}
    </div>
  );
};

export default FileUpload;