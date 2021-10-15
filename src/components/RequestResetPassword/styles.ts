import styled, { css } from 'styled-components';

interface ErrorProps {
  hasError: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-top: 1rem;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  p {
    font-size: 0.9rem;
    margin-top: 1rem;
    font-weight: 500;
    text-align: center;

    @media (max-width: 450px) {
      font-size: 0.7rem;
    }
  }
`;

export const Input = styled.input<ErrorProps>`
  height: 40px;
  width: 250px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-family: 'Montserrat';

  padding: 10px;
  margin-top: 10px;

  ${props =>
    props.hasError &&
    css`
      border-color: #c53030;
    `}

  &:disabled {
    padding: 10px;
  }
`;
