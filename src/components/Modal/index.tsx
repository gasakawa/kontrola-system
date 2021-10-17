import React from 'react';
import { IconBaseProps } from 'react-icons';

import * as S from './styles';

type ModalProps = {
  icon?: React.ComponentType<IconBaseProps>;
  title: string;
  description: string;
  action: (action: string) => void;
};

const Modal = ({ icon: Icon, title, description, action }: ModalProps): JSX.Element => {
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
        </S.Content>
      </S.Container>
    </S.Wrapper>
  );
};

export default Modal;
