import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import validator from 'validator';

import PasswordRequeriments from 'components/PasswordRequeriments';
import Input from 'components/Input';

import Button from 'components/Button';
import api from 'services/api';
import { handleError } from 'utils/handle-errors';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Modal from 'components/Modal';
import { FiCheck } from 'react-icons/fi';
import ButtonLink from 'components/ButtonLink';
import { FaRegEnvelope } from 'react-icons/fa';
import * as S from './styles';

type ResetPasswordData = {
  code: string;
  password: string;
  confirmPassword: string;
  username: string;
};

const ResetPassword = (): JSX.Element => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showRequestCode, setShowRequestCode] = useState(false);
  const [showSuccessRequestCode, setShowSuccessRequestCode] = useState(false);

  const history = useHistory();
  const {
    handleSubmit,
    register,
    setError,
    watch,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordData>();

  const watchUsername = watch('username');

  const onSubmit = async ({ code, password, confirmPassword, username }: ResetPasswordData): Promise<void> => {
    setShowSuccessMessage(false);
    setShowRequestCode(false);

    if (password !== confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Las contraseñas no coinciden',
      });
    } else {
      try {
        const response = await api({
          url: '/user/reset_password',
          method: 'POST',
          data: {
            username,
            password,
            code,
          },
        });

        const { resetPassword } = response.data;

        if (resetPassword) {
          setShowSuccessMessage(true);
        }
      } catch (err) {
        const { message, code: errorCode } = handleError(err);
        if (errorCode === 'ExpiredCodeException' || errorCode === 'CodeMismatchException') {
          setShowRequestCode(true);
        }
        toast.error(message);
      }
    }
  };

  const handleRequestCode = async (): Promise<void> => {
    try {
      const response = await api({
        url: '/user/forgot_password',
        method: 'POST',
        data: {
          username: watchUsername,
        },
      });
      const { codeGenerated } = response.data;
      if (codeGenerated) {
        setShowRequestCode(false);
        setShowSuccessRequestCode(true);
        reset();
      }
    } catch (err) {
      const { message } = handleError(err);
      toast.error(message);
    }
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
            placeholder="Código Ej. 569412"
            required
            errors={errors}
            msgError="Campo obligatorio"
            validation={value => {
              return (
                validator.isLength(value, {
                  min: 6,
                  max: 6,
                }) || 'El código debe tener 6 caracteres'
              );
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (!validator.isNumeric(e.currentTarget.value)) {
                setError('code', { type: 'manual', message: 'Solamente digite números' });
              }
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
        {showRequestCode && (
          <ButtonLink type="button" onClick={handleRequestCode}>
            Reenviar código
          </ButtonLink>
        )}
        <ButtonLink
          type="button"
          onClick={() => {
            history.push('/');
          }}
        >
          Volver para login
        </ButtonLink>
      </S.Container>
      {showSuccessMessage && (
        <Modal
          icon={FiCheck}
          title="Contraseña registrada exitosamente"
          description="Ahora puede ingresar nuevamente"
          action={value => {
            if (value === 'close') {
              setShowSuccessMessage(false);
              history.push('/');
            }
          }}
        />
      )}
      {showSuccessRequestCode && (
        <Modal
          icon={FaRegEnvelope}
          title="Las instrucciones para cambiar su contraseña fueron enviadas"
          description="Verifique su e-mail y siga las instrucciones para cambiar su contraseña"
          action={value => {
            if (value === 'close') {
              setShowSuccessRequestCode(false);
            }
          }}
        />
      )}
    </S.Wrapper>
  );
};

export default ResetPassword;
