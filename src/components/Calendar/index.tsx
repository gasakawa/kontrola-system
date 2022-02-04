import React, { useState } from 'react';

import DatePicker, { setDefaultLocale } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import * as S from './style';

type CalendarProps = {
  label: string;
  width: string;
  onSelectDate: (date: Date) => void;
  required: boolean;
};

const Calendar = ({ label, width, required, onSelectDate }: CalendarProps): JSX.Element => {
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
        dateFormat="dd/MM/yyyy"
        maxDate={new Date()}
        required={required}
        showYearDropdown
      />
    </S.Wrapper>
  );
};

export default Calendar;
