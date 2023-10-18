import { useState } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

export interface ActionItemProps {
  actionItems: ActionItem[];
}

export interface ActionItem {
  name: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; };
  onClick: (e: React.MouseEvent<HTMLElement>) => void
}

export default function FloatingActionButton({ actionItems }: ActionItemProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="Add item"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actionItems.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={<action.icon />}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}