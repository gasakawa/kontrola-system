import React from 'react';

import * as S from './styles';

type UserPlanProps = {
  name: string;
  nextPaymentDate: string;
  value: string;
};

const UserPlan = ({ name, nextPaymentDate, value }: UserPlanProps): JSX.Element => {
  return (
    <S.Wrapper>
      <S.PlanHeader>
        <S.PlanTitle>Plan actual</S.PlanTitle>
        <S.PlanDue>
          <p>{nextPaymentDate}</p>
          <span>Vencimiento</span>
        </S.PlanDue>
      </S.PlanHeader>
      <S.PlanName>{name}</S.PlanName>
      <S.PlanValue>{value}</S.PlanValue>
    </S.Wrapper>
  );
};

export default UserPlan;
