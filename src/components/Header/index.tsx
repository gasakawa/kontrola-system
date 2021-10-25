import React from 'react';
import { useAuth } from 'hooks/auth';
import { FiUser } from 'react-icons/fi';
import * as S from './styles';

const Header = (): JSX.Element => {
  const { user } = useAuth();
  return (
    <S.Wrapper>
      <S.Content>
        <S.ContentUser>
          <span className="name">{user.data.name}</span>
        </S.ContentUser>
        <S.ContentAvatar>
          {user.data.profilePicUrl.length > 0 ? (
            <img src={user.data.profilePicUrl} alt={user.data.name} />
          ) : (
            <FiUser size={32} />
          )}
        </S.ContentAvatar>
      </S.Content>
    </S.Wrapper>
  );
};

export default Header;
