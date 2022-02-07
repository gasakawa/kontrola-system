import React, { useEffect, useState } from 'react';

import api from 'services/api';

import Table from 'components/Table';
import { Column } from 'types/table';
import AddUserModal from 'components/AddUserModal';
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

const columns = [
  { field: 'fullName', headerName: 'Nombre', sortable: true, dbField: 'given_name', searchable: true },
  { field: 'documentId', headerName: 'Documento', sortable: false, dbField: 'document_id', searchable: false },
  { field: 'email', headerName: 'E-mail', sortable: false, dbField: 'email', searchable: false },
  { field: 'plan', headerName: 'Plan', sortable: false, dbField: 'plan', searchable: false },
  { field: 'status', headerName: 'Status', sortable: false, dbField: 'status', searchable: false },
] as Column[];

const ListUsers = ({ company, roleId }: ListUsersProps): JSX.Element => {
  const [userList, setUserList] = useState<UserRecords | null>();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [direction, setDirection] = useState('asc');
  const [filterQuery, setFilterQuery] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [updateList, setUpdateList] = useState(false);

  useEffect(() => {
    const loadUsers = async (): Promise<void> => {
      const response = await api.get<UserRecords>(
        `/user/list/${company}?roleId=${roleId}&page=${currentPage}&records=${currentPageSize}&orderDirection=${direction.toLocaleUpperCase()}&queryField=${filterQuery}`,
      );

      setUserList(response.data);
    };
    loadUsers();
  }, [company, roleId, currentPage, currentPageSize, direction, filterQuery, updateList]);

  return (
    <>
      <S.Wrapper>
        <S.UserList>
          {!!userList && (
            <Table
              columns={columns}
              rows={userList.users ? userList.users : []}
              total={userList.totalRecords}
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
              }}
              onDeleteRow={id => console.log(id)}
              onEditRow={id => console.log(id)}
              onSearch={value => setFilterQuery(value)}
              buttonAddRecord={{
                label: 'Adicionar cliente',
                show: true,
                enabled: !userList.allowAddNewUser,
                title: userList.allowAddNewUser ? '' : 'Ha alcanzado el límite de clientes',
                width: '200px',
                onClick: () => {
                  setShowAddUserModal(!showAddUserModal);
                },
              }}
            />
          )}
        </S.UserList>
      </S.Wrapper>
      {showAddUserModal && (
        <AddUserModal
          title="Adicionar cliente"
          userRole={roleId}
          actions={(close: boolean, update: boolean) => {
            if (update) {
              setUpdateList(true);
            }
            if (close) {
              setShowAddUserModal(false);
            }
          }}
        />
      )}
    </>
  );
};

export default ListUsers;
