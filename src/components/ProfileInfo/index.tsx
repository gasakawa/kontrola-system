import Button from 'components/Button';
import React from 'react';
import { FaRegBuilding } from 'react-icons/fa';
import { FiCheck, FiPhone } from 'react-icons/fi';
import { UserProfile } from 'types';

import * as S from './styles';

type ProfileInfoProps = {
  user: UserProfile;
};

const ProfileInfo = ({ user }: ProfileInfoProps): JSX.Element => {
  return (
    <S.Wrapper>
      <S.Photo>
        <img src={user.profilePic} alt={user.name} />
      </S.Photo>
      <S.UserWrapper>
        <S.UserInfo>
          <h2>{user.name}</h2>
          <span>{user.email}</span>
        </S.UserInfo>
        <S.ButtonContainer>
          <Button type="button">Editar</Button>
        </S.ButtonContainer>
      </S.UserWrapper>
      <S.UserDetail>
        <S.UserDetailLine>
          <div>
            <FiCheck />
            <span>Status</span>
          </div>
          <p>{user.flgActive ? 'Activo' : 'Inactivo'}</p>
        </S.UserDetailLine>
        <S.UserDetailLine>
          <div>
            <FaRegBuilding />
            <span>Sede</span>
          </div>
          <p>{user.headquarter}</p>
        </S.UserDetailLine>
        <S.UserDetailLine>
          <div>
            <FiPhone />
            <span>Contacto</span>
          </div>
          <p>{user.phoneNumber}</p>
        </S.UserDetailLine>
      </S.UserDetail>
    </S.Wrapper>
  );
};

export default ProfileInfo;
