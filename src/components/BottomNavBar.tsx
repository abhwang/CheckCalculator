import { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface NavItemProps {
  navItems: NavItem[];
}

interface NavItem {
  name: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; };
}

export default function BottomNavBar({ navItems }: NavItemProps) {
  const [navValue, setNavValue] = useState(0);

  return (
    <BottomNavigation
      showLabels
      value={navValue}
      onChange={(event, newValue) => {
        setNavValue(newValue);
      }}
    >

      {navItems.map((item, index) => {
        return (
          <BottomNavigationAction key={index} label={item.name} icon={<item.icon />} />
        )
      })}
    </BottomNavigation>
  )
}
