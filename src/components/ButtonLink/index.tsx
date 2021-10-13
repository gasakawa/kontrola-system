import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonLink = ({ children, ...rest }: ButtonProps): JSX.Element => {
  return (
    <Container type="button" {...rest}>
      {children}
    </Container>
  );
};

export default ButtonLink;
