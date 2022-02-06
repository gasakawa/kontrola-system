import React from 'react';

import * as S from './styles';

type Options = {
  name: string;
  value: number | string;
};

type Props = {
  label: string;
  title: string;
  options: Options[];
  selectedValue: number | string;
  width: string;
  onSelectValue: (value: number | string) => void;
};

type SelectProps = React.HTMLProps<HTMLSelectElement> & Props;

const Select = ({
  label,
  title,
  options,
  selectedValue,
  width = '270px',
  onSelectValue,
  ...rest
}: SelectProps): JSX.Element => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    onSelectValue(e.currentTarget.value);
  };
  return (
    <S.Wrapper>
      <S.Label>{title}</S.Label>
      <S.SelectContainer width={width}>
        <select name={label} onChange={handleChange} defaultValue={selectedValue} {...rest}>
          {options.map(option => (
            <option key={`opt-${option.value}`} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </S.SelectContainer>
    </S.Wrapper>
  );
};

export default Select;
