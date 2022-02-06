import React from 'react';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import {
  TableContainer,
  Paper,
  Table as MTable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TableFooter,
} from '@mui/material';

import { FaUserEdit, FaUserAltSlash } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';

import TableOrderColumn from 'components/TableOrderColumn';
import { Column } from 'types/table';
import Button from 'components/Button';
import * as S from './styles';

type ButtonTable = {
  enabled: boolean;
  label: string;
  show: boolean;
  width: string;
  title: string;
  onClick: () => void;
};

interface TableProps {
  columns: Column[];
  rows: {
    [x: string]: any;
  }[];
  total: number;
  currentPageSize: number;
  currentPage: number;
  direction: string;
  onRowsPerPageChange: (pagesPerPage: number) => void;
  onPageChange: (page: number) => void;
  onOrderChange: (field: string, direction: string) => void;
  onEditRow: (id: string) => void;
  onDeleteRow: (id: string) => void;
  onSearch: (value: string) => void;
  buttonAddRecord: ButtonTable;
}

const Table = ({
  columns,
  rows,
  total,
  currentPageSize,
  currentPage,
  direction,
  buttonAddRecord,
  onRowsPerPageChange,
  onPageChange,
  onOrderChange,
  onEditRow,
  onDeleteRow,
  onSearch,
}: TableProps): JSX.Element => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#266795',
      color: theme.palette.common.white,
      fontFamily: 'Montserrat',
      fontSize: '0.9rem',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: '0.887rem',
      fontFamily: 'Montserrat',
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const StyledTablePagination = styled(TablePagination)(
    () => `
    & .MuiTablePagination-selectLabel {
      font-size: 0.887rem;
      font-family: Montserrat;
      color: #266795;
    }

    & .MuiTablePagination-select {
        font-size: 0.887rem;
        font-family: Montserrat;
        color: #266795;

     }

    & .MuiTablePagination-displayedRows {
        font-size: 0.887rem;
        font-family: Montserrat;
        color: #266795;

    }
    & .MuiTablePagination-input {
        font-size: 0.887rem;
        font-family: Montserrat;
        color: #266795;

    }
  `,
  );

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const pagesPerPage = Number(event.target.value);
    onRowsPerPageChange(pagesPerPage);
  };

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number): void => {
    onPageChange(page + 1);
  };

  const handleOrderChange = (field: string, order: string): void => {
    onOrderChange(field, order);
  };

  const handleSearch = (value: string): void => {
    onSearch(value);
  };

  return (
    <S.Wrapper>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <S.SearchContainer>
          <S.InputSearch>
            <input
              type="text"
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                handleSearch(e.currentTarget.value);
              }}
            />
            <FiSearch />
          </S.InputSearch>
          {buttonAddRecord.show && (
            <S.ButtonsContainer>
              <Button
                type="button"
                disabled={buttonAddRecord.enabled}
                style={{ width: buttonAddRecord.width }}
                title={buttonAddRecord.title}
                onClick={() => {
                  buttonAddRecord.onClick();
                }}
              >
                {buttonAddRecord.label}
              </Button>
            </S.ButtonsContainer>
          )}
        </S.SearchContainer>
        <TableContainer>
          <MTable stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map(col => (
                  <StyledTableCell key={col.field}>
                    {col.sortable ? (
                      <TableOrderColumn
                        title={col.headerName}
                        order={direction}
                        changeOrder={order => handleOrderChange(col.dbField, order)}
                      />
                    ) : (
                      col.headerName
                    )}
                  </StyledTableCell>
                ))}
                <StyledTableCell>Acciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <StyledTableRow key={row.id}>
                  {columns.map(col => {
                    return (
                      <StyledTableCell align="left" key={`${row.id}-${col.field}`}>
                        {row[col.field]}
                      </StyledTableCell>
                    );
                  })}
                  <StyledTableCell>
                    <S.Actions>
                      <FaUserEdit size={16} title="Editar" onClick={() => onEditRow(row.id)} />
                      <FaUserAltSlash size={16} color="#ed1515" title="Eliminar" onClick={() => onDeleteRow(row.id)} />
                    </S.Actions>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
            {rows.length > 0 && (
              <TableFooter>
                <TableRow>
                  <StyledTablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    colSpan={3}
                    count={total}
                    rowsPerPage={currentPageSize}
                    page={currentPage - 1}
                    labelRowsPerPage="Registros por página"
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    labelDisplayedRows={({ from, to, count }) => {
                      return `${from} a ${to} de ${count}`;
                    }}
                  />
                </TableRow>
              </TableFooter>
            )}
          </MTable>
          {rows.length === 0 && <S.NoRecordsWrapper>No se encontraron resultados</S.NoRecordsWrapper>}
        </TableContainer>
      </Paper>
    </S.Wrapper>
  );
};

export default Table;
