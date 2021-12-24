import React, { useEffect, useState } from 'react';
import { useAuth } from 'hooks/auth';

import { UserProfile } from 'types';
import api from 'services/api';
import ProfileInfo from 'components/ProfileInfo';
import UserPlan from 'components/UserPlan';
import UserData from 'components/UserData';
import ChangePassword from 'components/ChangePassword';
import * as S from './styles';

const Profile = (): JSX.Element => {
  const [userProfile, setUserProfile] = useState<UserProfile>({} as UserProfile);
  const {
    user: {
      data: { sub },
    },
  } = useAuth();

  useEffect(() => {
    const getUserProfile = async (): Promise<void> => {
      const response = await api.get(`/user/${sub}`);
      setUserProfile(response.data);
    };

    getUserProfile();
  }, [sub]);

  return (
    <S.Wrapper>
      {userProfile.user && (
        <>
          <S.Header>
            <>
              <ProfileInfo user={userProfile.user} />
              {userProfile.plan && (
                <UserPlan
                  name={userProfile.plan.name}
                  overdue={userProfile.plan.overdue}
                  nextPaymentDate={userProfile.plan.nextPaymentDate}
                  value={new Intl.NumberFormat('es', {
                    style: 'currency',
                    currencyDisplay: 'code',
                    currency: 'COP',
                  }).format(Number(userProfile.plan.value))}
                />
              )}
            </>
          </S.Header>
          <UserData user={userProfile} />
          <ChangePassword />
        </>
      )}
    </S.Wrapper>
  );
};

export default Profile;
