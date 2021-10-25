import React from 'react';

import logo from 'assets/logo-kontrola-color.svg';
import { useAuth } from 'hooks/auth';
import ButtonLink from 'components/ButtonLink';
import * as S from './styles';

const Sidebar = (): JSX.Element => {
  const { signOut } = useAuth();
  return (
    <S.Wrapper>
      <S.LogoWrapper>
        <img src={logo} alt="Kontrola" />
      </S.LogoWrapper>
      <S.Logout>
        <ButtonLink type="button" onClick={signOut}>
          Salir
        </ButtonLink>
      </S.Logout>
    </S.Wrapper>
  );
};

export default Sidebar;
