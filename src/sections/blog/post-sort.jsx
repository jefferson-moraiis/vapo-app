import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

export default function PostSort({ options, onSort }) {
  return (
    <TextField
      select
      size="small"
      value="latest"
      onChange={onSort}
    >
      {options.map((option) => (
        <MenuItem
          key={option.value}
          value={option.value}
        >
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
