import { compareAsc, parseISO } from 'date-fns';
import React, { useState } from 'react';

import * as S from './styles';

type UserPlanProps = {
  name: string;
  nextPaymentDate: string;
  value: string;
  dateISO: string;
};

const UserPlan = ({ name, nextPaymentDate, value, dateISO }: UserPlanProps): JSX.Element => {
  const [overdue] = useState(() => {
    const over = compareAsc(parseISO(dateISO), new Date());
    return over !== 1;
  });

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
