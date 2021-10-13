import React from 'react';
import { useParams } from 'react-router-dom';

import ChangeInitialPassword from 'components/ChangeInitialPassword';
import * as S from './styles';

type UseConfirmDTO = {
  email: string;
};

const InitialPassword = (): JSX.Element => {
  const params = useParams() as UseConfirmDTO;

  return (
    <S.Wrapper>
      <S.Container>
        <S.Title>Primer acceso</S.Title>
        <S.Description>
          <p>
            Para validar su acceso es necesario que cambie su password
            <br />
            <br />
          </p>
          <p>Tenga en cuenta que su password deve tener los siguientes requisitos:</p>
          <ul>
            <li>Mínimo 8 caracteres</li>
            <li>Mínimo 1 número</li>
            <li>Mínimo 1 letra minúscula</li>
            <li>Mínimo 1 letra mayúscula</li>
            <li>Mínimo 1 símbolo</li>
          </ul>
        </S.Description>

        <ChangeInitialPassword email={params.email} />
      </S.Container>
    </S.Wrapper>
  );
};

export default InitialPassword;
