import RequestResetPassword from 'components/RequestResetPassword';
import React from 'react';

import * as S from './styles';

const ForgotPassword = (): JSX.Element => {
  return (
    <S.Wrapper>
      <S.Container>
        <S.Title>¿Necesita ayuda con su contraseña?</S.Title>
        <S.Description>Ingrese el e-mail registrado y le ayudaremos a crear una nueva contraseña</S.Description>
        <RequestResetPassword />
      </S.Container>
    </S.Wrapper>
  );
};

export default ForgotPassword;
