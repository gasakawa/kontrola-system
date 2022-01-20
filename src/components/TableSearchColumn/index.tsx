import React from 'react';

import * as S from './styles';

interface TableSearchColumnProps {
  onChangeValue: (field: string, value: string) => void;
  field: string;
  value: string;
}

const TableSearchColum = ({ field, value, onChangeValue }: TableSearchColumnProps): JSX.Element => {
  return (
    <S.Wrapper>
      <input
        type="text"
        name={field}
        id={field}
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          onChangeValue(field, e.currentTarget.value);
        }}
        defaultValue={value}
      />
    </S.Wrapper>
  );
};

export default TableSearchColum;
