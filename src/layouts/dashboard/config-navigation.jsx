import { SvgColor } from '../../components/svg-color';

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: 'Pagina Inicial',
    path: '/',
    icon: icon('ic_home'),
    requiresAuth: false,
  },
  {
    title: 'Inserir Anúncio',
    path: '/new-advert',
    icon: icon('ic_announcement'),
    requiresAuth: false,
  },
  {
    title: 'Meus Anúncios',
    path: '/adverts',
    icon: icon('ic_ticket'),
    requiresAuth: true,
  },
  {
    title: 'Favoritos',
    path: '/favorites',
    icon: icon('ic_heart'),
    requiresAuth: true,
  },
  {
    title: 'usuarios',
    path: '/user',
    icon: icon('ic_user'),
    requiresAuth: false,
    requiredRole: 'admin',
  },
  // {
  //   title: 'product',
  //   path: '/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
