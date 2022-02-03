import React, { useState } from 'react';

import DatePicker, { setDefaultLocale } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import * as S from './style';

type CalendarProps = {
  label: string;
  width: string;
  onSelectDate: (date: Date) => void;
};

const Calendar = ({ label, width, onSelectDate }: CalendarProps): JSX.Element => {
  const [date, setDate] = useState(new Date());
  setDefaultLocale('es');

  return (
    <S.Wrapper width={width}>
      <S.ContainerLabel htmlFor={label}>{label}</S.ContainerLabel>
      <DatePicker
        selected={date}
        onChange={(dt: Date) => {
          setDate(dt);
          onSelectDate(dt);
        }}
        startDate={date}
        className="filtro-date-picker"
        dateFormat="dd/MM/yyyy"
        maxDate={new Date()}
      />
    </S.Wrapper>
  );
};

export default Calendar;
