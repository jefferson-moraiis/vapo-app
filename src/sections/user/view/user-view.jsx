import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Modal from '@mui/material/Modal';
import  Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------
const categories = [
  { value: "Automotive", item: "Automotivo" },
  { value: "Agency", item: "Agência" },
  { value: "Food", item: "Alimentação" },
  { value: "Crafts", item: "Artesanato" },
  { value: "Antiquarian", item: "Antiquário" },
  { value: "Beauty", item: "Beleza" },
  { value: "TradeAndStore", item: "Comércio e Loja" },
  { value: "Communication", item: "Comunicação" },
  { value: "Community", item: "Comunitário" },
  { value: "Office", item: "Consultório" },
  { value: "CultureAndEntertainment", item: "Cultura e Entretenimento" },
  { value: "Delivery", item: "Delivery" },
  { value: "Fun", item: "Diversão" },
  { value: "Drugstore", item: "Drogaria" },
  { value: "Education", item: "Ensino" },
  { value: "Sports", item: "Esporte" },
  { value: "Supplier", item: "Fornecedor" },
  { value: "DropshippingSupplier", item: "Fornecedor Dropshipping" },
  { value: "Hospitality", item: "Hotelaria" },
  { value: "Industry", item: "Indústria" },
  { value: "SnackBar", item: "Lanchonete" },
  { value: "Labor", item: "Mão de obra" },
  { value: "Professional", item: "Profissional" },
  { value: "Representative", item: "Representante" },
  { value: "Restaurant", item: "Restaurante" },
  { value: "Reseller", item: "Revendedor" },
  { value: "Environment", item: "Meio Ambiente" },
  { value: "Health", item: "Saúde" },
  { value: "Service", item: "Serviço" },
  { value: "Shopping", item: "Shopping" },
  { value: "Technology", item: "Técnologia" }
];


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px',
  boxShadow: 24,
  p: 4,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function UserPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
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
        selected.slice(selectedIndex + 1)
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
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;
const formik = useFormik({
  initialValues: {
    email: '',
    name: '',
    lastName: '',
    password: '',
    age: 0,
    phone: '',
    role: '',
    submit: null
  },
  validationSchema: Yup.object({
    email: Yup
      .string()
      .email('Must be a valid email')
      .max(255)
      .required('Email é obrigatório'),
    name: Yup
      .string()
      .max(255)
      .required('Name é obrigatório'),
    lastName: Yup
      .string()
      .max(255)
      .required('Sobrenome é obrigatório'),
    role: Yup
      .string()
      .max(255)
      .required('Permissão é obrigatório'),
    age: Yup
      .number()
      .required('Idade é obrigatório'),
    phone: Yup
      .string()
      .max(255)
      .required('N° de celular é obrigatório'),
  }),
  onSubmit: async (values, helpers) => {
    try {
      const newAdvert = {
        email: values.email,
        name: values.name,
        lastName: values.lastName,
        password: values.password,
        age: values.age,
        role: values.role,
        phone: values.phone
      }
      console.log(newAdvert)
    } catch (err) {
      helpers.setStatus({ success: false });
      helpers.setErrors({ submit: err.message });
      helpers.setSubmitting(false);
    }
      
  }
});
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>

        <Button onClick={handleOpen} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          Adicionar Anúncio
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'company', label: 'Company' },
                  { id: 'role', label: 'Role' },
                  { id: 'isVerified', label: 'Verified', align: 'center' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      name={row.name}
                      role={row.role}
                      status={row.status}
                      company={row.company}
                      avatarUrl={row.avatarUrl}
                      isVerified={row.isVerified}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      {open && (
            <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
              <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.name && formik.errors.name)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label="Nome Comercial"
                  name="nameComercial"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                <FormControl 
                  fullWidth 
                  error={!!(formik.touched.role && formik.errors.role)}>
              <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
              <Select
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Category"
                MenuProps={MenuProps}
              >
                {categories.map(({value,item}) => (
                  <MenuItem key={item}value={value}>
                    <ListItemText primary={item} />
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.role && formik.errors.role && (
                <Typography color="error">
                  {formik.errors.role}
                </Typography>
              )}
            </FormControl>
            <FormControl 
                  fullWidth 
                  variant="filled"
                  error={!!(formik.touched.role && formik.errors.role)}>
              <InputLabel htmlFor="formatted-text-mask-input">N° Celular</InputLabel>
              <Input
                id="formatted-text-mask-input"
                // inputComponent={TextMaskCustom}
                error={!!(formik.touched.phone && formik.errors.phone)}
                fullWidth
                helperText={formik.touched.phone && formik.errors.phone}
                label="N° de Celular"
                name="phone"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="phone"
                value={formik.values.phone}
              />
            </FormControl>
            <TextField
                  error={!!(formik.touched.age && formik.errors.age)}
                  fullWidth
                  helperText={formik.touched.age && formik.errors.age}
                  label="Idade"
                  name="age"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="number"
                  value={formik.values.age}
                />
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
            </Modal>
          </div>
          )};
    </Container>
  );
}
