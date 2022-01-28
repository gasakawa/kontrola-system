import { useAuth } from 'hooks/auth';
import React from 'react';

import * as S from './styles';

const AddUserModal = (): JSX.Element => {
  const { user } = useAuth();
  return (
    <S.Wrapper>
      <div>
        Add user
        {user.data.company}
      </div>
      :
    </S.Wrapper>
  );
};

export default AddUserModal;
