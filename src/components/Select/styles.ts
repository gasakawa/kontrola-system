import styled, { css } from 'styled-components';

interface SelectContainerProps {
  width: string;
  hasErrors: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: ;
`;

export const Label = styled.div`
  font-size: var(--font-text-size-sm);
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 10px;
`;

export const SelectContainer = styled.div<SelectContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;

  label {
    font-size: var(--font-text-size-sm);
    font-weight: 500;
    color: var(--color-primary);
    margin-right: 5px;
  }

  select {
    margin-right: 5px;
    height: 40px;
    width: ${props => props.width};
    border-radius: 8px;
    border: 1px solid #ccc;
    font-family: 'Montserrat';
    background: #fff;
    padding: 0.571rem 0.3rem;

    ${props =>
      props.hasErrors &&
      css`
        border-color: #c53030;
      `}
  }
`;
