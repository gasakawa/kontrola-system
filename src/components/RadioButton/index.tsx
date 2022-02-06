import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { ErrorInputRadio } from 'styles/errors';
import { Gender } from 'types';

import * as S from './styles';

type FormData = {
  [key: string]: any;
};

type Props = {
  label: string;
  title: string;
  options: Gender[];
  errorMsg: string;
  errors: any;
  register: UseFormRegister<FormData>;
  validation?: (value: any) => any;
};

type RadioButtonProps = React.HTMLProps<HTMLInputElement> & Props;

const RadioButton = ({
  label,
  title,
  options,
  required,
  errorMsg,
  errors,
  register,
  validation,
  ...rest
}: RadioButtonProps): JSX.Element => {
  return (
    <S.Wrapper>
      <S.Label>{title}</S.Label>
      <S.Radios hasError={!!errors[label]}>
        {options.map((opt: Gender) => (
          <React.Fragment key={opt.value}>
            <input
              type="radio"
              value={opt.value}
              {...register(label, { required: required && errorMsg ? errorMsg : false, validate: validation })}
              {...rest}
            />
            <label htmlFor={label}>{opt.text}</label>
          </React.Fragment>
        ))}
      </S.Radios>
      <ErrorInputRadio>
        <ErrorMessage errors={errors} name={label} />
      </ErrorInputRadio>
    </S.Wrapper>
  );
};

export default RadioButton;
