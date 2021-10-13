import styled from 'styled-components';

export const Title = styled.h2`
  font-size: 2rem;
  margin: 10px 10px;
`;

export const Description = styled.div`
  font-size: 0.9rem;
  margin: 10px 10px;
  font-weight: 500;
  background: var(--color-primary);
  padding: 15px;
  color: #fff;
`;

export const FormContiner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const DigitsContiner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DigitInput = styled.input`
  border: 1px #ccc solid;
  width: 40px;
  height: 60px;
  text-align: center;
  margin-top: 10px;
  font-size: 2rem;
  color: var(--color-primary);
  & + input {
    margin-left: 5px;
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 20px;

  button {
    background: #fff;
    border: 0;
    font-size: 1rem;
    color: var(--color-primary);
    cursor: pointer;
    text-decoration: underline;
  }
`;
