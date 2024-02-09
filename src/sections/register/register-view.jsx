import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation } from 'react-router-dom';

import { useAuth } from '../../contexts';

import { useRouter } from '../../routes/hooks';

import { bgGradient } from '../../theme/css';

import { Logo } from '../../components/logo';
import { SnackbarAlert } from '../../components/snackbarAlert';
import { Iconify } from '../../components/iconify';

export default function RegisterView() {
  const location = useLocation();
  const theme = useTheme();
  const auth = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarError, setSnackbarError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== passwordConfirm) {
      setSnackbarMessage('A senha e a confirmação da senha não coincidem.');
      setSnackbarOpen(true);
      return;
    }
    try {
      await auth.signUp({
        email, password, name, lastName,
      });
      setSnackbarMessage('Cadastro realizado com sucesso!');
      setSnackbarOpen(true);
      const from = location.state?.from?.pathname || '/';
      router.push(from);
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarError(true);
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Nome"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Sobrenome"
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
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
        <TextField
          name="passwordConfirm"
          label="Confirmar Senha"
          type={showPasswordConfirm ? 'text' : 'password'}
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  edge="end"
                >
                  <Iconify icon={showPasswordConfirm ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={password !== passwordConfirm && passwordConfirm.length > 0}
          helperText={password !== passwordConfirm && passwordConfirm > 0 ? 'As senhas não coincidem' : ''}
        />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="primary"
        sx={{ my: 3 }}
        onClick={handleRegister}
      >
        {loading ? <CircularProgress size={24} /> : 'Cadastrar'}
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
          <Typography variant="h4" textAlign="center">Cadastrar</Typography>

          <Typography
            variant="body2"
            sx={{ mt: 2, mb: 5 }}
          >
            Já tenho conta?
            <Link
              variant="subtitle2"
              sx={{ ml: 0.5 }}
              href="/login"
            >
              Login
            </Link>
          </Typography>
          {renderForm}
        </Card>
      </Stack>
      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
        error={snackbarError}
      />
    </Box>
  );
}
