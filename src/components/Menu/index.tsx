import { useAuth } from 'hooks/auth';
import React, { useEffect, useState } from 'react';

import api from 'services/api';

import { FaIdCard } from 'react-icons/fa';
import { MenuIcons } from 'types/menu-icons';
import * as S from './styles';

type Module = {
  id: number;
  name: string;
  icon: string;
  position: number;
  routines: [{ icon: string; id: number; link: string; position: number }];
};

const icons = {
  'fa-id-card': <FaIdCard size={20} />,
} as MenuIcons;

const Menu = (): JSX.Element => {
  const [modules, setModules] = useState<Module[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    const getModules = async (): Promise<void> => {
      const response = await api.get(`/modules/${user.data.sub}`);
      console.log('🚀 ~ file: index.tsx ~ line 17 ~ getModules ~ response', response);
      setModules(response.data);
    };
    if (user) {
      getModules();
    }
  }, [user]);
  return (
    <S.Wrapper>
      {modules.map(module => (
        <S.MenuParentContent key={module.id}>
          <S.MenuParentItem>
            <i>{icons[module.icon]}</i>
            <span>Item1</span>
          </S.MenuParentItem>
          <S.MenuParentItem>Item1</S.MenuParentItem>
          <S.MenuParentItem>Item1</S.MenuParentItem>
          <S.MenuParentItem>Item1</S.MenuParentItem>
        </S.MenuParentContent>
      ))}
    </S.Wrapper>
  );
};

export default Menu;
