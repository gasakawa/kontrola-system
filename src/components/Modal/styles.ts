import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1;
  height: 100vh;
  width: 100vw;
  top: 0;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

export const Container = styled.div`
  display: flex;
  position: absolute;
  width: 400px;
  height: 400px;

  span {
    color: #fff;
    font-size: 2rem;
    font-weight: 500;
    position: absolute;
    right: 0;
    top: 0;
    margin: 0.5rem 1rem;
    text-decoration: none;

    &:hover,
    :focus {
      color: #ccc;
      cursor: pointer;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: var(--color-secondary);
  width: 400px;
  height: 400px;
  padding: 2rem 1rem;

  @media (max-width: 450px) {
    padding: 2rem;
  }

  svg {
    color: #fff;
    margin-bottom: 2rem;
  }
`;

export const Title = styled.h2`
  font-size: 1.2rem;
  color: #fff;
  font-weight: 600;
  text-align: center;
  margin-bottom: 3rem;

  @media (max-width: 450px) {
    font-size: 1rem;
  }
`;

export const Description = styled.div`
  display: flex;
  p {
    font-size: 1rem;
    color: #fff;
    font-weight: 500;
  }
`;
