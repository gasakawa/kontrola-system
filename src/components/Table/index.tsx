import React from 'react';

import * as S from './styles';

type TableProps = {
  columns: {
    field: string;
    title: string;
  }[];
  rows: any[];
};

const Table = ({ columns, rows }: TableProps): JSX.Element => {
  return (
    <S.Wrapper>
      <S.Row>
        {columns.map(col => (
          <span key={col.field}>{col.title}</span>
        ))}
      </S.Row>
      {rows.map(row => {
        console.log(Object.keys(row));
        const keys = Object.keys(row);

        return <span key={row.id}>Teste</span>;
      })}
      {JSON.stringify(rows)}
    </S.Wrapper>
  );
};

export default Table;
