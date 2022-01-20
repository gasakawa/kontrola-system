import React, { useEffect, useState } from 'react';

import api from 'services/api';

import Table from 'components/Table';
import { Column } from 'types/table';
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

type ListUsersProps = {
  company: string;
  roleId: number;
};

type FilterData = {
  field: string;
  value: string;
};

const columns = [
  { field: 'givenName', headerName: 'Nombres', sortable: true, dbField: 'given_name', searchable: true },
  { field: 'familyName', headerName: 'Apellidos', sortable: true, dbField: 'family_name', searchable: true },
  { field: 'documentId', headerName: 'Documento', sortable: true, dbField: 'document_id', searchable: true },
  { field: 'email', headerName: 'E-mail', sortable: true, dbField: 'email', searchable: true },
  { field: 'plan', headerName: 'Plan', sortable: false, dbField: 'plan', searchable: false },
  { field: 'status', headerName: 'Status', sortable: true, dbField: 'status', searchable: false },
] as Column[];

const ListUsers = ({ company, roleId }: ListUsersProps): JSX.Element => {
  const [userList, setUserList] = useState<UserRecords | null>();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [direction, setDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('given_name');
  const [filterQuery, setFilterQuery] = useState<FilterData>(() => {
    return { field: '', value: '' };
  });

  useEffect(() => {
    const loadUsers = async (): Promise<void> => {
      const response = await api({
        method: 'GET',
        url: `/user/list/${company}?roleId=${roleId}&page=${currentPage}&records=${currentPageSize}&orderField=${orderBy}&orderDirection=${direction.toLocaleUpperCase()}&queryField=${
          filterQuery.field
        }:${filterQuery.value}`,
      });
      setUserList(response.data);
    };
    loadUsers();
  }, [company, roleId, currentPage, currentPageSize, direction, orderBy, filterQuery.value, filterQuery.field]);

  return (
    <S.Wrapper>
      <S.UserList>
        {userList?.users && (
          <>
            <Table
              columns={columns}
              rows={userList.users}
              total={userList.totalUsers}
              currentPageSize={currentPageSize}
              currentPage={currentPage}
              direction={direction}
              onRowsPerPageChange={pagesPerPage => {
                setCurrentPage(1);
                setCurrentPageSize(pagesPerPage);
              }}
              onPageChange={page => {
                setCurrentPage(page);
              }}
              onOrderChange={(field, order) => {
                setDirection(order);
                setOrderBy(field);
              }}
              onDeleteRow={id => console.log(id)}
              onEditRow={id => console.log(id)}
              onSearch={(field, value) =>
                setFilterQuery({
                  field,
                  value,
                })
              }
            />
          </>
        )}
      </S.UserList>
    </S.Wrapper>
  );
};

export default ListUsers;
