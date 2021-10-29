import React from 'react';

import * as S from './styles';

type UserPlanProps = {
  name: string;
  nextPaymentDate: string;
};

const UserPlan = ({ name, nextPaymentDate }: UserPlanProps): JSX.Element => {
  return (
    <S.Wrapper>
      <S.PlanName>
        <h3>Plan actual</h3>
        <span>{name}</span>
        <S.PlanExpiry>
          {nextPaymentDate} <span>Vencimiento</span>
        </S.PlanExpiry>
      </S.PlanName>
    </S.Wrapper>
  );
};

export default UserPlan;
