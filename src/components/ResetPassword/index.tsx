import React, { useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { useForm } from 'react-hook-form';

import Button from 'components/Button';
import { ErrorInputText } from 'styles/errors';
import validator from 'validator';

import api from 'services/api';
import { handleError } from 'utils/handle-errors';
import { toast } from 'react-toastify';
import * as S from './styles';

type ResetPasswordData = {
  email: string;
};

const ResetPassword = (): JSX.Element => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>();

  const onSubmit = async ({ email }: ResetPasswordData): Promise<void> => {
    setShowSuccessMessage(false);
    try {
      const response = await api({
        url: '/user/forgot_password',
        method: 'POST',
        data: {
          username: email,
        },
      });

      const { codeGenerated, message } = response.data;
      if (codeGenerated && message === 'Reset Code Send') {
        setShowSuccessMessage(true);
      }
    } catch (err) {
      const { message } = handleError(err);
      toast.error(message);
    }
  };

  return (
    <S.Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <S.Input
          type="text"
          placeholder="E-mail"
          hasError={!!errors.email}
          {...register('email', {
            required: 'Campo obligatorio',
            validate: value => {
              return validator.isEmail(value) || 'El valor ingresado no parece ser un e-mail';
            },
          })}
        />
        <ErrorInputText>
          <ErrorMessage errors={errors} name="email" />
        </ErrorInputText>
        <Button type="submit">Enviar</Button>
      </form>
      {showSuccessMessage && <p>Hemos enviado un e-mail con las instrucciones para cambiar su contraseña</p>}
    </S.Wrapper>
  );
};

export default ResetPassword;
