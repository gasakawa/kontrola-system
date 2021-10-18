import styled, { css } from 'styled-components';

interface ContainerProps {
  hasError: boolean;
  width: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  &:disabled {
    padding: 10px;
  }

  input {
    height: 40px;
    width: ${props => props.width};
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
  }
`;

export const ContainerPassword = styled.div<ContainerProps>`
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

  input {
    height: 40px;
    width: ${props => props.width};
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
  }
`;

export const ContentInputPassword = styled.input``;
