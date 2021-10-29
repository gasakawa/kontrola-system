import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 400px;
  background: #fff;
  right: 0;
  padding: 1rem;
  box-shadow: var(--box-shadow);
  border-radius: 10px;

  h3 {
    color: var(--color-text);
    font-size: var(--font-text-size-md);
    font-weight: 600;
  }
`;

export const PlanName = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    color: var(--color-text);
    font-size: var(--font-text-size-md);
    font-weight: 600;
  }

  span {
    background: var(--color-primary);
    color: #fff;
    white-space: nowrap;
    display: inline-block;
    font-size: 85%;
    padding: 0.3rem 0.5rem;
    text-align: center;
    border-radius: 0.358rem;
    margin-top: 1rem;
    font-weight: 600;
  }
`;

export const PlanExpiry = styled.p`
  background: var(--color-primary);
  color: #fff;
  white-space: nowrap;
  display: inline-block;
  font-size: 85%;
  padding: 0.3rem 0.5rem;
  text-align: center;
  border-radius: 0.358rem;
  margin-top: 1rem;
  font-weight: 600;
  position: relative;

  span {
    display: none;
    position: absolute;
    background: var(--color-secondary);
    font-size: 0.7rem;
    top: -15px;
    right: -95px;
  }

  &:hover {
    span {
      display: block;
      transition: 500ms ease-in-out;
    }
  }
`;
