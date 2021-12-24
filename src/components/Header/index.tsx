import React, { useEffect, useState } from 'react';
import { useAuth } from 'hooks/auth';
import api from 'services/api';
import profileLogo from 'assets/profile.svg';
import * as S from './styles';

type CompanyProfile = {
  url: string;
  name: string;
};

const Header = (): JSX.Element => {
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>({} as CompanyProfile);
  const { user } = useAuth();

  const { company } = user.data;

  useEffect(() => {
    const getCompany = async (): Promise<void> => {
      const response = await api.get(`/companies/${company}`);
      const { companyPicUrl: url, name } = response.data;
      setCompanyProfile({ url, name });
    };

    getCompany();
  }, [company]);

  return (
    <S.Wrapper>
      <S.ContentCompany>
        <img src={companyProfile.url} alt={companyProfile.name} />
      </S.ContentCompany>
      <S.Content>
        <S.ContentUser>
          <span className="name">{user.data.name}</span>
        </S.ContentUser>
        <S.ContentAvatar>
          {user.data.profilePicUrl.length > 0 ? (
            <img src={user.data.profilePicUrl} alt={user.data.name} />
          ) : (
            <img src={profileLogo} alt="Avatar del usuario" />
          )}
        </S.ContentAvatar>
      </S.Content>
    </S.Wrapper>
  );
};

export default Header;
