import { useState } from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export function RatingComponent({ onRating }) {
  const [value, setValue] = useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onRating(newValue); // Função para lidar com a mudança de valor, possivelmente enviando para uma API
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}
    >
      <Typography mt={2} textAlign="justify" variant="text" component="legend">Avalie</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={handleChange}
      />
    </Box>
  );
}
