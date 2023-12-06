import { AppBar, Toolbar, Typography } from "@mui/material"

interface Props {
  children: string;
}

const TopAppBar = ({ children }: Props) => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          {children}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default TopAppBar