import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 400px;
  background: #fff;
  right: 0;
  padding: 1rem;
  box-shadow: var(--box-shadow);
  border-radius: 10px;
  border: 1px solid var(--color-primary);
`;

export const PlanHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const PlanTitle = styled.p`
  color: var(--color-text);
  font-size: var(--font-text-size-md);
  font-weight: 600;
`;

export const PlanDue = styled.div`
  display: flex;

  p {
    position: relative;
    background: #f0f0f0;
    color: #82868b;
    white-space: nowrap;
    font-size: 0.8rem;
    padding: 0.3rem 0.5rem;
    text-align: center;
    border-radius: 0.358rem;
    font-weight: 600;
  }

  span {
    position: absolute;
    top: -20px;
    background: rgba(0, 0, 0, 0.8);
    padding: 0.7rem;
    border-radius: 8px;
    font-size: 0.6rem;
    color: #fff;
    font-weight: 600;
    display: none;

    &:after {
      content: '';
      position: absolute;
      display: block;
      width: 0px;
      left: 50%;
      bottom: 0;
      border: 8px solid transparent;
      border-bottom: 0;
      border-top: 8px solid rgba(0, 0, 0, 0.8);
      transform: translate(-50%, calc(100%));
    }
  }
  &:hover {
    span {
      display: block;
      transition: 600ms ease-in-out;
    }
  }
`;

export const PlanName = styled.div`
  margin-top: 1rem;
  font-size: 0.9rem;
`;

export const PlanValue = styled.div`
  margin-top: 1rem;
  font-size: 0.9rem;
`;
