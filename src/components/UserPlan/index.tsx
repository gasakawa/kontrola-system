import React from 'react';

import * as S from './styles';

type UserPlanProps = {
  name: string;
  nextPaymentDate: string;
  value: string;
  overdue: boolean;
};

const UserPlan = ({ name, nextPaymentDate, value, overdue }: UserPlanProps): JSX.Element => {
  return (
    <S.Wrapper>
      <S.PlanHeader>
        <S.PlanTitle>Plan actual</S.PlanTitle>
        <S.PlanDue overdue={overdue}>
          <p>{nextPaymentDate}</p>
          <span>{overdue ? 'Vencido' : 'Vencimiento'}</span>
        </S.PlanDue>
      </S.PlanHeader>
      <S.PlanName>{name}</S.PlanName>
      <S.PlanValue>{value}</S.PlanValue>
    </S.Wrapper>
  );
};

export default UserPlan;
