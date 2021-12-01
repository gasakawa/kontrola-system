import React from 'react';
import Input from 'components/Input';
import { useForm } from 'react-hook-form';

import validator from 'validator';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { handleError } from 'utils/handle-errors';
import api from 'services/api';
import { toast } from 'react-toastify';
import * as S from './styles';

type ChangePwdData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePassword = (): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm();

  const onSubmit = async (data: ChangePwdData): Promise<void> => {
    const { oldPassword, newPassword, confirmPassword } = data;
    if (newPassword !== confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Las contraseñas no coinciden',
      });
    } else {
      try {
        const response = await api({
          url: `/user/change_password`,
          method: 'POST',
          data: {
            newPassword,
            oldPassword,
          },
        });
        const { isConfirmed, message } = response.data;
        if (isConfirmed) {
          toast.success(message);
          reset();
        }
      } catch (err: any) {
        const { message } = handleError(err);
        toast.error(message);
      }
    }
  };

  return (
    <S.Wrapper>
      {isSubmitting && <Loader />}
      <h2>Contraseña</h2>
      <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
        <S.FormRow>
          <S.FormItem>
            <Input
              type="password"
              label="oldPassword"
              register={register}
              placeholder="Contraseña actual"
              required
              errors={errors}
              msgError="Campo obligatorio"
              width="lg"
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
          </S.FormItem>
          <S.FormItem>
            <Input
              type="password"
              label="newPassword"
              register={register}
              placeholder="Contraseña nueva"
              required
              errors={errors}
              msgError="Campo obligatorio"
              width="lg"
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
          </S.FormItem>
          <S.FormItem>
            <Input
              type="password"
              label="confirmPassword"
              register={register}
              placeholder="Confirmar nueva contraseña"
              required
              errors={errors}
              msgError="Campo obligatorio"
              width="lg"
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
          </S.FormItem>
        </S.FormRow>

        <S.ButtonsContainer>
          <Button type="submit">Cambiar contraseña</Button>
        </S.ButtonsContainer>
      </S.FormContainer>
    </S.Wrapper>
  );
};

export default ChangePassword;
