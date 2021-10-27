import React, { useState } from 'react';
import { FaIdCard, FaUserCog, FaRegCopy, FaRegBuilding } from 'react-icons/fa';
import { MdFormatSize, MdAttachMoney, MdNotifications } from 'react-icons/md';
import { FiUsers, FiTool, FiFileText, FiChevronDown, FiUser, FiChevronUp } from 'react-icons/fi';
import { BsFillCalculatorFill, BsFillGearFill, BsCalendarDate } from 'react-icons/bs';
import { MenuIcons, Module } from 'types';
import { Link } from 'react-router-dom';

import * as S from './styles';

type MenuItemProps = {
  module: Module;
};

const icons = {
  'fa-id-card': <FaIdCard size={20} />,
  'fi-users': <FiUsers size={20} />,
  'bs-calculator': <BsFillCalculatorFill size={20} />,
  'bs-fill-gear': <BsFillGearFill size={20} />,
  'fi-tool': <FiTool size={20} />,
  'fi-file-text': <FiFileText size={20} />,
  'fi-user': <FiUser size={20} />,
  'fa-user-cog': <FaUserCog size={20} />,
  'md-format-size': <MdFormatSize size={20} />,
  'md-attach-money': <MdAttachMoney size={20} />,
  'fa-reg-copy': <FaRegCopy size={20} />,
  'md-notifications': <MdNotifications size={20} />,
  'fa-reg-building': <FaRegBuilding size={20} />,
  'bs-calendar-date': <BsCalendarDate size={20} />,
} as MenuIcons;

const MenuItem = ({ module }: MenuItemProps): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <S.MenuParentContent show onClick={() => setShowMenu(!showMenu)}>
      <S.MenuParentItem>
        <S.ItemWrapper>
          <S.MenuItemIcon>{icons[module.icon]}</S.MenuItemIcon>
          <S.MenuItemDescription>
            <span>{module.name}</span>
            {!showMenu ? <FiChevronDown size={16} /> : <FiChevronUp size={16} />}
          </S.MenuItemDescription>
        </S.ItemWrapper>
        <S.MenuParentContent show={showMenu}>
          {module.routines.map(routine => (
            <S.MenuChildrenItem key={`${routine.id}-${routine.position}`}>
              <S.ItemWrapper>
                <S.MenuItemIcon>{icons[routine.icon]}</S.MenuItemIcon>
                <S.MenuItemDescription>
                  <span>
                    <Link to={routine.link}>{routine.name}</Link>
                  </span>
                </S.MenuItemDescription>
              </S.ItemWrapper>
            </S.MenuChildrenItem>
          ))}
        </S.MenuParentContent>
      </S.MenuParentItem>
    </S.MenuParentContent>
  );
};

export default MenuItem;
