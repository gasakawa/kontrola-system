import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from 'components/Button';
import validator from 'validator';

import api from 'services/api';
import { handleError } from 'utils/handle-errors';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaRegEnvelope } from 'react-icons/fa';

import Modal from 'components/Modal';
import Input from 'components/Input';
import Loader from 'components/Loader';
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
    formState: { errors, isSubmitting },
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
      {isSubmitting && <Loader />}
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

        <Button type="submit">Enviar</Button>
      </form>

      {showSuccessMessage && (
        <Modal
          icon={FaRegEnvelope}
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
