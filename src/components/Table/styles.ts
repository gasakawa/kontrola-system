import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-around;
  font-weight: 600;
  width: 100%;
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
`;

export const Actions = styled.div`
  display: flex;
  align-items: flex-start;

  svg {
    color: var(--color-primary);
    margin-right: 15px;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 20px;
  justify-content: flex-end;
`;

export const InputSearch = styled.div`
  display: flex;
  margin: 0 10px;
  align-items: center;
  position: relative;

  input {
    height: 40px;
    border-radius: 8px;
    border: 1px solid var(--color-primary);
    font-family: 'Montserrat';
    color: var(--color-text);
    padding: 10px;
  }

  svg {
    position: absolute;
    right: 10px;
    color: var(--color-primary);
    cursor: pointer;
  }
`;

export const NoRecordsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  font-size: 0.9rem;
  font-weight: 500;
`;

export const ButtonsContainer = styled.div`
  display: flex;
`;
