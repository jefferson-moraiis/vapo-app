import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import Container from '@mui/material/Container';

import { AdvertForm } from '../../../components/formAdverts';

export default function AddAdvertsView() {
  const [adverts, setAdverts] = useState([]);

  const addAdverts = async (newAdvert) => {
    adverts.push(newAdvert);
    setAdverts(adverts);
  };

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        mb={5}
      >
        <Typography variant="h4">Cadastrar Anúncio</Typography>
      </Stack>
      <Box>
        <AdvertForm onAdverts={addAdverts} />
      </Box>
    </Container>
  );
}
