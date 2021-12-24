import React from 'react';
import ListUsers from 'components/ListUsers';
import { useAuth } from 'hooks/auth';

import * as S from './styles';

const AdminClients = (): JSX.Element => {
  const { user } = useAuth();
  return (
    <S.Wrapper>
      <ListUsers company={user.data.company} roleId={2} />
    </S.Wrapper>
  );
};

export default AdminClients;
