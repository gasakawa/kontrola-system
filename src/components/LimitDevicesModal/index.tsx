import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { format, parseISO } from 'date-fns';

import { SigninDTO } from 'types';

import api from 'services/api';
import { handleError } from 'utils/handle-errors';
import { toast } from 'react-toastify';
import * as S from './styles';

type SessionLimitProps = {
  sessions?: SigninDTO;
  action: (action: string) => void;
};
const LimitDevicesModal = ({ sessions, action }: SessionLimitProps): JSX.Element => {
  const handleClose = (): void => {
    action('close');
  };

  const handleSignout = async (sessionId: string): Promise<void> => {
    try {
      await api({
        url: `/session/signout/${sessionId}`,
        method: 'PUT',
      });
      toast.success('Session finalizada exitosamente, intente acceder nuevamente');
      handleClose();
    } catch (err) {
      const { message } = handleError(err);
      toast.error(message);
    }
  };

  return (
    <S.Wrapper>
      <S.Container>
        <span onClick={handleClose} role="none">
          &times;
        </span>
        <S.Content>
          <FiAlertTriangle size={80} />
          <S.Title>Límite de dispositivos</S.Title>
          <S.Description>
            <p>
              Ha alcanzado el límite de dispositivos simultáneos. Si necesita más acessos solicite un upgrade de su
              plan, o finalize alguna de las conexiones listadas abajo
            </p>
          </S.Description>
          <S.ActiveSessionGrid>
            {sessions?.sessions &&
              sessions.sessions.map(session => (
                <div key={session.id}>
                  <p>
                    {format(parseISO(`${session.createdAt}`), 'dd/MM/yyyy')} | {session.details.city} | {session.email}
                  </p>
                  <p>
                    <S.Link
                      onClick={() => {
                        handleSignout(session.id);
                      }}
                      type="button"
                    >
                      Desconectar
                    </S.Link>
                  </p>
                </div>
              ))}
          </S.ActiveSessionGrid>
        </S.Content>
      </S.Container>
    </S.Wrapper>
  );
};

export default LimitDevicesModal;
