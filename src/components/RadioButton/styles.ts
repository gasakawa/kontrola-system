import styled, { css } from 'styled-components';

interface RadioProps {
  hasError: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

export const Label = styled.div`
  font-size: var(--font-text-size-sm);
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 15px;
`;

export const Radios = styled.div<RadioProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  label {
    font-size: var(--font-text-size-sm);
    font-weight: 500;
    color: var(--color-primary);
    margin-right: 5px;
  }

  input {
    margin-right: 5px;

    ${props =>
      props.hasError &&
      css`
        border-color: #c53030;
      `}
  }
`;
