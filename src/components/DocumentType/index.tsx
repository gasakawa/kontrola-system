import React, { useEffect, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

import api from 'services/api';
import Select from 'components/Select';
import { DocumentType as DocType, SelectOptions } from 'types';

type FormData = {
  [key: string]: any;
};

type DocumentTypeProps = {
  register: UseFormRegister<FormData>;
  errors: any;
};

const DocumentType = ({ register, errors }: DocumentTypeProps): JSX.Element => {
  const [documentTypes, setDocumentTypes] = useState<SelectOptions[]>([]);

  useEffect(() => {
    const loadDocumentTypes = async (): Promise<void> => {
      const response = await api.get<DocType[]>(`/document-types`);
      const listDocuments = response.data.map(docs => ({
        name: docs.name,
        value: docs.id,
      }));
      setDocumentTypes([{ name: 'Selecione una opción', value: 0 }, ...listDocuments]);
    };

    loadDocumentTypes();
  }, []);

  return (
    <div>
      <Select
        width="270px"
        label="documentType"
        title="Tipo de documento"
        required
        options={documentTypes}
        register={register}
        errors={errors}
        errorMessage="Campo obligatorio"
        type="number"
      />
    </div>
  );
};

export default DocumentType;
