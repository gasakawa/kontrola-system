import ButtonLink from 'components/ButtonLink';
import RequestResetPassword from 'components/RequestResetPassword';
import React from 'react';
import { useHistory } from 'react-router-dom';

import logo from 'assets/logo-kontrola-color.svg';
import * as S from './styles';

const ForgotPassword = (): JSX.Element => {
  const history = useHistory();
  return (
    <S.Wrapper>
      <img src={logo} alt="Kontrola" />

      <S.Container>
        <S.Title>¿Necesita ayuda con su contraseña?</S.Title>
        <S.Description>Ingrese el e-mail registrado y le ayudaremos a crear una nueva contraseña</S.Description>
        <RequestResetPassword />
        <ButtonLink
          type="button"
          onClick={() => {
            history.push('/');
          }}
        >
          Volver para login
        </ButtonLink>
      </S.Container>
    </S.Wrapper>
  );
};

export default ForgotPassword;
