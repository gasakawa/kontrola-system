import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import validator from 'validator';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import Button from 'components/Button';
import { ErrorInputText } from 'styles/errors';
import * as S from './styles';

type ChangeInitialPasswordProps = {
  email: string;
};

type ChangePasswordInput = {
  password: string;
  confirmPassword: string;
};

const ChangeInitialPassword = ({ email }: ChangeInitialPasswordProps): JSX.Element => {
  const [showErrorPassword, setShowErrorPassword] = useState(false);
  const [passwordShown, setPasswordShow] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ChangePasswordInput>();

  const onSubmit = async ({ password, confirmPassword }: ChangePasswordInput): Promise<void> => {
    if (password !== confirmPassword) {
      setShowErrorPassword(true);
    } else {
      setShowErrorPassword(false);
    }
  };

  const toogleShowPassword = (): void => {
    setPasswordShow(!passwordShown);
  };

  return (
    <S.Container>
      <S.Content>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.ContentInput type="text" value={email} disabled hasError={false} />
          <S.ContentInputWrapper>
            <S.ContentInput
              type={passwordShown ? 'text' : 'password'}
              placeholder="Password"
              {...register('password', {
                required: 'Campo obligatorio',
                validate: value => {
                  return (
                    validator.isStrongPassword(value, {
                      minLength: 8,
                      minLowercase: 1,
                      minUppercase: 1,
                      minSymbols: 1,
                    }) || 'Password no cumple los requisitos'
                  );
                },
              })}
              hasError={!!errors.password}
            />
            {passwordShown ? <FiEyeOff onClick={toogleShowPassword} /> : <FiEye onClick={toogleShowPassword} />}
          </S.ContentInputWrapper>
          <ErrorInputText>
            <ErrorMessage errors={errors} name="password" />
          </ErrorInputText>
          <S.ContentInputWrapper>
            <S.ContentInput
              type={passwordShown ? 'text' : 'password'}
              placeholder="Confirmar Password"
              {...register('confirmPassword', {
                required: 'Campo obligatorio',
                validate: value => {
                  return (
                    validator.isStrongPassword(value, {
                      minLength: 8,
                      minLowercase: 1,
                      minUppercase: 1,
                      minSymbols: 1,
                    }) || 'Password no cumple los requisitos'
                  );
                },
              })}
              hasError={!!errors.confirmPassword}
            />
            {passwordShown ? <FiEyeOff onClick={toogleShowPassword} /> : <FiEye onClick={toogleShowPassword} />}
          </S.ContentInputWrapper>
          <ErrorInputText>
            <ErrorMessage errors={errors} name="confirmPassword" />
          </ErrorInputText>
          {showErrorPassword && <ErrorInputText>El password y confirmación no coinciden</ErrorInputText>}
          <Button type="submit">Enviar</Button>
        </form>
      </S.Content>
    </S.Container>
  );
};

export default ChangeInitialPassword;
