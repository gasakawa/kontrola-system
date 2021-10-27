import React, { useEffect, useState } from 'react';
import { useAuth } from 'hooks/auth';

import api from 'services/api';

import { FaIdCard } from 'react-icons/fa';
import { FiHome, FiUsers, FiTool, FiFileText, FiCircle } from 'react-icons/fi';
import { BsFillCalculatorFill, BsFillGearFill, BsCaretRightFill } from 'react-icons/bs';
import { MenuIcons } from 'types/menu-icons';
import { Link } from 'react-router-dom';
import * as S from './styles';

type Module = {
  id: number;
  name: string;
  icon: string;
  position: number;
  routines: [{ icon: string; id: number; link: string; position: number; name: string }];
};

const icons = {
  'fa-id-card': <FaIdCard size={20} />,
  'fi-users': <FiUsers size={20} />,
  'bs-calculator': <BsFillCalculatorFill size={20} />,
  'bs-fill-gear': <BsFillGearFill size={20} />,
  'fi-tool': <FiTool size={20} />,
  'fi-file-text': <FiFileText size={20} />,
} as MenuIcons;

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
      <S.MenuParentContent>
        <S.MenuParentItem>
          <i>
            <FiHome size={20} />
          </i>
          <span>Home</span>
        </S.MenuParentItem>
        {modules.map(module => (
          <>
            <S.MenuParentItem key={module.id}>
              <i>{icons[module.icon]}</i>
              <span>{module.name}</span>
              <BsCaretRightFill size={12} />
            </S.MenuParentItem>
            <S.MenuChildrenContent>
              {module.routines.map(routine => (
                <S.MenuChildrenItem key={routine.id}>
                  <i>
                    <FiCircle size={10} />
                  </i>
                  <span>
                    <Link to={routine.link}>{routine.name}</Link>
                  </span>
                </S.MenuChildrenItem>
              ))}
            </S.MenuChildrenContent>
          </>
        ))}
      </S.MenuParentContent>
    </S.Wrapper>
  );
};

export default Menu;
