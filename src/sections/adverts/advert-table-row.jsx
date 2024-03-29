import { useState } from 'react';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { Label } from '../../components/label';
import { Iconify } from '../../components/iconify';

export default function AdvertTableRow({
  name,
  category,
  status,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow
        hover
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
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify
            icon="eva:edit-fill"
            sx={{ mr: 2 }}
          />
          Editar
        </MenuItem>

        <MenuItem
          onClick={handleCloseMenu}
          sx={{ color: 'error.main' }}
        >
          <Iconify
            icon="eva:trash-2-outline"
            sx={{ mr: 2 }}
          />
          Deletar
        </MenuItem>
      </Popover>
    </>
  );
}
