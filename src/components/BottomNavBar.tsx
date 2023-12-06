import { BottomNavigation, BottomNavigationAction, SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface Props {
  navItems: NavItem[];
  navPosition: number;
  onChange: (e: React.SyntheticEvent<Element, Event>, newNavPosition: number) => void;
}

interface NavItem {
  name: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; };
}

const BottomNavBar = ({ navItems, navPosition, onChange }: Props) => {

  return (
    <BottomNavigation
      showLabels
      value={navPosition}
      onChange={onChange}
    >
      {navItems.map((item, index) => (
        <BottomNavigationAction
          key={index}
          label={item.name}
          icon={<item.icon />}
        />
      ))}
    </BottomNavigation>
  )
}

export default BottomNavBar