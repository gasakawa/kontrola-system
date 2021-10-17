import React from 'react';
import { useForm } from 'react-hook-form';
import validator from 'validator';

import PasswordRequeriments from 'components/PasswordRequeriments';
import Input from 'components/Input';

import Button from 'components/Button';
import * as S from './styles';

type ResetPasswordData = {
  code: string;
  password: string;
  confirmPassword: string;
  username: string;
};

const ResetPassword = (): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetPasswordData>();

  const onSubmit = async ({ code, password, confirmPassword, username }: ResetPasswordData): Promise<void> => {
    console.log(`code: ${code}, ${password}, ${confirmPassword} ${username}`);
  };

  return (
    <S.Wrapper>
      <S.Container>
        <S.Title>Registre su nueva contraseña</S.Title>
        <S.Description>¡Falta poco! Registre su nueva contraseña para recuperar su acceso</S.Description>
        <PasswordRequeriments />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            label="code"
            register={register}
            maxLength={6}
            placeholder="Código"
            required
            errors={errors}
            msgError="Campo obligatorio"
            validation={value => {
              if (!validator.isNumeric(value)) {
                return 'Solamente deve digitar números';
              }
              if (
                !validator.isLength(value, {
                  min: 6,
                  max: 6,
                })
              ) {
                return 'El código debe tener 6 caracteres';
              }

              return true;
            }}
          />
          <Input
            type="text"
            label="username"
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
            label="password"
            register={register}
            placeholder="Nueva Contraseña"
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
          <Button type="submit">Crear contraseña</Button>
        </form>
      </S.Container>
    </S.Wrapper>
  );
};

export default ResetPassword;
