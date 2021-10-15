import React from 'react';
import { FaRegEnvelope } from 'react-icons/fa';

import * as S from './styles';

type ModalProps = {
  icon?: string;
  title: string;
  description: string;
  action: (action: string) => void;
};

const icons = {
  envelope: <FaRegEnvelope size={80} />,
} as any;

const Modal = ({ icon, title, description, action }: ModalProps): JSX.Element => {
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
          {icons[icon || 'envelope']}
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
