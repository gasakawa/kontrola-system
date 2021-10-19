import React from 'react';
import { useForm } from 'react-hook-form';
import validator from 'validator';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import Button from 'components/Button';
import api from 'services/api';
import { handleError } from 'utils/handle-errors';
import Loader from 'components/Loader';
import Input from 'components/Input';
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
  const history = useHistory();

  const {
    register,
    formState: { errors, isSubmitting },
    setError,
    handleSubmit,
  } = useForm<ChangePasswordInput>();

  const onSubmit = async ({ password, confirmPassword, email, tempPassword }: ChangePasswordInput): Promise<void> => {
    if (password !== confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Las contraseñas no coinciden',
      });
    } else {
      try {
        const { data: response }: { data: ChangePasswordResponse } = await api({
          method: 'POST',
          url: '/user/change_initial_password',
          data: {
            username: email,
            password,
            tempPassword,
          },
        });

        if (response.message === 'Password changed') {
          toast.success('Primer acceso confirmado');
          history.push('/');
        }
      } catch (err) {
        const { message } = handleError(err);
        toast.error(message);
      }
    }
  };

  return (
    <S.Container>
      {isSubmitting && <Loader />}
      <S.Content>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            label="email"
            register={register}
            placeholder="E-mail"
            required
            errors={errors}
            msgError="Campo obligatorio"
            validation={value => {
              return validator.isEmail(value) || 'El valor ingresado no parece ser un e-mail';
            }}
          />
          <Input
            type="password"
            label="tempPassword"
            register={register}
            placeholder="Contraseña temporal"
            required
            errors={errors}
            msgError="Campo obligatorio"
          />
          <Input
            type="password"
            label="password"
            register={register}
            placeholder="Contraseña"
            required
            errors={errors}
            msgError="Campo obligatorio"
            validation={value => {
              return (
                validator.isStrongPassword(value, {
                  minLength: 8,
                  minLowercase: 1,
                  minUppercase: 1,
                  minSymbols: 1,
                }) || 'La contraseña no cumple los requisitos'
              );
            }}
          />

          <Input
            type="password"
            label="confirmPassword"
            register={register}
            placeholder="Confirmar Nueva Contraseña"
            required
            errors={errors}
            msgError="Campo obligatorio"
            validation={value => {
              return (
                validator.isStrongPassword(value, {
                  minLength: 8,
                  minLowercase: 1,
                  minUppercase: 1,
                  minSymbols: 1,
                }) || 'La contraseña no cumple los requisitos'
              );
            }}
          />

          <Button type="submit">Enviar</Button>
        </form>
      </S.Content>
    </S.Container>
  );
};

export default ChangeInitialPassword;
