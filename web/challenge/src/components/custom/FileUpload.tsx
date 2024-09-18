import React, { useCallback, useState } from 'react';
import { useDropzone, FileRejection, FileError } from 'react-dropzone';
import { FiUploadCloud, FiTrash2 } from 'react-icons/fi';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { bytesFormat } from '@/utils';

interface FileUploadProps {
  value?: File[];
  onChange?: (files: File[]) => void;
  multiple?: boolean;
  accept?: { [key: string]: string[] };
  maxSize?: number; // Em bytes
  name: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  value = [],
  onChange,
  multiple = true,
  accept = {
    'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    'application/pdf': ['.pdf'],
  },
  maxSize = 5242880, // 5MB por padrão
  name,
}) => {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      let newFiles: File[] = [];

      if (multiple) {
        newFiles = [...value, ...acceptedFiles];
      } else {
        if (acceptedFiles.length > 0) {
          newFiles = [acceptedFiles[0]];
        }
      }

      onChange?.(newFiles);

      if (fileRejections.length > 0) {
        const errorMsgs: string[] = [];
        fileRejections.forEach(({ file, errors }) => {
          errors.forEach((error: FileError) => {
            if (error.code === 'file-too-large') {
              errorMsgs.push(`O arquivo ${file.name} é muito grande.`);
            }
            if (error.code === 'file-invalid-type') {
              errorMsgs.push(`O tipo do arquivo ${file.name} não é permitido.`);
            }
          });
        });
        setErrorMessages(errorMsgs);
      } else {
        // Limpar mensagens de erro se não houver erros
        setErrorMessages([]);
      }
    },
    [onChange, value, multiple]
  );

  const removeFile = (fileToRemove: File) => {
    const updatedFiles = value.filter((file) => file !== fileToRemove);
    onChange?.(updatedFiles);
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    multiple,
    accept,
    maxSize,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div className="space-y-4">
      <Card
        {...getRootProps()}
        className={cn(
          'border-dashed border-2 rounded-md p-6 text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2',
          isDragActive ? 'bg-blue-50 border-blue-400' : 'bg-white border-gray-300'
        )}
        role="button"
        tabIndex={0}
        aria-label="Área de upload de arquivos"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            open();
          }
        }}
      >
        <input {...getInputProps()} name={name} />
        <FiUploadCloud size={48} className="mx-auto text-gray-400" />
        {errorMessages.length > 0 ? (
          <div className="mt-4 text-red-500" role="alert">
            {errorMessages.map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-gray-500">
            {isDragActive
              ? 'Solte o arquivo aqui...'
              : multiple
              ? 'Arraste e solte os arquivos aqui, ou clique no botão abaixo'
              : 'Arraste e solte o arquivo aqui, ou clique no botão abaixo'}
          </p>
        )}

        <Button type="button" onClick={open} variant={'outline'} className="mt-4">
          {multiple ? 'Selecionar Arquivos' : 'Selecionar Arquivo'}
        </Button>
      </Card>

      {value.length > 0 && (
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Arquivo</TableHead>
                <TableHead>Tamanho</TableHead>
                <TableHead
                  className='text-center'
                >Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {value.map((file, index) => (
                <TableRow key={index}>
                  <TableCell>{file.name}</TableCell>
                  <TableCell>{bytesFormat(file.size)}</TableCell>
                  <TableCell
                    className='text-center'
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeFile(file)}
                    >
                      <FiTrash2 className="text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default FileUpload;