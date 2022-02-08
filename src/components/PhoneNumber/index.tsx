import React from 'react';
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
  value: string;
  onChangeValue: (value: string) => void;
};

const PhoneNumber = ({
  title,
  width,
  label,
  error,
  errorMessage,
  disabled,
  value,
  onChangeValue,
}: PhoneNumberProps): JSX.Element => {
  return (
    <S.Wrapper>
      <S.Label>
        <label htmlFor={label}>{title}</label>
      </S.Label>
      <PhoneInput
        value={value}
        country="co"
        onlyCountries={['co']}
        onChange={phone => {
          onChangeValue(phone);
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
