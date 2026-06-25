import { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

interface TaskAttachmentsUploaderProps {
  disabled?: boolean;
  onFilesSelected: (files: File[]) => void;
}

export function TaskAttachmentsUploader({ disabled, onFilesSelected }: TaskAttachmentsUploaderProps) {
  const accepted = useMemo(() => ({
    'image/*': [],
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'application/vnd.ms-excel': ['.xls'],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    'text/csv': ['.csv'],
    'text/plain': ['.txt'],
    'application/zip': ['.zip'],
    'application/x-zip-compressed': ['.zip'],
  }), []);

  const dropzone = useDropzone({
    disabled,
    multiple: true,
    accept: accepted,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFilesSelected(acceptedFiles);
      }
    },
  });

  return (
    <div {...dropzone.getRootProps({ className: `dropzone${dropzone.isDragActive ? ' active' : ''}${disabled ? ' disabled' : ''}` })}>
      <input {...dropzone.getInputProps()} />
      <strong>Drop files here or click to upload</strong>
      <p>Images, PDF, Word, Excel, CSV, text, and ZIP are supported.</p>
    </div>
  );
}
