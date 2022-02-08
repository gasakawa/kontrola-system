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
  disabled: boolean;
  onChangeValue: (value: string) => void;
};

const PhoneNumber = ({
  title,
  width,
  label,
  error,
  errorMessage,
  disabled,
  onChangeValue,
}: PhoneNumberProps): JSX.Element => {
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
          backgroundColor: disabled ? 'rgba(1,103,149,0.2)' : '#fff',
        }}
        localization={es}
        showDropdown={false}
        disabled={disabled}
      />
      {error && <ErrorInputText>{errorMessage}</ErrorInputText>}
    </S.Wrapper>
  );
};

export default PhoneNumber;
