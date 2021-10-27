import styled, { css } from 'styled-components';

type MenuProps = {
  show: boolean;
};

export const MenuParentContent = styled.ul<MenuProps>`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-decoration: none;
  list-style: none;
  width: 100%;

  ${props =>
    props.show
      ? css`
          display: flex;
          transition: display 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        `
      : css`
          display: none;
        `}
`;

export const MenuParentItem = styled.li`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  margin: 15px 0 10px;
  width: 100%;
  padding: 0.9rem 1rem;

  &:hover {
    border-left: 3px solid rgba(0, 0, 0, 60%);
  }

  span {
    font-weight: 400;
    font-size: var(--font-text-size-md);
  }
`;

export const ItemWrapper = styled.div`
  display: flex;
`;

export const MenuItemIcon = styled.span`
  margin-right: 1rem;

  svg {
    color: var(--color-primary);
  }
`;

export const MenuItemDescription = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1 1 auto;
  min-width: 0 px;
  margin-top: 4 px;
  margin-bottom: 4 px;
  color: var(--color-primary);

  span {
    font-weight: 500;
    font-size: var(--font-text-size-md);
  }

  a {
    font-weight: 400;
    text-decoration: none;
    cursor: pointer;
    color: var(--color-primary);
    &:hover {
      border-bottom: 3px solid rgba(0, 0, 0, 60%);
    }
  }

  svg {
    right: 1.6rem;
    position: absolute;
  }
`;

export const MenuChildrenItem = styled.li`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 0.9rem 1rem;
  border-radius: 8px;
  background: #fff;
`;
