import React, { useState } from 'react';
import { FaRegBuilding } from 'react-icons/fa';
import { FiCheck, FiPhone, FiUpload } from 'react-icons/fi';
import { User } from 'types';

import profileLogo from 'assets/profile.svg';
import api from 'services/api';
import { updateUserAvatar } from 'utils/storage-helper';
import * as S from './styles';

type ProfileInfoProps = {
  user: User;
};

type UpdateAvatarResponse = {
  profilePicUrl: string;
  id: string;
};

const ProfileInfo = ({ user }: ProfileInfoProps): JSX.Element => {
  const { profilePic, name, email, flgActive, headquarter, phoneNumber, id } = user;

  const [userPicture, setUserPicture] = useState(profilePic);

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (e.target.files) {
      const formData = new FormData();
      formData.append('avatar', e.target.files[0]);

      const { data: response }: { data: UpdateAvatarResponse } = await api({
        method: 'PATCH',
        url: `/user/avatar/${id}`,
        data: formData,
      });
      setUserPicture(response.profilePicUrl);
      updateUserAvatar(response.profilePicUrl);
    }
  };

  return (
    <S.Wrapper>
      <S.Photo>
        {userPicture ? <img src={userPicture} alt={name} /> : <img src={profileLogo} alt="Avatar del usuario" />}
        <S.ButtonUpload>
          <FiUpload size={16} />
          <span>Cambiar foto</span>
          <input type="file" name="avatar" id="avatar" onChange={handleFileSelected} />
        </S.ButtonUpload>
      </S.Photo>
      <S.UserWrapper>
        <S.UserInfo>
          <h2>{name}</h2>
          <span>{email}</span>
        </S.UserInfo>
      </S.UserWrapper>
      <S.UserDetail>
        <S.UserDetailLine>
          <div>
            <FiCheck />
            <span>Status</span>
          </div>
          <p>{flgActive ? 'Activo' : 'Inactivo'}</p>
        </S.UserDetailLine>
        <S.UserDetailLine>
          <div>
            <FaRegBuilding />
            <span>Sede</span>
          </div>
          <p>{headquarter}</p>
        </S.UserDetailLine>
        <S.UserDetailLine>
          <div>
            <FiPhone />
            <span>Contacto</span>
          </div>
          <p>{phoneNumber}</p>
        </S.UserDetailLine>
      </S.UserDetail>
    </S.Wrapper>
  );
};

export default ProfileInfo;
