import React from 'react';

import { useAuth } from 'hooks/auth';
import ButtonLink from 'components/ButtonLink';
import Menu from 'components/Menu';

import logo from 'assets/logo-kontrola-color.svg';
import { FiLogOut } from 'react-icons/fi';
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
        <FiLogOut size={18} onClick={signOut} />
      </S.Logout>

      <Menu />
    </S.Wrapper>
  );
};

export default Sidebar;
