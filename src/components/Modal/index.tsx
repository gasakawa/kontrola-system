import React from 'react';
import { IconBaseProps } from 'react-icons';

import * as S from './styles';

type ModalProps = {
  icon?: React.ComponentType<IconBaseProps>;
  title: string;
  description: string;
  action: (action: string) => void;
  children?: JSX.Element;
};

const Modal = ({ icon: Icon, title, description, action, children }: ModalProps): JSX.Element => {
  const handleClose = (): void => {
    action('close');
  };
  return (
    <S.Wrapper>
      <S.Container>
        <span onClick={handleClose} role="none">
          &times;
        </span>
        <S.Content>
          {Icon && <Icon size={80} />}
          <S.Title>{title}</S.Title>
          <S.Description>
            <p>{description}</p>
          </S.Description>
          {children}
        </S.Content>
      </S.Container>
    </S.Wrapper>
  );
};

export default Modal;
