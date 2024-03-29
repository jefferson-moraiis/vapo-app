import { useState, useEffect } from 'react';
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
import CardActionArea from '@mui/material/CardActionArea';
import DiamondIcon from '@mui/icons-material/Diamond';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

import axios from 'axios';
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

async function getZipCode(latitude, longitude) {
  const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=f52ff83e13da4d1a8cd82078fd6643de`);
  const result = await response.json();
  const { postcode } = result.results[0].components;
  return postcode;
}
const fetchCepData = async (cepNumber) => {
  const result = await axios.get(`https://viacep.com.br/ws/${cepNumber}/json`);
  return result;
};

export default function AppView() {
  const navigate = useNavigate();
  const [likes, setLikes] = useState({});
  const [favorites, setFavorites] = useState({});
  const [informacoes, setInformacoes] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      const cep = await getZipCode(latitude, longitude);
      const response = await fetchCepData(cep);

      setInformacoes(response);
    });
  }, []);
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
  const handleFavoriteClick = async (item, index) => {
    const isFavorite = !favorites[index];
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [index]: isFavorite,
    }));

    if (isFavorite) {
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
              <CardActionArea onClick={() => navigate('/advert', { state: { item } })}>
                <CardMedia
                  component="img"
                  sx={{ width: '40%', objectFit: 'cover' }}
                  image={item.icon}
                  alt="Live from space album cover"
                />
              </CardActionArea>

              <Box sx={{
                display: 'flex', flexDirection: 'column', width: '60%', height: 200,
              }}
              >
                <CardActionArea onClick={() => navigate('/advert', { state: { item } })}>
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
                </CardActionArea>
                <Box sx={{
                  display: 'flex', alignItems: 'center', pl: 1, pb: 1,
                }}
                >
                  <IconButton>
                    <Chip
                      icon={<VisibilityIcon />}
                      label={item.views}
                    />

                  </IconButton>
                  <IconButton onClick={() => handleLikeClick(item, index)}>
                    <Chip
                      label={item.views}
                      icon={likes[index] ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
                    />

                  </IconButton>
                  <IconButton onClick={() => handleFavoriteClick(item, index)}>
                    {favorites[index] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
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
