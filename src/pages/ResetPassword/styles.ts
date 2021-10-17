import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 1rem;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px #ccc solid;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0px 10px 34px -15px rgb(0 0 0 / 24%);
`;

export const Title = styled.h2`
  font-size: var(--font-title-size);
  margin-bottom: 2rem;
  text-align: center;
`;

export const Description = styled.p`
  font-size: var(--font-text-size);
  text-align: center;

  @media (max-width: 450px) {
    font-size: var(--font-text-size-sm);
  }
`;
