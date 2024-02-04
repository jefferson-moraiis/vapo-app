import { useState } from 'react';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Label } from '../../components/label';
import { Iconify } from '../../components/iconify';

export default function UserTableRow({
  name,
  category,
  status,
  index,
  handleClickDelete,
}) {
  const [open, setOpen] = useState(null);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow
        tabIndex={-1}
      >

        <TableCell
          component="th"
          scope="row"
        >
          <Typography
            variant="subtitle2"
            noWrap
          >
            {name}
          </Typography>
        </TableCell>

        <TableCell>{category}</TableCell>

        <TableCell>
          <Label color={(status !== 'ativo' && 'error') || 'success'}>{status}</Label>
        </TableCell>

        <TableCell>
          <IconButton onClick={handleOpenMenu} sx={{ color: 'error.main' }}>
            <Iconify
              icon="eva:trash-2-outline"
              sx={{ mr: 2 }}
            />
          </IconButton>
        </TableCell>
      </TableRow>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" style={{ textAlign: 'center' }}>
          Tem certeza de que deseja excluir?
        </DialogTitle>
        <DialogContent style={{ textAlign: 'center' }}>
          <DialogContentText>
            Esta ação é definitiva e resultará na remoção permanente de todo o conteúdo associado ao anúncio,
            não sendo possível recuperá-lo posteriormente.
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button autoFocus onClick={handleClose} color="error" variant="outlined">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              handleClose(); // Fecha o diálogo
              handleClickDelete(index); // Passa o índice para a função de deletar
            }}
            autoFocus
            color="primary"
            variant="outlined"
          >
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
