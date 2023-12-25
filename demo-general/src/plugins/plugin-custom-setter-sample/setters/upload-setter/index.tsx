import React, { useEffect } from 'react';
import { Upload } from '@alifd/next';
import { event } from '@alilc/lowcode-engine';

const defaultImage = 'https://img01.yzcdn.cn/upload_files/2023/11/07/f6f40a12d0e407df7206162fee241f08.png';

interface FileUploadProps {
  onUploadSuccess: (file: File) => void;
  value: string,
  onChange: (val: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = (props) => {
  console.log("gjl-FileUpload-props", props);
  console.log("gjl-FileUpload-props.value", props.value);

  const { value, onChange, field } = props;

  useEffect(() => {
    const changeSelectValue = (value: string) => {
      onChange(value);
    }
    event.on(`common:magic-cube-setter.changeSelectValue`, changeSelectValue);

    return () => {
      event.off(`common:magic-cube-setter.changeSelectValue`, changeSelectValue);
    }
  }, []);

  const handleBeforeUpload = (file): boolean | PromiseLike<void> => {
    // 在此处执行文件上传前的校验等操作
    return true; // 返回 true 表示允许上传，返回 false 则阻止上传
  };

  const handleUploadSuccess = (file): void => {
    // 在此处处理文件上传成功后的逻辑
    // onUploadSuccess(file);
    onChange(file.imgURL);
    event.emit('magic-cube-setter.bindEvent', file.imgURL, 'magic-cube-setter.bindEvent');
  };

  const handleUploadError = (file): void => {
    // 在此处处理文件上传失败后的逻辑
    console.error(`文件 ${file.name} 上传失败`);
  };

  const uploadButton = (
    <div>
      {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
      <div style={{ marginTop: 8 }}>点击上传</div>
    </div>
  );

  return (
    <Upload
      // action="/upload"
      action="http://localhost:3006/upload"
      accept="image/*"
      beforeUpload={handleBeforeUpload}
      onSuccess={handleUploadSuccess}
      onError={handleUploadError}
    >
      {value ? <img src={value} style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  );
};

export default FileUpload;
