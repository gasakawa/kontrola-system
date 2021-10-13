import styled, { css } from 'styled-components';

interface ErrorProps {
  hasError: boolean;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
  }
`;

export const ContentInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  svg {
    position: absolute;
    color: rgba(0, 0, 0, 0.5);
    right: 0;
    margin-top: 10px;
    margin-right: 10px;
  }
`;

export const ContentInput = styled.input<ErrorProps>`
  height: 40px;
  width: 250px;
  border-radius: 8px;
  border: 1px solid #ccc;

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
