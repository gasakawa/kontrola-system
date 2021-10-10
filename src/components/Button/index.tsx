import React, { ButtonHTMLAttributes } from 'react';

import * as S from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...rest }: ButtonProps): JSX.Element => {
  return (
    <S.Container type="button" {...rest}>
      {children}
    </S.Container>
  );
};

export default Button;
