import styled, { css } from 'styled-components';

type LayoutProps = {
  private: boolean;
};

export const Wrapper = styled.div`
  display: flex;
`;

export const Content = styled.div<LayoutProps>`
  display: flex;
  align-items: center;
  ${props =>
    props.private
      ? css`
          width: calc(100% - 4rem - 260px);
          top: 7rem;
          right: 0;
          height: auto;
          margin: 1.3rem 2rem 0;
          position: absolute;
        `
      : css`
          width: 100%;
          justify-content: center;
        `}
`;
