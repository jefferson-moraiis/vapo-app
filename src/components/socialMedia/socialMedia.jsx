import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language'; // Ícone para o site
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

export function SocialMedia({
  urlFacebook, urlInstagram, numberWhats, email, linkSite,
}) {
  return (
    <Stack mt={2} direction="row" spacing={1}>
      {urlFacebook && (
        <IconButton
          component="a"
          href={urlFacebook}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookIcon fontSize="large" />
        </IconButton>
      )}
      {urlInstagram && (
        <IconButton
          component="a"
          href={urlInstagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon fontSize="large" />
        </IconButton>
      )}
      {numberWhats && (
        <IconButton
          component="a"
          href={`https://wa.me/${numberWhats}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon fontSize="large" />
        </IconButton>
      )}
      {email && (
        <IconButton
          component="a"
          href={`mailto:${email}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <EmailIcon fontSize="large" />
        </IconButton>
      )}
      {linkSite && (
        <IconButton
          component="a"
          href={linkSite}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LanguageIcon fontSize="large" />
        </IconButton>
      )}
    </Stack>
  );
}
