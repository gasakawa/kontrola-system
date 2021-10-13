import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import Button from 'components/Button';
import api from 'services/api';
import { ErrorAboveElement } from 'styles/errors';
import { handleError } from 'utils/handle-errors';
import { toast } from 'react-toastify';

import * as S from './styles';

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

type ConfirmUserProps = {
  email: string;
};

const ConfirmUser = ({ email }: ConfirmUserProps): JSX.Element => {
  const [showError, setShowError] = useState(false);
  const [showResendLink, setShowResendLink] = useState(false);
  const [showLoginLink, setShowLoginLink] = useState(false);

  const { handleSubmit, register, setFocus } = useForm<CodeDTO>();

  const history = useHistory();

  const onSubmit = async ({ first, second, third, fourth, fifth, sixth }: CodeDTO): Promise<void> => {
    const code = `${first}${second}${third}${fourth}${fifth}${sixth}`;

    if (code.length !== 6) {
      setShowError(true);
    } else {
      setShowError(false);
      try {
        const { data: response }: { data: ConfirmCodeResponse } = await api({
          url: '/user/confirm',
          method: 'post',
          data: {
            username: email,
            code,
          },
        });
        if (response.isConfirmed) {
          toast.success('Confirmación exitosa');
        }
      } catch (err: any) {
        const { message, code: errorCode } = handleError(err);
        toast.error(message);
        if (errorCode === 'ExpiredCodeException') {
          setShowResendLink(true);
          setShowLoginLink(false);
        }
      }
    }
  };

  const resendCode = async (): Promise<void> => {
    const { data: response }: { data: ConfirmCodeResponse } = await api({
      url: '/user/resend_code',
      method: 'post',
      data: {
        username: email,
      },
    });

    if (response.message === 'User code confirmation sent') {
      setShowResendLink(false);
      setShowLoginLink(true);
    }
  };

  const sendToLogin = (): void => {
    history.push(`/`);
  };

  return (
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
        {showResendLink && (
          <S.LinkContainer>
            <button type="button" onClick={resendCode}>
              Reenviar código
            </button>
          </S.LinkContainer>
        )}

        {showLoginLink && (
          <S.LinkContainer>
            <button type="button" onClick={sendToLogin}>
              Ir para login
            </button>
          </S.LinkContainer>
        )}
      </form>
    </S.FormContiner>
  );
};

export default ConfirmUser;
