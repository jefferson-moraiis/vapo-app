import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { useLocation } from 'react-router-dom';

import { useAuth } from '../../contexts';

import { useRouter } from '../../routes/hooks';

import { bgGradient } from '../../theme/css';

import { Logo } from '../../components/logo';
import { Iconify } from '../../components/iconify';

export default function LoginView() {
  const location = useLocation();
  console.log('🚀 ~ handleLogin ~ location.state?.from?.pathname:', location.state);
  const theme = useTheme();
  const auth = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    await auth.signIn(email, password);
    console.log(auth.isAuthenticated);

    if (auth.isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      console.log('🚀 ~ handleLogin ~ from:', from);
      router.push(from);
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          name="password"
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ my: 3 }}
      >
        <Link
          variant="subtitle2"
          underline="hover"
        >
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleLogin}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ height: 1 }}
      >
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" alignText="center">Entrar</Typography>

          <Typography
            variant="body2"
            sx={{ mt: 2, mb: 5 }}
          >
            Não tenho conta?
            <Link
              variant="subtitle2"
              sx={{ ml: 0.5 }}
            >
              Cadastre-se
            </Link>
          </Typography>

          <Stack
            direction="row"
            spacing={2}
          >
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify
                icon="eva:google-fill"
                color="#DF3E30"
              />
            </Button>

          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary' }}
            >
              OR
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
