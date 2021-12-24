import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  background: #fff;

  flex: 1;
  box-shadow: var(--box-shadow);
  padding: 1rem;
  border-radius: 10px;
`;

export const Photo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  img {
    max-width: 300px;
    height: 120px;
    width: 100%;
  }

  svg {
    color: #f0f0f0;
  }
`;

export const ButtonUpload = styled.div`
  border-radius: 2px;
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  background-color: #f6f6f6;
  border: 1px solid var(--color-primary);
  color: #333;
  transition: 0.3s;
  cursor: pointer;
  line-height: 28px;
  padding: 5px;
  position: relative;

  span {
    font-size: 0.8rem;
    margin-left: 5px;
  }

  svg {
    color: var(--color-primary);
  }

  input {
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
    cursor: pointer;
    opacity: 0;
    position: absolute;
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
