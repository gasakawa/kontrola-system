import styled from 'styled-components';

export const Wrapper = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 2rem;
  width: 260px;
  padding-left: 1rem;
`;

export const MenuParentContent = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-decoration: none;
  list-style: none;
`;

export const MenuParentItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin-left: 10px;
    font-weight: 400;
    font-size: var(--font-text-size-sm);
  }
`;
