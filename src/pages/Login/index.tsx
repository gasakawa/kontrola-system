import React from 'react';
import { useForm } from 'react-hook-form';
import validator from 'validator';
import { toast } from 'react-toastify';

import { useAuth } from 'hooks/auth';

import Button from 'components/Button';
import { ErrorMessage } from '@hookform/error-message';
import { useHistory } from 'react-router-dom';
import { handleError } from 'utils/handle-errors';
import ButtonLink from 'components/ButtonLink';
import * as S from './styles';

type SigninFormData = {
  username: string;
  password: string;
};

const Login = (): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SigninFormData>();

  const { signIn } = useAuth();
  const history = useHistory();

  const onSubmit = async (data: SigninFormData): Promise<void> => {
    const { username, password } = data;

    try {
      await signIn({ username, password });
      history.push('/home');
    } catch (err: any) {
      const { message, code } = handleError(err);
      if (code === 'UserNotConfirmed') {
        history.push(`/first-access`);
      } else {
        toast.error(message);
      }
    }
  };
  return (
    <S.LoginWrapper>
      <S.LoginContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>
          <S.InputContainer hasError={!!errors.username}>
            <input
              type="text"
              id="username"
              placeholder="E-mail"
              {...register('username', {
                required: 'E-mail obligatorio',
                validate: value => {
                  return validator.isEmail(value) || 'E-mail inválido';
                },
              })}
            />
          </S.InputContainer>
          <S.Error>
            <ErrorMessage errors={errors} name="username" />
          </S.Error>

          <S.InputContainer hasError={!!errors.password}>
            <input
              type="password"
              id="password"
              placeholder="Password"
              {...register('password', { required: 'Password obligatorio' })}
            />
          </S.InputContainer>
          <S.Error>
            <ErrorMessage errors={errors} name="password" />
          </S.Error>
          <Button type="submit">Entrar</Button>
          <ButtonLink
            type="button"
            onClick={() => {
              history.push('/forgot-password');
            }}
          >
            Olvidé mi contraseña
          </ButtonLink>
          <ButtonLink
            type="button"
            onClick={() => {
              history.push('/first-access');
            }}
          >
            ¿Primer acceso?
          </ButtonLink>
        </form>
      </S.LoginContent>
    </S.LoginWrapper>
  );
};

export default Login;
