import { Input } from 'antd';
import React, { useState } from 'react';

interface FileUploaderProps {
  type: 'image' | 'video';
  onUploadSuccess: (url: string) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ type, onUploadSuccess }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onUploadSuccess(url);
    }
  };

  return (
    <div>
      <Input
        type="file"
        accept={type === 'image' ? 'image/*' : 'video/*'}
        onChange={handleFileChange}
      />
      {previewUrl && (type === 'image' ? (
        <img src={previewUrl} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />
      ) : (
        <video controls src={previewUrl} style={{ width: '100%', marginTop: '10px' }} />
      ))}
    </div>
  );
};

export default FileUploader;
