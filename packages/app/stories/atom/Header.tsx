import MuiAppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { MdMenu } from 'react-icons/md';

export interface HeaderProps {
  title: string;
}

export function Header(props: HeaderProps) {
  return (
    <MuiAppBar position='fixed'>
      <Toolbar>
        <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
          <MdMenu />
        </IconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          {props.title}
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
}
