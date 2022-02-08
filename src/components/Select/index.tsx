import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { ErrorInputText } from 'styles/errors';

import * as S from './styles';

type Options = {
  name: string;
  value: number | string;
};

type FormData = {
  [key: string]: any;
};

type Props = {
  label: string;
  title: string;
  options: Options[];
  errors: any;
  errorMessage: string;
  width: string;
  type: string;
  register: UseFormRegister<FormData>;
};

type SelectProps = React.HTMLProps<HTMLSelectElement> & Props;

const Select = ({
  label,
  title,
  options,
  width = '270px',
  type = 'text',
  errors,
  required,
  errorMessage,
  register,
  ...rest
}: SelectProps): JSX.Element => {
  return (
    <S.Wrapper>
      <S.Label>{title}</S.Label>
      <S.SelectContainer width={width} hasErrors={!!errors[label]}>
        <select
          {...register(label, {
            required: required && errorMessage ? errorMessage : false,
            valueAsNumber: type === 'number',
          })}
          {...rest}
        >
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
