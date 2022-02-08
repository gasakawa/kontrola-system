import Select from 'components/Select';
import React, { useEffect, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import api from 'services/api';
import { HeadquarterType, SelectOptions } from 'types';

type FormData = {
  [key: string]: any;
};

type HeadquarterListProps = {
  register: UseFormRegister<FormData>;
  errors: any;
  companyId: string;
};

const HeadquarterList = ({ register, errors, companyId }: HeadquarterListProps): JSX.Element => {
  const [options, setOptions] = useState<SelectOptions[]>([]);

  useEffect(() => {
    const loadDocumentTypes = async (): Promise<void> => {
      const response = await api.get<HeadquarterType[]>(`/headquarter/${companyId}`);
      const listHeadquarters = response.data.map(headquarter => ({
        name: headquarter.name,
        value: headquarter.id,
      }));
      setOptions([{ name: 'Selecione una opción', value: 0 }, ...listHeadquarters]);
    };

    loadDocumentTypes();
  }, [companyId]);
  return (
    <div>
      <Select
        width="270px"
        label="headquarterId"
        title="Sede"
        required
        options={options}
        register={register}
        errors={errors}
        errorMessage="Campo obligatorio"
        type="number"
      />
    </div>
  );
};

export default HeadquarterList;
