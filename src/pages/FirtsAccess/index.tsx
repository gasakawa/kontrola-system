import React from 'react';

import ChangeInitialPassword from 'components/ChangeInitialPassword';
import * as S from './styles';

const FirstAccess = (): JSX.Element => {
  return (
    <S.Wrapper>
      <S.Container>
        <S.Title>Primer acceso</S.Title>
        <S.Description>
          <p>
            Para validar su acceso es necesario que cambie su contraseña
            <br />
            <br />
          </p>
          <p>Tenga en cuenta que su contraseña deve tener los siguientes requisitos:</p>
          <ul>
            <li>Mínimo 8 caracteres</li>
            <li>Mínimo 1 número</li>
            <li>Mínimo 1 letra minúscula</li>
            <li>Mínimo 1 letra mayúscula</li>
            <li>Mínimo 1 símbolo</li>
          </ul>
        </S.Description>

        <ChangeInitialPassword />
      </S.Container>
    </S.Wrapper>
  );
};

export default FirstAccess;
