import React, { useEffect, useState } from 'react';
import { useAuth } from 'hooks/auth';
import { FiUser } from 'react-icons/fi';
import api from 'services/api';
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
            <FiUser size={32} />
          )}
        </S.ContentAvatar>
      </S.Content>
    </S.Wrapper>
  );
};

export default Header;
