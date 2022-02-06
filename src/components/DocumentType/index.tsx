import React, { useEffect, useState } from 'react';
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
        width="270px"
        label="document_type"
        title="Tipo de documento"
        required
        options={documentTypes}
        onSelectValue={value => {
          onSelectValue(Number(value));
          setSelectedValue(Number(value));
        }}
        selectedValue={selectedValue}
      />
    </div>
  );
};

export default DocumentType;
