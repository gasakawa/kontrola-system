import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import * as S from './style';

type TableOrderColumProps = {
  title: string;
  order: string;
  changeOrder: (order: string) => void;
};

const TableOrderColumn = ({ title, order, changeOrder }: TableOrderColumProps): JSX.Element => {
  const [direction, setDirection] = useState(order);

  return (
    <S.Wrapper>
      <S.Text
        onClick={() => {
          if (direction === 'asc') {
            setDirection('desc');
            changeOrder('desc');
          } else {
            setDirection('asc');
            changeOrder('asc');
          }
        }}
      >
        <p>{title}</p>
        {direction === 'asc' ? <FiChevronDown /> : <FiChevronUp />}
      </S.Text>
    </S.Wrapper>
  );
};

export default TableOrderColumn;
