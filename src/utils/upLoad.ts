import { RcFile } from 'antd/es/upload/interface';

const customUpload = (options: { file: RcFile; onSuccess?: (response: any) => void; onError?: (error: any) => void }) => {
  const { file, onSuccess, onError } = options;
  const reader = new FileReader();

  reader.onload = () => {
    const base64File = reader.result as string;

    if (onSuccess) onSuccess('Successfully!');
  };

  reader.onerror = (error) => {
    if (onError) onError(error);
  };

  reader.readAsDataURL(file);
};

export default customUpload;