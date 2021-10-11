import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Container = styled.div`
  border: 1px #ccc solid;
  border-radius: 5px;
  box-shadow: 0px 10px 34px -15px rgb(0 0 0 / 24%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;
`;

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

export const ResendCodeText = styled.span`
  margin-top: 15px;
`;
