import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import DialogContent from '@mui/material/DialogContent';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { ModalFormAddAdverts } from '../../../components/modalFormAddAdverts';

import { Scrollbar } from '../../../components/scrollbar';
import { PhoneMaskCustom, TelephoneMaskCustom } from '../../../components/mask';
import { Iconify } from '../../../components/iconify';

import TableNoData from '../table-no-data';
import AdvertUserTableRow from '../advert-table-row';
import AdvertTableHead from '../advert-table-head';
import TableEmptyRows from '../table-empty-rows';
import AdvertTableToolbar from '../advert-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

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

export default function AdvertsView() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  console.log('🚀 ~ AdvertsView ~ open:', open);
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
    if (cepData) {
      formik.setFieldValue('businessAddress', cepData.logradouro);
      formik.setFieldValue('neighborhood', cepData.bairro);
      formik.setFieldValue('city', cepData.localidade);
      formik.setFieldValue('state', cepData.uf);
    }
  }, [cepData]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    formik.resetForm();
    setCepData(null);
    setOpen(false);
  };
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = adverts.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: adverts,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const addAdverts = async (newAdvert) => {
    adverts.push(newAdvert);
    setAdverts(adverts);
    setOpen(false);
  };

  const notFound = !dataFiltered.length && !!filterName;
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
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Anúncios</Typography>

        <Button
          onClick={() => navigate('/new-advert')}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Adicionar Anúncio
        </Button>
      </Stack>
      {adverts.length > 0 ? (
        <Card>
          <AdvertTableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <AdvertTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={adverts.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'name', label: 'Nome' },
                    { id: 'category', label: 'Categoria' },
                    { id: 'status', label: 'Status' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <AdvertUserTableRow
                        name={row.nameCommercial}
                        role={row.role}
                        status="ativo"
                        category={row.category}
                        handleClick={(event) => handleClick(event, row.name)}
                      />
                    ))}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, adverts.length)}
                  />

                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            page={page}
            component="div"
            count={adverts.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      ) : (
        <div style={{ display: 'flex', alignItems: 'stretch', height: '60vh' }}>
          <Typography
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'text.disabled',
            }}
            variant="h3"
            component="div"
          >
            Nenhum Anúncio encontrado
          </Typography>
        </div>
      )}

    </Container>
  );
}
