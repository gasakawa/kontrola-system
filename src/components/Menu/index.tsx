import React, { useEffect, useState } from 'react';
import { useAuth } from 'hooks/auth';

import api from 'services/api';

import { Module } from 'types';
import MenuItem from 'components/MenuItem';
import * as S from './styles';

const Menu = (): JSX.Element => {
  const [modules, setModules] = useState<Module[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    const getModules = async (): Promise<void> => {
      const response = await api.get(`/modules/${user.data.sub}`);
      setModules(response.data);
    };
    if (user) {
      getModules();
    }
  }, [user]);
  return (
    <S.Wrapper>
      {modules.map(module => (
        <MenuItem key={module.id} module={module} />
      ))}
    </S.Wrapper>
  );
};

export default Menu;
