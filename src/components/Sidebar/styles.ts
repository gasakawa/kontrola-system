import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  box-shadow: 0px 10px 34px -15px rgb(0 0 0 / 50%);
  background: #fff;
  transition: all 0.3s ease, background 0s;
  height: 100vh;
  width: 260px;
  position: fixed;
  left: 0;
  top: 0;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;

  img {
    margin: 1rem;
    width: 150px;
  }
`;

export const Logout = styled.div`
  display: flex;
  align-items: center;
`;
