import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface ErrorProps {
  hasError: boolean;
}

export const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  border: 1px #ccc solid;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0px 10px 34px -15px rgb(0 0 0 / 24%);

  form {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    max-width: 400px;

    h2 {
      margin-bottom: 24px;
    }

    a {
      color: #1b2431;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;
      font-size: 0.9rem;
      font-weight: 500;

      &:hover {
        color: ${shade(0.2, '#1b2431')};
      }
    }
  }
`;

export const InputContainer = styled.div<ErrorProps>`
  background: #fff;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 10px;

  border: 1px solid #999;
  color: #666360;

  & + div {
    margin-top: 10px;
  }

  ${props =>
    props.hasError &&
    css`
      border-color: #c53030;
    `}

  input {
    color: var(--color-text);
    background: transparent;
    flex: 1;
    border: 0;

    &::placeholder {
      color: #666360;
    }
    font-family: 'Montserrat';
  }
`;

export const Error = styled.span`
  display: flex;
  align-self: flex-start;
  font-size: 0.8rem;
  margin-top: 2px;
  color: #c53030;
  margin-left: 5px;
`;
