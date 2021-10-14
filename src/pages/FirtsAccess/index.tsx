import React from 'react';

import ChangeInitialPassword from 'components/ChangeInitialPassword';
import ButtonLink from 'components/ButtonLink';
import { useHistory } from 'react-router-dom';
import * as S from './styles';

const FirstAccess = (): JSX.Element => {
  const history = useHistory();
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
        <ButtonLink
          type="button"
          onClick={() => {
            history.push('/');
          }}
        >
          Volver al login
        </ButtonLink>
      </S.Container>
    </S.Wrapper>
  );
};

export default FirstAccess;
