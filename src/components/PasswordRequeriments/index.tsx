import React from 'react';

import { FiCheck } from 'react-icons/fi';
import * as S from './styles';

const PasswordRequeriments = (): JSX.Element => {
  return (
    <S.Wrapper>
      <S.Content>
        <span>Su nueva contraseña debe tener:</span>
        <ul>
          <li>
            <FiCheck />8 caracteres o más
          </li>
          <li>
            <FiCheck />
            un caracter especial (@*|%;)
          </li>
          <li>
            <FiCheck />
            una letra mayúscula
          </li>
          <li>
            <FiCheck />
            una letra minúscula
          </li>
          <li>
            <FiCheck />
            un número
          </li>
        </ul>
      </S.Content>
    </S.Wrapper>
  );
};

export default PasswordRequeriments;
