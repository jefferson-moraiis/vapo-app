import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import DiamondIcon from '@mui/icons-material/Diamond';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { Carousel } from '../../../components/carousel';

const data = [
  {
    title: 'Jardinagem e paisagismo e tudo mais que você imaginar',
    typeService: 'Mão de obra',
    commercialName: 'Jardinagem da vila',
    city: 'Campo limpo paulista',
    district: 'Centro',
    views: 400,
    diamonds: 200,
    icon: '/assets/icons/glass/ic_glass_bag.png',
  },
  {
    title: 'Jardinagem e paisagismo e tudo mais que você imaginar',
    typeService: 'Mão de obra',
    commercialName: 'Jardinagem da vila',
    city: 'Campo limpo paulista',
    district: 'Centro',
    views: 400,
    diamonds: 200,
    icon: '/assets/icons/glass/ic_glass_bag.png',
  },
  {
    title: 'Jardinagem e paisagismo e tudo mais que você imaginar',
    typeService: 'Mão de obra',
    commercialName: 'Jardinagem da vila',
    city: 'Campo limpo paulista',
    district: 'Centro',
    views: 400,
    diamonds: 200,
    icon: '/assets/icons/glass/ic_glass_bag.png',
  },
  {
    title: 'Jardinagem e paisagismo e tudo mais que você imaginar',
    typeService: 'Mão de obra',
    commercialName: 'Jardinagem da vila',
    city: 'Campo limpo paulista',
    district: 'Centro',
    views: 400,
    diamonds: 200,
    icon: '/assets/icons/glass/ic_glass_bag.png',
  },
];
const style = {
  position: 'fixed',
  bottom: 20,
  left: '50%',
  transform: 'translateX(-50%)',
};

export default function AppView() {
  const navigate = useNavigate();
  const [likes, setLikes] = useState({});
  const handleLikeClick = async (item, index) => {
    const isLiked = !likes[index];
    setLikes((prevLikes) => ({
      ...prevLikes,
      [index]: isLiked,
    }));

    if (isLiked) {
      await sendLikeToApi(item);
    }
  };

  const sendLikeToApi = async (item) => {
    console.log('🚀 ~ sendLikeToApi ~ item:', item);
    // try {
    //   const response = await fetch('https://your-api-endpoint.com/likes', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(item),
    //   });

    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }

    //   // Tratar a resposta da API, se necessário
    //   // const responseData = await response.json();
    // } catch (error) {
    //   console.error('There was a problem with the fetch operation:', error);
    // }
  };
  return (
    <Container maxWidth="xl">
      <Carousel />
      <Grid
        container
        spacing={3}
      >
        {data.map((item, index) => (
          <Grid
            key={index}
            xs={12}
            sm={6}
            md={4}
          >
            <Card sx={{ display: 'flex' }}>
              <CardMedia
                component="img"
                sx={{ width: '40%', objectFit: 'cover' }}
                image={item.icon}
                alt="Live from space album cover"
              />
              <Box sx={{
                display: 'flex', flexDirection: 'column', width: '60%', height: 200,
              }}
              >
                <CardContent sx={{ flex: '1 0' }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component="div"
                  >
                    {item.typeService}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      maxWidth: '100%',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="h4"
                    color="text.secondary"
                  >
                    {item.commercialName}
                  </Typography>
                  <Typography variant="body2">
                    {item.district}
                    ,
                    {item.city}
                  </Typography>
                </CardContent>
                <Box sx={{
                  display: 'flex', alignItems: 'center', pl: 1, pb: 1,
                }}
                >
                  <IconButton>
                    <Chip
                      icon={<DiamondIcon />}
                      label={item.diamonds}
                    />
                  </IconButton>
                  <IconButton>
                    <Chip
                      icon={<VisibilityIcon />}
                      label={item.views}
                    />

                  </IconButton>
                  <IconButton onClick={() => handleLikeClick(item, index)}>
                    {likes[index] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Fab
        color="primary"
        variant="extended"
        aria-label="add"
        style={style}
        onClick={() => navigate('/new-advert')}
      >
        <AddIcon />
        Anunciar
      </Fab>

    </Container>
  );
}
