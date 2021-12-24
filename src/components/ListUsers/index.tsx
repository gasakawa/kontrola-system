import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';

import Table from 'components/Table';

import api from 'services/api';
import * as S from './styles';

type UserRecords = {
  allowAddNewUser: boolean;
  pages: number;
  totalAdmins: number;
  totalUsers: number;
  totalActiveUsers: number;
  totalRecords: number;
  users: [
    {
      id: string;
      givenName: string;
      familyName: string;
      documentId: string;
      email: string;
      status: string;
      plan: string;
    },
  ];
};

type Order = {
  orderColumnId: number;
  orderDirection: string;
};

type ListUsersProps = {
  company: string;
  roleId: number;
};

type FilterData = {
  field: string;
  value: string;
};

type FilterColumn = {
  [key: string]: string;
};

const columns = [
  { field: 'givenName', title: 'Nombres' },
  { field: 'familyName', title: 'Apellidos' },
  { field: 'documentId', title: 'Documento' },
  { field: 'email', title: 'E-mail', filtering: false },
  { field: 'status', title: 'Status', filtering: false },
];

const orderColumns = ['given_name', 'family_name', 'document_id', 'email', 'status'];
const filterColumns = { givenName: 'given_name', familyName: 'family_name', documentId: 'document_id' } as FilterColumn;

const ListUsers = ({ company, roleId }: ListUsersProps): JSX.Element => {
  const [userList, setUserList] = useState<UserRecords | null>();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [order, setOrder] = useState<Order>(() => {
    return { orderColumnId: 0, orderDirection: 'asc' };
  });
  const [filterQuery, setFilterQuery] = useState<FilterData>(() => {
    return { field: '', value: 'null' };
  });

  useEffect(() => {
    const loadUsers = async (): Promise<void> => {
      const orderBy = orderColumns[order.orderColumnId];
      const response = await api({
        method: 'GET',
        url: `/user/list/${company}?roleId=${roleId}&page=${currentPage}&records=${currentPageSize}&orderField=${orderBy}&orderDirection=${order.orderDirection.toLocaleUpperCase()}&queryField=${
          filterQuery.field
        }:${filterQuery.value}`,
      });
      setUserList(response.data);
    };
    loadUsers();
  }, [
    company,
    roleId,
    currentPage,
    currentPageSize,
    order.orderDirection,
    order.orderColumnId,
    filterQuery.value,
    filterQuery.field,
  ]);

  return (
    <S.Wrapper>
      <S.UserList>
        {userList?.users && (
          <>
            {/* <Table columns={columns} rows={userList.users} /> */}
            <MaterialTable
              title="Clientes"
              columns={columns}
              style={{
                width: '100%',
              }}
              options={{
                debounceInterval: 700,
                padding: 'dense',
                filtering: true,
                headerStyle: {
                  backgroundColor: '#016795',
                  color: '#fff',
                  fontFamily: 'Montserrat',
                },
                search: false,
                pageSizeOptions: [10, 25, 50],
              }}
              data={userList.users}
              onChangePage={page => setCurrentPage(page + 1)}
              onChangeRowsPerPage={pageSize => setCurrentPageSize(pageSize)}
              onOrderChange={(orderColumnId, orderDirection) => setOrder({ orderColumnId, orderDirection })}
              onFilterChange={filter => {
                const [dataFilter] = filter;

                if (dataFilter) {
                  if (dataFilter.column.field) {
                    setFilterQuery({
                      field: filterColumns[dataFilter.column.field] || '',
                      value: dataFilter.value,
                    });
                  }
                }
              }}
              localization={{
                pagination: {
                  labelDisplayedRows: '{from} - {to} de {count}',
                  labelRowsSelect: 'Registros',
                  firstTooltip: 'Primeira página',
                  previousTooltip: 'Anterior',
                  lastTooltip: 'Última página',
                  nextTooltip: 'Próxima',
                },
                toolbar: {
                  nRowsSelected: '{0} linha(s) selecionadas',
                  searchTooltip: 'Buscar',
                  searchPlaceholder: 'Buscar',
                },
                header: {
                  actions: 'Ações',
                },
                body: {
                  emptyDataSourceMessage: 'Não hay registros',
                  filterRow: {
                    filterTooltip: 'Filtro',
                  },
                  editRow: {
                    saveTooltip: 'Salvar',
                    cancelTooltip: 'Cancelar',
                  },
                  editTooltip: 'Editar',
                },
              }}
            />
          </>
        )}
      </S.UserList>
    </S.Wrapper>
  );
};

export default ListUsers;
