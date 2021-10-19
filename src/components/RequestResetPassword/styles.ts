import styled from 'styled-components';

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
