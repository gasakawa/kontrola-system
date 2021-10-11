import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Button from 'components/Button';
import { ErrorAboveElement } from 'styles/errors';
import api from 'services/api';
import { handleError } from 'utils/handle-errors';
import { toast } from 'react-toastify';
import * as S from './styles';

type UseConfirmDTO = {
  email: string;
};

type CodeDTO = {
  first: number;
  second: number;
  third: number;
  fourth: number;
  fifth: number;
  sixth: number;
};

type ConfirmCodeResponse = {
  message: string;
  isConfirmed: boolean;
};

const UserConfirm = (): JSX.Element => {
  const params = useParams() as UseConfirmDTO;
  const [showError, setShowError] = useState(false);
  const [showResendCodeLink, setShowResendCodeLink] = useState(false);

  const { handleSubmit, register, setFocus } = useForm<CodeDTO>();

  const onSubmit = async ({ first, second, third, fourth, fifth, sixth }: CodeDTO): Promise<void> => {
    const code = `${first}${second}${third}${fourth}${fifth}${sixth}`;
    if (code.length !== 6) {
      setShowError(true);
      setShowResendCodeLink(false);
    } else {
      setShowError(false);
      try {
        const { data: response }: { data: ConfirmCodeResponse } = await api({
          url: '/user/confirm',
          method: 'post',
          data: {
            username: params.email,
            code,
          },
        });
        if (response.isConfirmed) {
          toast.success('Confirmación exitosa');
        }
      } catch (err: any) {
        const { message, name } = handleError(err);
        if (name === 'ExpiredCodeException') {
          setShowResendCodeLink(true);
        }
        toast.error(message);
      }
    }
  };

  return (
    <S.Wrapper>
      <S.Container>
        <S.Title>Confirmación</S.Title>
        <S.Description>
          <p>Digite el código de seis dígitos que fué enviado a su e-mail.</p>
          <span>({params.email})</span>
        </S.Description>
        <S.FormContiner>
          <form onSubmit={handleSubmit(onSubmit)}>
            <S.DigitsContiner>
              <S.DigitInput
                type="text"
                maxLength={1}
                {...register('first', { required: true })}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  if (e.currentTarget.value.length > 0) {
                    setFocus('second');
                  }
                }}
              />

              <S.DigitInput
                type="text"
                maxLength={1}
                {...register('second')}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  if (e.currentTarget.value.length > 0) {
                    setFocus('third');
                  }
                }}
              />
              <S.DigitInput
                type="text"
                maxLength={1}
                {...register('third')}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  if (e.currentTarget.value.length > 0) {
                    setFocus('fourth');
                  }
                }}
              />
              <S.DigitInput
                type="text"
                maxLength={1}
                {...register('fourth')}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  if (e.currentTarget.value.length > 0) {
                    setFocus('fifth');
                  }
                }}
              />
              <S.DigitInput
                type="text"
                maxLength={1}
                {...register('fifth')}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  if (e.currentTarget.value.length > 0) {
                    setFocus('sixth');
                  }
                }}
              />
              <S.DigitInput type="text" maxLength={1} {...register('sixth')} />
            </S.DigitsContiner>

            {showError && <ErrorAboveElement>O código está incompleto</ErrorAboveElement>}
            <Button type="submit">Enviar</Button>
          </form>
        </S.FormContiner>
        {showResendCodeLink && <S.ResendCodeText>Solicite su código de confirmación nuevamente</S.ResendCodeText>}
      </S.Container>
    </S.Wrapper>
  );
};

export default UserConfirm;
