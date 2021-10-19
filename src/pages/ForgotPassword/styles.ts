import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    margin: 2rem;
    width: 300px;
  }

  @media (max-width: 450px) {
    padding: 30px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  border: 1px #ccc solid;
  padding: 1.5rem;
  border-radius: 5px;
  box-shadow: 0px 10px 34px -15px rgb(0 0 0 / 24%);
`;

export const Title = styled.h2`
  font-size: 1.3rem;
  margin: 10px 10px;

  @media (max-width: 450px) {
    font-size: 0.8rem;
    text-align: center;
  }
`;

export const Description = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;

  @media (max-width: 450px) {
    font-size: 0.7rem;
  }
`;
