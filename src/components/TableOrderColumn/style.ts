import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Text = styled.div`
  color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;

  &:hover {
    cursor: pointer;
  }

  p {
    color: #fff;
  }

  svg {
    color: #fff;
    margin-left: 5px;
  }
`;
