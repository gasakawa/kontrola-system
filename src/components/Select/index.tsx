import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { ErrorInputText } from 'styles/errors';

import * as S from './styles';

type FormData = {
  [key: string]: any;
};

type Options = {
  name: string;
  value: number;
};

type Props = {
  label: string;
  title: string;
  errorMsg: string;
  errors: any;
  options: Options[];
  selectedValue: number | string;
  register: UseFormRegister<FormData>;
  onSelectValue: (value: number) => void;
};

type SelectProps = React.HTMLProps<HTMLSelectElement> & Props;

const Select = ({ label, title, errors, options, selectedValue, onSelectValue, ...rest }: SelectProps): JSX.Element => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    onSelectValue(Number(e.currentTarget.value));
  };
  return (
    <S.Wrapper>
      <S.Label>{title}</S.Label>
      <S.SelectContainer width="270px">
        <select onChange={handleChange} defaultValue={selectedValue} {...rest}>
          {options.map(option => (
            <option key={`opt-${option.value}`} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </S.SelectContainer>
      <ErrorInputText>
        <ErrorMessage errors={errors} name={label} />
      </ErrorInputText>
    </S.Wrapper>
  );
};

export default Select;
