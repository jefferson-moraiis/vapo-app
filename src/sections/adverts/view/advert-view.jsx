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
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Unstable_Grid2';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import DiamondIcon from '@mui/icons-material/Diamond';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Modal from '@mui/material/Modal';

import { PhoneMaskCustom, TelephoneMaskCustom } from '../../../components/mask';
import { SocialMedia } from '../../../components/socialMedia';
import { RatingComponent } from '../../../components/rating/rating';

const data = {
  title: 'Jardinagem e paisagismo e tudo mais que você imaginar',
  typeService: 'Mão de obra',
  commercialName: 'Jardinagem da vila',
  description: 'Na Jardinagem da Vila, oferecemos um serviço de mão de obra especializada que transforma qualquer espaço externo em um oásis de beleza e tranquilidade. Com foco em jardinagem e paisagismo, nossa equipe traz soluções criativas e personalizadas para cada projeto, atendendo a todos os gostos e estilos imagináveis. Desde a concepção de jardins residenciais até a execução de espaços verdes comerciais, a Jardinagem da Vila se dedica a criar ambientes harmoniosos que promovem o bem-estar e valorizam o seu espaço. Seja para manutenção regular ou projetos específicos, nosso compromisso é oferecer um serviço de excelência, transformando seu sonho verde em realidade.',
  city: 'Campo limpo paulista',
  district: 'Centro',
  views: 400,
  diamonds: 200,
  icon: '/assets/icons/glass/ic_glass_bag.png',
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export default function AdvertView() {
  const [adverts, setAdverts] = useState([]);
  const [like, setLike] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLikeClick = async (item) => {
    setLike(!like);
    console.log(like);
    if (!like) {
      await sendLikeToApi(item);
    }
  };
  const socialLinks = {
    urlFacebook: 'https://www.facebook.com',
    urlInstagram: 'https://www.instagram.com',
    linkSite: 'https://www.google.com',
    numberWhats: '550000000000',
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

  const addAdverts = async (newAdvert) => {
    adverts.push(newAdvert);
    setAdverts(adverts);
  };

  return (
    <Container>
      <Box sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}
      >
        <Card sx={{
          maxWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}
        >
          <CardMedia
            component="img"
            image={data.icon}
            alt="Live from space album cover"
          />
          <Box sx={{ width: '100%', alignItems: 'center' }}>
            <CardContent sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            >
              <Typography
                mt={4}
                textAlign="center"
                variant="h3"
                color="text.secondary"
              >
                {data.commercialName}
              </Typography>
              <Typography
                mt={2}
                variant="body2"
                color="text.secondary"
                component="div"
                textAlign="center"
              >
                {data.typeService}
              </Typography>
              <Typography
                variant="subtitle1"
                textAlign="center"
              >
                {data.title}
              </Typography>

              <Typography mt={2} variant="h6">
                {data.district}
                ,
                {data.city}
              </Typography>
              <Typography mt={2} textAlign="justify" variant="text">
                {data.description}
              </Typography>

              <SocialMedia
                urlFacebook={socialLinks.urlFacebook}
                urlInstagram={socialLinks.urlInstagram}
                linkSite={socialLinks.linkSite}
                numberWhats={socialLinks.numberWhats}
                email={socialLinks.email}
              />
              <Box mt={2} mB={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                <IconButton>
                  <Chip
                    icon={<DiamondIcon />}
                    label={data.diamonds}
                  />
                </IconButton>
                <IconButton>
                  <Chip
                    icon={<VisibilityIcon />}
                    label={data.views}
                  />

                </IconButton>
                <IconButton onClick={() => handleLikeClick(data)}>
                  {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Box>
              <RatingComponent onRating={(rating) => console.log('Avaliação:', rating)} />
            </CardContent>
          </Box>
        </Card>
        <Button style={{ display: 'block', margin: '0 auto', marginTop: '30px' }} mt={2} onClick={handleOpen}>
          Denunciar Anúncio
        </Button>
      </Box>
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center">
              Agradecemos sua colaboração
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }} textAlign="center">
              Iremos avaliar o anúncio reportado e tomar as medidas necessárias. Sua ajuda é essencial para mantermos a qualidade de nosso serviço. Obrigado!
            </Typography>
            <Button sx={{ mt: 2 }} variant="contained" onClick={handleClose}>Fechar</Button>
          </Box>
        </Modal>
      )}
    </Container>
  );
}
