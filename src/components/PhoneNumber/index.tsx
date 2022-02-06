import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import es from 'react-phone-input-2/lang/es.json';
import { ErrorInputText } from 'styles/errors';

import * as S from './styles';

type PhoneNumberProps = {
  title: string;
  width: string;
  label: string;
  error: boolean;
  errorMessage: string;
  onChangeValue: (value: string) => void;
};

const PhoneNumber = ({ title, width, label, error, errorMessage, onChangeValue }: PhoneNumberProps): JSX.Element => {
  const [phoneNumber, setPhoneNumber] = useState('');
  return (
    <S.Wrapper>
      <S.Label>
        <label htmlFor={label}>{title}</label>
      </S.Label>
      <PhoneInput
        value={phoneNumber}
        country="co"
        onlyCountries={['co']}
        onChange={phone => {
          onChangeValue(phone);
          setPhoneNumber(phone);
        }}
        inputProps={{
          name: label,
          required: true,
        }}
        inputStyle={{
          width,
          height: '40px',
          borderColor: error ? '#c53030' : '#ccc',
        }}
        localization={es}
        showDropdown={false}
      />
      {error && <ErrorInputText>{errorMessage}</ErrorInputText>}
    </S.Wrapper>
  );
};

export default PhoneNumber;
