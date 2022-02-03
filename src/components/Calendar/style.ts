import styled from 'styled-components';

interface WrapperProps {
  width: string;
}

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 1rem;

  input {
    height: 40px;
    width: ${props => props.width};
    border-radius: 8px;
    border: 1px solid #ccc;
    font-family: 'Montserrat';

    padding: 10px;
    margin-top: 10px;
  }
`;

export const ContainerLabel = styled.label`
  display: flex;
  justify-content: flex-start;
  font-size: var(--font-text-size-sm);
  font-weight: 600;
  color: var(--color-primary);
`;
