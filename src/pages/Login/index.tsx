import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import validator from 'validator';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { handleError } from 'utils/handle-errors';

import { useAuth } from 'hooks/auth';

import Button from 'components/Button';
import ButtonLink from 'components/ButtonLink';
import Input from 'components/Input';
import LimitDevicesModal from 'components/LimitDevicesModal';
import { SigninDTO } from 'types';
import Loader from 'components/Loader';
import { SessionInfo } from 'types/session';
import * as S from './styles';

type SigninFormData = {
  username: string;
  password: string;
  sessionInfo: SessionInfo;
};

const Login = (): JSX.Element => {
  const [showSessionLimitModal, setShowSessionLimitModal] = useState(false);
  const [sessions, setSessions] = useState<SigninDTO>();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormData>();

  const { signIn } = useAuth();
  const history = useHistory();

  const onSubmit = async (data: SigninFormData): Promise<void> => {
    const { username, password } = data;

    try {
      const { data: responseIP } = await axios.get<SessionInfo>(`https://ip.nf/me.json`);
      const ipInfo = responseIP.ip as any;

      const { city, country, ip, hostname, latitude, longitude } = ipInfo as SessionInfo;

      const response = await signIn({
        username,
        password,
        sessionInfo: { city, country, ip, hostname, latitude, longitude },
      });
      if (response.allowLogin) {
        history.push('/home');
      } else {
        setShowSessionLimitModal(true);
        if (response.sessions) {
          setSessions(response);
        }
      }
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
      {isSubmitting && <Loader />}
      <S.LoginContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>
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
            placeholder="Contraseña"
            required
            errors={errors}
            msgError="Campo obligatorio"
          />
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
      {showSessionLimitModal && (
        <LimitDevicesModal
          sessions={sessions}
          action={value => {
            if (value === 'close') {
              setShowSessionLimitModal(false);
            }
          }}
        />
      )}
    </S.LoginWrapper>
  );
};

export default Login;
