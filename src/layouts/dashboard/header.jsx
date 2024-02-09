import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { useResponsive } from '../../hooks/use-responsive';

import { bgBlur } from '../../theme/css';
import { account } from '../../_mock/account';
import { useAuth } from '../../contexts';

import { Iconify } from '../../components/iconify';

import Searchbar from './common/searchbar';
import { NAV, HEADER } from './config-layout';
import AccountPopover from './common/account-popover';
import NotificationsPopover from './common/notifications-popover';

export default function Header({ onOpenNav }) {
  const navigate = useNavigate(); // Hook do React Router para navegação
  const { logOut, user, isAuthenticated } = useAuth();
  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton
          onClick={onOpenNav}
          sx={{ mr: 1 }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      <Searchbar />

      <Box sx={{ flexGrow: 1 }} />

      {!user && (
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
        >
          <Avatar
            onClick={() => {
              navigate('/login'); // Navega para a página de login
            }}
            sx={{ cursor: 'pointer' }}
          >
            {/* Você pode colocar iniciais ou um ícone dentro do Avatar se quiser */}
          </Avatar>
        </Stack>
      )}
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
