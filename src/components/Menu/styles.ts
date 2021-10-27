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
  justify-content: center;
  align-items: flex-start;
  text-decoration: none;
  list-style: none;
`;

export const MenuParentItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0 10px;

  span {
    margin-bottom: 5px;
    font-weight: 400;
    font-size: var(--font-text-size-md);
  }

  i {
    margin: 0 15px;
  }

  svg {
    color: var(--color-primary);
  }
`;

export const MenuChildrenContent = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-decoration: none;
  list-style: none;
  margin-left: 1rem;
`;

export const MenuChildrenItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;

  span {
    font-weight: 400;
    font-size: var(--font-text-size-md);

    a {
      text-decoration: none;
      color: var(--color-secondary);
    }
  }

  i {
    margin: 0 15px;
  }

  svg {
    margin-left: 5px;
    color: var(--color-primary);
  }
`;
