import React, { useEffect, useState } from 'react';
import { useAuth } from 'hooks/auth';

import { UserProfile } from 'types';
import api from 'services/api';
import ProfileInfo from 'components/ProfileInfo';
import UserPlan from 'components/UserPlan';
import UserData from 'components/UserData';
import * as S from './styles';

const Profile = (): JSX.Element => {
  const [userProfile, setUserProfile] = useState<UserProfile>({} as UserProfile);
  //   const [user] = useState(useAuth());
  const { user } = useAuth();
  //   console.log('🚀 ~ file: index.tsx ~ line 13 ~ user', user.user);

  useEffect(() => {
    const getUserProfile = async (): Promise<void> => {
      const response = await api.get(`/user/${user.data.sub}`);
      setUserProfile(response.data);
    };

    getUserProfile();
  }, [user.data.sub]);

  return (
    <S.Wrapper>
      <S.Header>
        <ProfileInfo user={userProfile} />
        {userProfile.plan && (
          <UserPlan
            name={userProfile.plan.name}
            nextPaymentDate={userProfile.plan.nextPaymentDate}
            value={new Intl.NumberFormat('es', { style: 'currency', currencyDisplay: 'code', currency: 'COP' }).format(
              Number(userProfile.plan.value),
            )}
          />
        )}
      </S.Header>
      <UserData user={userProfile} />
    </S.Wrapper>
  );
};

export default Profile;
