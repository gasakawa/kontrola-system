import styled from 'styled-components';

export const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 65px;
  border-radius: 10px;
  box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
  position: fixed;
  top: 0;
  right: 0;
  margin: 1.3rem 2rem 0;
  width: calc(100% - 4rem - 260px);
  background: #fff;
  transition: all 0.3s ease, background 0s;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  padding: 1.5rem;
`;

export const ContentCompany = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem;

  img {
    height: 60px;
    width: 100;
  }
`;

export const ContentUser = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: stretch;

  > img {
    height: 80px;
  }

  .name {
    font-weight: 500;
    font-size: var(--font-text-size-md);
    margin-right: 1rem;
  }
`;

export const ContentAvatar = styled.div`
  display: flex;
  padding: 5px;

  img {
    border-radius: 50%;
    height: 56px;
    width: 56px;
    color: rgba(0, 0, 0, 25%);
  }
`;
