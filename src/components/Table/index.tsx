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

import TableOrderColumn from 'components/TableOrderColumn';
import { Column } from 'types/table';

type TableProps = {
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
};

const Table = ({
  columns,
  rows,
  total,
  currentPageSize,
  currentPage,
  direction,
  onRowsPerPageChange,
  onPageChange,
  onOrderChange,
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

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <StyledTableRow key={row.id}>
                {columns.filter(col => {
                  const keys = Object.keys(row);
                  if (keys.includes(col.field)) {
                    return (
                      <StyledTableCell align="left" key={row.id}>
                        {row[col.field]}
                      </StyledTableCell>
                    );
                  }
                })}
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                colSpan={3}
                count={total}
                rowsPerPage={currentPageSize}
                page={currentPage - 1}
                labelRowsPerPage="Registros por página"
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                align="left"
                labelDisplayedRows={({ from, to, count }) => {
                  return `${from} a ${to} de ${count}`;
                }}
              />
            </TableRow>
          </TableFooter>
        </MTable>
      </TableContainer>
    </Paper>
  );
};

export default Table;
