import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from 'services/api';
import Select from 'components/Select';
import { DocumentType as DocType } from 'types';

type DocumentTypeProps = {
  onSelectValue: (value: number) => void;
};

type SelectOptions = {
  name: string;
  value: number;
};

const DocumentType = ({ onSelectValue }: DocumentTypeProps): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState(0);
  const [documentTypes, setDocumentTypes] = useState<SelectOptions[]>([]);

  const {
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const loadDocumentTypes = async (): Promise<void> => {
      const response = await api.get<DocType[]>(`/document-types`);
      const listDocuments = response.data.map(docs => ({
        name: docs.name,
        value: docs.id,
      }));
      setDocumentTypes(listDocuments);
    };

    loadDocumentTypes();
  }, []);

  return (
    <div>
      <Select
        label="document_type"
        title="Tipo de documento"
        errorMsg="Campo obligatório"
        register={register}
        required
        errors={errors}
        options={documentTypes}
        onSelectValue={(value: number) => {
          onSelectValue(value);
          setSelectedValue(value);
        }}
        selectedValue={selectedValue}
      />
    </div>
  );
};

export default DocumentType;
