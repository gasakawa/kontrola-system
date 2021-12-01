import React, { useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { UseFormRegister } from 'react-hook-form';
import { ErrorInputText } from 'styles/errors';

import { FiEye, FiEyeOff } from 'react-icons/fi';
import * as S from './styles';

type FormData = {
  [key: string]: any;
};

type Props = {
  label: string;
  register: UseFormRegister<FormData>;
  errors: any;
  msgError?: string;
  validation?: (value: any) => any;
  width?: 'lg' | 'md' | 'sm' | 'xl';
  title?: string;
};

type InputProps = React.HTMLProps<HTMLInputElement> & Props;

const Input = ({
  register,
  label,
  required,
  errors,
  msgError,
  type,
  validation,
  width = 'lg',
  title = '',
  ...rest
}: InputProps): JSX.Element => {
  const [passwordShown, setPasswordShown] = useState(false);
  const widths = {
    lg: '270px',
    md: '150px',
    sm: '50px',
    xl: '400px',
  };

  const toogleShowPassword = (): void => {
    setPasswordShown(!passwordShown);
  };

  if (type === 'password') {
    return (
      <>
        <S.ContainerPassword hasError={!!errors[label]} width={widths[width]}>
          <input
            type={passwordShown ? 'text' : type}
            {...register(label, { required: required && msgError ? msgError : false, validate: validation })}
            {...rest}
          />
          {passwordShown ? <FiEyeOff onClick={toogleShowPassword} /> : <FiEye onClick={toogleShowPassword} />}
        </S.ContainerPassword>
        <ErrorInputText>
          <ErrorMessage errors={errors} name={label} />
        </ErrorInputText>
      </>
    );
  }

  return (
    <S.Container hasError={!!errors[label]} width={widths[width]}>
      <S.ContainerLabel htmlFor={label}>{title}</S.ContainerLabel>
      <input
        type={type}
        {...register(label, { required: required && msgError ? msgError : false, validate: validation })}
        {...rest}
      />
      <ErrorInputText>
        <ErrorMessage errors={errors} name={label} />
      </ErrorInputText>
    </S.Container>
  );
};

export default Input;
