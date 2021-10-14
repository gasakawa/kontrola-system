import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import validator from 'validator';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import Button from 'components/Button';
import { ErrorInputText } from 'styles/errors';
import api from 'services/api';
import * as S from './styles';

type ChangePasswordInput = {
  password: string;
  confirmPassword: string;
  email: string;
  tempPassword: string;
};

type ChangePasswordResponse = {
  message: string;
  isConfirmed: boolean;
};

const ChangeInitialPassword = (): JSX.Element => {
  const [showErrorPassword, setShowErrorPassword] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [tempPasswordShown, setTempPasswordShown] = useState(false);

  const history = useHistory();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ChangePasswordInput>();

  const onSubmit = async ({ password, confirmPassword, email, tempPassword }: ChangePasswordInput): Promise<void> => {
    if (password !== confirmPassword) {
      setShowErrorPassword(true);
    } else {
      setShowErrorPassword(false);
      const { data: response }: { data: ChangePasswordResponse } = await api({
        method: 'POST',
        url: '/user/change_initial_password',
        data: {
          username: email,
          password,
        },
      });

      if (response.message === 'Password changed') {
        toast.success('Primer acceso confirmado');
        history.push('/');
      }
    }

    console.log(password, confirmPassword, email, tempPassword);
  };

  const toogleShowConfirmPassword = (): void => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  const toogleShowPassword = (): void => {
    setPasswordShown(!passwordShown);
  };

  const toogleShowTempPassword = (): void => {
    setTempPasswordShown(!tempPasswordShown);
  };

  return (
    <S.Container>
      <S.Content>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.ContentInput
            type="text"
            placeholder="E-mail"
            {...register('email', {
              required: 'Campo obligatorio',
              validate: value => {
                return validator.isEmail(value) || 'E-mail incorrecto';
              },
            })}
            hasError={!!errors.email}
          />
          <ErrorInputText>
            <ErrorMessage errors={errors} name="email" />
          </ErrorInputText>
          <S.ContentInputWrapper>
            <S.ContentInput
              type={tempPasswordShown ? 'text' : 'password'}
              placeholder="Contraseña temporal"
              {...register('tempPassword', {
                required: 'Campo obligatorio',
              })}
              hasError={!!errors.tempPassword}
            />
            {tempPasswordShown ? (
              <FiEyeOff onClick={toogleShowTempPassword} />
            ) : (
              <FiEye onClick={toogleShowTempPassword} />
            )}
          </S.ContentInputWrapper>
          <ErrorInputText>
            <ErrorMessage errors={errors} name="tempPassword" />
          </ErrorInputText>
          <S.ContentInputWrapper>
            <S.ContentInput
              type={passwordShown ? 'text' : 'password'}
              placeholder="Contraseña"
              {...register('password', {
                required: 'Campo obligatorio',
                validate: value => {
                  return (
                    validator.isStrongPassword(value, {
                      minLength: 8,
                      minLowercase: 1,
                      minUppercase: 1,
                      minSymbols: 1,
                    }) || 'La contraseña no cumple los requisitos'
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
              type={confirmPasswordShown ? 'text' : 'password'}
              placeholder="Confirmar contraseña"
              {...register('confirmPassword', {
                required: 'Campo obligatorio',
                validate: value => {
                  return (
                    validator.isStrongPassword(value, {
                      minLength: 8,
                      minLowercase: 1,
                      minUppercase: 1,
                      minSymbols: 1,
                    }) || 'La contraseña no cumple los requisitos'
                  );
                },
              })}
              hasError={!!errors.confirmPassword}
            />
            {confirmPasswordShown ? (
              <FiEyeOff onClick={toogleShowConfirmPassword} />
            ) : (
              <FiEye onClick={toogleShowConfirmPassword} />
            )}
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
