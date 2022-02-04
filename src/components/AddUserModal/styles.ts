import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 5;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

export const Container = styled.div`
  display: flex;
  position: absolute;
  width: auto;
  height: auto;

  .close-button {
    color: var(--color-primary);
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
  background: #fff;

  padding: 2rem 3rem;
  border-radius: 8px;

  @media (max-width: 450px) {
    padding: 2rem;
  }

  svg {
    color: #fff;
    margin-bottom: 2rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormRow = styled.div`
  display: flex;
  margin-top: 10px;
`;

export const Title = styled.h2`
  font-size: 1.2rem;
  color: var(--color-primary);
  font-weight: 600;
  text-align: center;
  margin-bottom: 3rem;

  @media (max-width: 450px) {
    font-size: 1rem;
  }
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;

  button {
    width: 200px;
  }
`;
