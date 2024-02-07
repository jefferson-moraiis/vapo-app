import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import DialogContent from '@mui/material/DialogContent';

import { PhoneMaskCustom, TelephoneMaskCustom } from '../mask';

const categories = [
  { value: 'Automotive', item: 'Automotivo' },
  { value: 'Agency', item: 'Agência' },
  { value: 'Food', item: 'Alimentação' },
  { value: 'Crafts', item: 'Artesanato' },
  { value: 'Antiquarian', item: 'Antiquário' },
  { value: 'Beauty', item: 'Beleza' },
  { value: 'TradeAndStore', item: 'Comércio e Loja' },
  { value: 'Communication', item: 'Comunicação' },
  { value: 'Community', item: 'Comunitário' },
  { value: 'Office', item: 'Consultório' },
  { value: 'CultureAndEntertainment', item: 'Cultura e Entretenimento' },
  { value: 'Delivery', item: 'Delivery' },
  { value: 'Fun', item: 'Diversão' },
  { value: 'Drugstore', item: 'Drogaria' },
  { value: 'Education', item: 'Ensino' },
  { value: 'Sports', item: 'Esporte' },
  { value: 'Supplier', item: 'Fornecedor' },
  { value: 'DropshippingSupplier', item: 'Fornecedor Dropshipping' },
  { value: 'Hospitality', item: 'Hotelaria' },
  { value: 'Industry', item: 'Indústria' },
  { value: 'SnackBar', item: 'Lanchonete' },
  { value: 'Labor', item: 'Mão de obra' },
  { value: 'Professional', item: 'Profissional' },
  { value: 'Representative', item: 'Representante' },
  { value: 'Restaurant', item: 'Restaurante' },
  { value: 'Reseller', item: 'Revendedor' },
  { value: 'Environment', item: 'Meio Ambiente' },
  { value: 'Health', item: 'Saúde' },
  { value: 'Service', item: 'Serviço' },
  { value: 'Shopping', item: 'Shopping' },
  { value: 'Technology', item: 'Técnologia' },
];

export default function ModalFormAddAdverts({ open, onClose, onAddAverts }) {
  console.log('🚀 ~ ModalFormAddAdverts ~ open:', open);
  const [openModal, setOpenModal] = useState(open);
  console.log('🚀 ~ ModalFormAddAdverts ~ openModal:', openModal);
  const [imageSrc, setImageSrc] = useState('');
  const [cepData, setCepData] = useState(null);
  const [disable, setDisable] = useState(false);
  const [adverts, setAdverts] = useState([]);

  const fetchCepData = async (cepNumber) => {
    const { data } = await axios.get(`https://viacep.com.br/ws/${cepNumber}/json`);
    setCepData(data);
    if (
      data.logradouro.length >= 3
      && data.bairro.length >= 3
      && data.uf.length >= 2
      && data.localidade.length >= 3
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };

  useEffect(() => {
    setOpenModal(open);
    if (cepData) {
      formik.setFieldValue('businessAddress', cepData.logradouro);
      formik.setFieldValue('neighborhood', cepData.bairro);
      formik.setFieldValue('city', cepData.localidade);
      formik.setFieldValue('state', cepData.uf);
    }
  }, [open]);

  const handleClose = () => {
    formik.resetForm();
    setCepData(null);
    onClose();
  };

  const addAdverts = async (newAdvert) => {
    adverts.push(newAdvert);
    setAdverts(adverts);
    onAddAverts(adverts);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      nameCommercial: '',
      category: '',
      subCategory: '',
      phone: '',
      whatsApp: '',
      facebook: '',
      instagram: '',
      site: '',
      decription: '',
      cep: '',
      businessAddress: '',
      road: '',
      numberAddress: '',
      city: '',
      state: '',
      complement: '',
      neighborhood: '',
      file: null,
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').max(255).required('Email é obrigatório'),
      nameCommercial: Yup.string().max(255).required('Name Comercial é obrigatório'),
      category: Yup.string().required('Categoria é obrigatória'),
      subCategory: Yup.string().required('Sub Categoria é obrigatória'),
      phone: Yup.string().max(255).required('N° de telefone é obrigatório'),
      whatsApp: Yup.string().required('WhatsApp é obrigatório'),
      decription: Yup.string().required('Descrição é obrigatório'),
      imageBase64: Yup.string().required('A imagem é obrigatória'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const newAdvert = {
          email: values.email,
          nameCommercial: values.nameCommercial,
          category: values.category,
          subCategory: values.subCategory,
          telephone: values.telephone,
          whatsApp: values.whatsApp,
          facebook: values.facebook,
          instagram: values.instagram,
          site: values.site,
          decription: values.decription,
          cep: values.cep,
          businessAddress: values.businessAddress,
          road: values.road,
          numberAddress: values.numberAddress,
          city: values.city,
          state: values.state,
          complement: values.complement,
          neighborhood: values.neighborhood,
          imageBase64: values.imageBase64,
        };
        addAdverts(newAdvert);
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue('imageBase64', reader.result);
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Dialog
      open={openModal}
      onClose={handleClose}
      fullScreen
      maxWidth="xl"
    >
      <DialogContent>
        <Toolbar>
          <Typography
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
            }}
            variant="h3"
            component="div"
          >
            Cadastrar Anúncio
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{ ml: 'auto' }}
          >
            {' '}
            {/* ml: 'auto' empurra o botão para a direita */}
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <Box>
          <form
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <Stack
              spacing={3}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <label htmlFor="btn-upload">
                <input
                  id="btn-upload"
                  name="btn-upload"
                  style={{ display: 'none' }}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <Button
                  className="btn-choose"
                  component="span"
                >
                  <Avatar
                    variant="rounded"
                    alt="Remy Sharp"
                    src={imageSrc}
                    sx={{ width: 200, height: 200 }}
                  />
                </Button>
              </label>
              {formik.touched.imageBase64 && formik.errors.imageBase64 && (
                <div style={{ color: 'red' }}>{formik.errors.imageBase64}</div>
              )}
              <TextField
                required
                error={!!(formik.touched.nameCommercial && formik.errors.nameCommercial)}
                fullWidth
                helperText={formik.touched.nameCommercial && formik.errors.nameCommercial}
                label="Nome Comercial"
                name="nameCommercial"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.nameCommercial}
              />
              <FormControl
                fullWidth
                required
                error={!!(formik.touched.category && formik.errors.category)}
              >
                <Autocomplete
                  id="category"
                  name="category"
                  options={categories}
                  getOptionLabel={(option) => option.item || ''}
                  value={
                    categories.find((cat) => cat.value === formik.values.category) || null
                  }
                  onChange={(event, newValue) => {
                    formik.setFieldValue('category', newValue ? newValue.value : '');
                  }}
                  onBlur={formik.handleBlur('category')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Categoria"
                      required
                      error={formik.touched.category && Boolean(formik.errors.category)}
                      helperText={formik.touched.category && formik.errors.category}
                    />
                  )}
                />
              </FormControl>
              <TextField
                required
                error={!!(formik.touched.subCategory && formik.errors.subCategory)}
                fullWidth
                helperText={formik.touched.subCategory && formik.errors.subCategory}
                label="Sub Categoria"
                name="subCategory"
                placeholder="Ex:Advogado,Pastelaria,Manicure,Diarista "
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="string"
                value={formik.values.subCategory}
              />
              <TextField
                required
                error={!!(formik.touched.phone && formik.errors.phone)}
                fullWidth
                helperText={formik.touched.phone && formik.errors.phone}
                label="Telefone"
                name="phone"
                placeholder="(00) 0000-0000"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="string"
                value={formik.values.phone}
                InputProps={{
                  inputComponent: PhoneMaskCustom,
                }}
              />
              <TextField
                required
                error={!!(formik.touched.whatsApp && formik.errors.whatsApp)}
                fullWidth
                helperText={formik.touched.whatsApp && formik.errors.whatsApp}
                label="WhatsApp"
                name="whatsApp"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="string"
                placeholder="(00) 00000-0000"
                value={formik.values.whatsApp}
                InputProps={{
                  inputComponent: TelephoneMaskCustom,
                }}
              />
              <TextField
                error={!!(formik.touched.facebook && formik.errors.facebook)}
                fullWidth
                helperText={formik.touched.facebook && formik.errors.facebook}
                label="Facebook"
                name="facebook"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="string"
                value={formik.values.facebook}
              />
              <TextField
                error={!!(formik.touched.instagram && formik.errors.instagram)}
                fullWidth
                helperText={formik.touched.instagram && formik.errors.instagram}
                label="Instagram"
                name="instagram"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="string"
                value={formik.values.instagram}
              />
              <TextField
                required
                error={!!(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="string"
                value={formik.values.email}
              />
              <TextField
                error={!!(formik.touched.age && formik.errors.age)}
                fullWidth
                helperText={formik.touched.age && formik.errors.age}
                label="Site"
                name="site"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="string"
                value={formik.values.site}
              />
              <TextField
                required
                error={!!(formik.touched.decription && formik.errors.decription)}
                fullWidth
                multiline
                rows={4}
                helperText={formik.touched.decription && formik.errors.decription}
                label="Descrição"
                name="decription"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="string"
                value={formik.values.decription}
              />
              <TextField
                error={!!(formik.touched.cep && formik.errors.cep)}
                fullWidth
                helperText={formik.touched.cep && formik.errors.cep}
                label="Cep"
                name="cep"
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  formik.handleChange(e);
                  const cepNumber = e.target.value.replace(/\D/g, '');
                  if (cepNumber.length === 8) {
                    fetchCepData(cepNumber);
                  }
                }}
                type="string"
                value={formik.values.cep}
              />
              {cepData && (
                <>
                  <TextField
                    error={
                      !!(formik.touched.businessAddress && formik.errors.businessAddress)
                    }
                    fullWidth
                    helperText={
                      formik.touched.businessAddress && formik.errors.businessAddress
                    }
                    label="Rua/Avenida"
                    disabled={disable}
                    name="businessAddress"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="string"
                    value={cepData.logradouro}
                  />
                  <TextField
                    error={!!(formik.touched.neighborhood && formik.errors.neighborhood)}
                    fullWidth
                    helperText={formik.touched.neighborhood && formik.errors.neighborhood}
                    label="Bairro"
                    disabled={disable}
                    name="neighborhood"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="string"
                    value={cepData.bairro}
                  />
                  <TextField
                    error={!!(formik.touched.numberAddress && formik.errors.numberAddress)}
                    fullWidth
                    helperText={formik.touched.numberAddress && formik.errors.numberAddress}
                    label="Número"
                    name="numberAddress"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="string"
                    value={formik.values.numberAddress}
                  />
                  <TextField
                    error={!!(formik.touched.complement && formik.errors.complement)}
                    fullWidth
                    helperText={formik.touched.complement && formik.errors.complement}
                    label="Complemento"
                    name="complement"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="string"
                    value={formik.values.complement}
                  />
                  <TextField
                    error={!!(formik.touched.city && formik.errors.city)}
                    fullWidth
                    helperText={formik.touched.city && formik.errors.city}
                    label="Cidade"
                    disabled={disable}
                    name="city"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="string"
                    value={cepData.localidade}
                  />
                  <TextField
                    error={!!(formik.touched.state && formik.errors.state)}
                    fullWidth
                    helperText={formik.touched.state && formik.errors.state}
                    label="Estado"
                    name="state"
                    disabled={disable}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="string"
                    value={cepData.uf}
                  />
                </>
              )}
            </Stack>
            {formik.errors.submit && (
              <Typography
                color="error"
                sx={{ mt: 3 }}
                variant="body2"
              >
                {formik.errors.submit}
              </Typography>
            )}
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
            >
              Salvar
            </Button>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
