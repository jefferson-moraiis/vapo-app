import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../contexts';

import { usePathname } from '../../routes/hooks';
import { RouterLink } from '../../routes/components';

import { useResponsive } from '../../hooks/use-responsive';

import { account } from '../../_mock/account';

import { Logo } from '../../components/logo';
import { Scrollbar } from '../../components/scrollbar';

import { NAV } from './config-layout';
import navConfig from './config-navigation';

const authenticatedUser = {
  displayName: 'Admin User',
  role: 'user', // Este usuário é um administrador
};

export default function Nav({ openNav, onCloseNav }) {
  const { logout } = useAuth();
  const pathname = usePathname();
  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar
        src={account.photoURL}
        alt="photoURL"
      />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{account.displayName}</Typography>

        <Typography
          variant="body2"
          sx={{ color: 'text.secondary' }}
        >
          {account.role}
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack
      component="nav"
      spacing={2}
      sx={{ px: 2 }}
    >
      {navConfig.filter((item) => {
        // Filtrar itens com base na necessidade de autenticação e na função do usuário
        if (item.requiresAuth && !authenticatedUser) return false;
        if (item.requiredRole && (!authenticatedUser || authenticatedUser.role !== item.requiredRole)) return false;
        return true;
      }).map((item) => (
        <NavItem
          key={item.title}
          item={item}
        />
      ))}
    </Stack>
  );

  const renderLogoutButton = (
    <Box sx={{ p: 2 }}>
      <Button
        fullWidth
        color="primary"
        onClick={logout}
        startIcon={<LogoutIcon />}
      >
        Logout
      </Button>
    </Box>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4 }} />

      {renderAccount}

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />
      {renderLogoutButton}
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

function NavItem({ item }) {
  const pathname = usePathname();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box
        component="span"
        sx={{ width: 24, height: 24, mr: 2 }}
      >
        {item.icon}
      </Box>

      <Box component="span">
        {item.title}
        {' '}
      </Box>
    </ListItemButton>
  );
}
