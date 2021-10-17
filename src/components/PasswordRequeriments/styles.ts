import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  span {
    font-weight: 600;
    font-size: var(--font-text-size-md);
    margin-top: 2rem;
  }

  ul {
    margin-top: 1rem;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    font-size: var(--font-text-size-md);
  }
  li {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      margin-right: 5px;
      color: green;
    }
  }
`;
