import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  background: #fff;
  margin-right: 1rem;
  flex: 1;
  box-shadow: var(--box-shadow);
  padding: 1rem;
  border-radius: 10px;
`;

export const Photo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 90px;
    width: 90px;
  }
`;

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.8rem;
`;

export const UserInfo = styled.div`
  color: var(--color-text);
  h2 {
    font-size: var(--font-text-size);
    font-weight: 600;
  }

  span {
    font-size: var(--font-text-size-sm);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 80px;
`;

export const UserDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 3rem;
`;

export const UserDetailLine = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: start;
  font-size: var(--font-text-size-md);
  font-weight: 500;
  margin-top: 1rem;

  div {
    width: 100px;
    svg {
      color: var(--color-primary);
      margin-right: 0.5rem;
    }
  }
`;
