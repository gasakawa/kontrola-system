import React, { useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { useForm } from 'react-hook-form';

import Button from 'components/Button';
import { ErrorInputText } from 'styles/errors';
import validator from 'validator';

import api from 'services/api';
import { handleError } from 'utils/handle-errors';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import Modal from 'components/Modal';
import * as S from './styles';

type ResetPasswordData = {
  email: string;
};

const RequestResetPassword = (): JSX.Element => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const history = useHistory();
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

      const { codeGenerated } = response.data;
      if (codeGenerated) {
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

      {showSuccessMessage && (
        <Modal
          icon="envelope"
          title="Las instrucciones para cambiar su contraseña fueron enviadas"
          description="Verifique su e-mail y siga las instrucciones para cambiar su contraseña"
          action={value => {
            if (value === 'close') {
              setShowSuccessMessage(false);
              history.push('/');
            }
          }}
        />
      )}
    </S.Wrapper>
  );
};

export default RequestResetPassword;
