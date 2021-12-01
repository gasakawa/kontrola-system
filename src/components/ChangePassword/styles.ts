import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  flex: 1;
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  border-radius: 10px;
  margin-top: 2rem;

  h2 {
    font-weight: 700;
    color: var(--color-secondary);
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

export const FormRow = styled.div`
  display: flex;
`;

export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  width: 200px;

  button {
    margin-right: 1rem;
  }
`;
