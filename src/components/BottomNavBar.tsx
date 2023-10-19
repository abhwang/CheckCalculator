import { BottomNavigation, BottomNavigationAction, SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface NavItemProps {
  navItems: NavItem[];
  position: number;
  onChange: (e: React.SyntheticEvent<Element, Event>, value: any) => void;
}

interface NavItem {
  name: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; };
}

export default function BottomNavBar(props: NavItemProps) {

  return (
    <BottomNavigation
      showLabels
      value={props.position}
      onChange={props.onChange}
    >

      {props.navItems.map((item, index) => {
        return (
          <BottomNavigationAction key={index} label={item.name} icon={<item.icon />} />
        )
      })}
    </BottomNavigation>
  )
}
