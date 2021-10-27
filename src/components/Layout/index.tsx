import React from 'react';
import { useAuth } from 'hooks/auth';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';

import * as S from './styles';

type LayoutProps = {
  children: JSX.Element;
};

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const { user } = useAuth();
  return (
    <S.Wrapper>
      {!!user && (
        <>
          <Header />
          <Sidebar />
        </>
      )}
      <S.Content private={!!user}>{children}</S.Content>
    </S.Wrapper>
  );
};

export default Layout;
